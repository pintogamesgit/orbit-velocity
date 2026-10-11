(function () {
  'use strict';

  const INTERSTITIAL_AD_ID = 'ca-app-pub-2678945030773900/1594511593';
  const REWARDED_AD_ID = 'ca-app-pub-2678945030773900/5290214025';
  const BREAKS_BETWEEN_ADS = 3;
  const MIN_TIME_BETWEEN_ADS_MS = 2 * 60 * 1000;
  const BREAK_COUNT_KEY = 'orbitvelocity.adBreakCount';
  const LAST_AD_KEY = 'orbitvelocity.lastInterstitialAt';

  let admob = null;
  let initialized = false;
  let ready = false;
  let showing = false;
  let adDue = false;
  let dismissedResolver = null;
  let rewardedReady = false;
  let rewardedShowing = false;
  let rewardedEarned = false;
  let rewardedPreparePromise = null;
  let rewardedResultResolver = null;

  function getStoredNumber(key) {
    const value = Number(localStorage.getItem(key));
    return Number.isFinite(value) ? value : 0;
  }

  function updatePrivacyButton(consentInfo) {
    const button = document.getElementById('privacyOptionsBtn');
    if (!button) return;

    const required = consentInfo?.privacyOptionsRequirementStatus === 'REQUIRED';
    button.hidden = !required;
  }

  async function prepareInterstitial() {
    if (!initialized || ready || showing) return;

    try {
      await admob.prepareInterstitial({
        adId: INTERSTITIAL_AD_ID,
        npa: true,
        isTesting: false,
        immersiveMode: true,
      });
      ready = true;
    } catch (error) {
      ready = false;
      console.warn('AdMob interstitial could not be prepared.', error);
    }
  }

  async function prepareRewardedAd() {
    if (!initialized || rewardedReady || rewardedShowing) return rewardedReady;
    if (rewardedPreparePromise) return rewardedPreparePromise;

    rewardedPreparePromise = (async () => {
      try {
        await admob.prepareRewardVideoAd({
          adId: REWARDED_AD_ID,
          npa: true,
          isTesting: false,
          immersiveMode: true,
        });
        rewardedReady = true;
        return true;
      } catch (error) {
        rewardedReady = false;
        console.warn('AdMob rewarded ad could not be prepared.', error);
        return false;
      } finally {
        rewardedPreparePromise = null;
      }
    })();

    return rewardedPreparePromise;
  }

  function finishRewardedAd(result) {
    const resolve = rewardedResultResolver;
    rewardedResultResolver = null;
    rewardedReady = false;
    rewardedShowing = false;
    rewardedEarned = false;
    resolve?.(result);
    if (initialized) void prepareRewardedAd();
  }

  async function initialize() {
    await window.OrbitVelocityAudience?.ready;
    if (!window.OrbitVelocityAudience?.isAdult()) return;
    admob = window.Capacitor?.Plugins?.AdMob;
    if (!admob) return;

    try {
      await admob.addListener('interstitialAdLoaded', () => {
        ready = true;
      });
      await admob.addListener('interstitialAdFailedToLoad', () => {
        ready = false;
      });
      await admob.addListener('interstitialAdDismissed', () => {
        ready = false;
        showing = false;
        dismissedResolver?.();
        dismissedResolver = null;
      });
      await admob.addListener('interstitialAdFailedToShow', () => {
        ready = false;
        showing = false;
        dismissedResolver?.();
        dismissedResolver = null;
      });
      await admob.addListener('onRewardedVideoAdLoaded', () => {
        rewardedReady = true;
      });
      await admob.addListener('onRewardedVideoAdFailedToLoad', () => {
        rewardedReady = false;
      });
      await admob.addListener('onRewardedVideoAdReward', () => {
        rewardedEarned = true;
      });
      await admob.addListener('onRewardedVideoAdDismissed', () => {
        finishRewardedAd({ shown: true, rewarded: rewardedEarned });
      });
      await admob.addListener('onRewardedVideoAdFailedToShow', () => {
        finishRewardedAd({ shown: false, rewarded: false });
      });

      let consentInfo = await admob.requestConsentInfo({ tagForUnderAgeOfConsent: false });

      if (!consentInfo.canRequestAds && consentInfo.isConsentFormAvailable) {
        consentInfo = await admob.showConsentForm();
      }

      updatePrivacyButton(consentInfo);
      if (consentInfo.canRequestAds) {
        await admob.initialize({
          // Apply family-friendly treatment to every ad, including adult users.
          // This does not change the adult-only audience gate above.
          tagForChildDirectedTreatment: true,
          tagForUnderAgeOfConsent: false,
          maxAdContentRating: 'General',
        });
        initialized = true;
        await Promise.all([prepareInterstitial(), prepareRewardedAd()]);
      }
    } catch (error) {
      console.warn('AdMob initialization was skipped.', error);
    }
  }

  function recordNaturalBreak() {
    const breakCount = getStoredNumber(BREAK_COUNT_KEY) + 1;
    localStorage.setItem(BREAK_COUNT_KEY, String(breakCount));

    const enoughTimePassed =
      Date.now() - getStoredNumber(LAST_AD_KEY) >= MIN_TIME_BETWEEN_ADS_MS;
    adDue = breakCount % BREAKS_BETWEEN_ADS === 0 && enoughTimePassed;
  }

  async function runAfterInterstitial(action) {
    if (typeof action !== 'function') return;

    if (!adDue || !initialized || !ready || showing) {
      action();
      return;
    }

    adDue = false;
    showing = true;
    localStorage.setItem(LAST_AD_KEY, String(Date.now()));

    const dismissed = new Promise((resolve) => {
      dismissedResolver = resolve;
    });

    try {
      await admob.showInterstitial();
      await dismissed;
    } catch (error) {
      ready = false;
      showing = false;
      dismissedResolver = null;
      console.warn('AdMob interstitial could not be shown.', error);
    }

    action();
  }

  async function showPrivacyOptions() {
    if (!admob) return;
    try {
      await admob.showPrivacyOptionsForm();
      // Drop cached ads and re-evaluate consent before any further requests.
      window.location.reload();
    } catch (error) {
      console.warn('AdMob privacy options could not be opened.', error);
    }
  }

  async function showRewardedAd() {
    if (!initialized || rewardedShowing) {
      return { shown: false, rewarded: false };
    }

    if (!rewardedReady) await prepareRewardedAd();
    if (!rewardedReady) return { shown: false, rewarded: false };

    rewardedReady = false;
    rewardedShowing = true;
    rewardedEarned = false;

    const result = new Promise((resolve) => {
      rewardedResultResolver = resolve;
    });

    try {
      void admob.showRewardVideoAd().catch((error) => {
        console.warn('AdMob rewarded ad could not be shown.', error);
        finishRewardedAd({ shown: false, rewarded: false });
      });
      return await result;
    } catch (error) {
      console.warn('AdMob rewarded ad could not be shown.', error);
      finishRewardedAd({ shown: false, rewarded: false });
      return { shown: false, rewarded: false };
    }
  }

  window.OrbitVelocityAds = {
    recordNaturalBreak,
    runAfterInterstitial,
    showRewardedAd,
    showPrivacyOptions,
  };

  window.addEventListener('DOMContentLoaded', initialize, { once: true });
})();

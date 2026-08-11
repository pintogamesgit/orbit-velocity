class Upgrades {
  constructor(game) {
    this.game = game;
    this.width = this.game.width * 0.25;
    this.height = this.width * 1.2;
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height + this.height;
    this.targetY = this.game.height / 2 - this.height / 2;
    this.fontSize = Math.max(13, this.width * 0.105);
    this.titleFontFamily = '"Bungee", "Archivo Black", "Arial Black", system-ui, sans-serif';
    this.fontFamily = '"Bungee", "Archivo Black", "Rubik", system-ui, sans-serif';
    this.color = '#111';
    this.type = 'shield';
    this.opacity = 0;
    this.appearing = true;
    this.removing = false;
    this.scale = 1;
  }

  randomizeType() {
    const rand = Math.random();
    if (rand > 0.9) this.type = 'fasterShooter';
    else if (rand > 0.6) this.type = 'plusHp';
    else if (rand > 0.3) this.type = 'doubleShooter';
    else this.type = 'shield';
  }

  update(deltaTime) {
    const speed = 0.4;
    if (this.appearing) {
      const distance = this.y - this.targetY;
      this.y -= distance * speed * (deltaTime / 16.67);
      this.opacity += 0.08 * (deltaTime / 16.67);
      if (Math.abs(distance) < 1) {
        this.y = this.targetY;
        this.opacity = 1;
        this.appearing = false;
      }
    }
    if (this.removing) {
      this.scale += 0.07 * (deltaTime / 16.67);
      this.opacity -= 0.1 * (deltaTime / 16.67);
      if (this.opacity <= 0) {
        this.opacity = 0;
        this.removing = false;
      }
    }
  }

  draw(context) {
    context.save();
    context.globalAlpha = this.opacity;
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.scale(this.scale, this.scale);
    context.translate(-this.width / 2, -this.height / 2);

    const w = this.width;
    const h = this.height;
    const r = Math.max(14, w * 0.12);

    const theme = this.getTheme();

    context.save();
    context.shadowColor = theme.glow;
    context.shadowBlur = 28;
    context.globalAlpha *= 0.75;
    this.roundRect(context, 0, 0, w, h, r);
    context.fillStyle = 'rgba(0,0,0,0.35)';
    context.fill();
    context.restore();

    const g = context.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, theme.bgTop);
    g.addColorStop(1, theme.bgBottom);
    this.roundRect(context, 0, 0, w, h, r);
    context.fillStyle = g;
    context.fill();

    const shine = context.createLinearGradient(0, 0, w, h * 0.55);
    shine.addColorStop(0, 'rgba(255,255,255,0.20)');
    shine.addColorStop(0.45, 'rgba(255,255,255,0.06)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    this.roundRect(context, 2, 2, w - 4, h * 0.55, r - 2);
    context.fillStyle = shine;
    context.fill();

    context.save();
    context.shadowColor = theme.glow;
    context.shadowBlur = 18;
    context.lineWidth = 3;
    this.roundRect(context, 0, 0, w, h, r);
    context.strokeStyle = theme.border;
    context.stroke();
    context.restore();

    context.lineWidth = 2;
    this.roundRect(context, 6, 6, w - 12, h - 12, r - 6);
    context.strokeStyle = 'rgba(255,255,255,0.12)';
    context.stroke();

    const cx = w / 2;
    const cy = h * 0.32;
    const iconR = Math.max(18, w * 0.16);

    context.save();
    context.shadowColor = theme.glow;
    context.shadowBlur = 20;
    context.globalAlpha *= 0.95;
    context.beginPath();
    context.arc(cx, cy, iconR, 0, Math.PI * 2);
    context.fillStyle = theme.iconBg;
    context.fill();
    context.restore();

    this.drawUpgradeIcon(context, cx, cy, iconR, theme);

    this.drawText(context, theme);

    context.restore();
  }

  drawUpgradeIcon(context, cx, cy, radius, theme) {
    context.save();
    context.translate(cx, cy);
    context.scale(radius, radius);
    context.strokeStyle = 'white';
    context.fillStyle = 'white';
    context.lineWidth = 0.13;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.shadowColor = theme.glow;
    context.shadowBlur = 12;

    switch (this.type) {
      case 'doubleShooter':
        for (const x of [-0.3, 0.3]) {
          context.beginPath();
          context.moveTo(x, 0.46);
          context.lineTo(x, -0.34);
          context.stroke();
          context.beginPath();
          context.moveTo(x - 0.16, -0.16);
          context.lineTo(x, -0.42);
          context.lineTo(x + 0.16, -0.16);
          context.stroke();
        }
        break;

      case 'plusHp':
        context.fillRect(-0.12, -0.48, 0.24, 0.96);
        context.fillRect(-0.48, -0.12, 0.96, 0.24);
        break;

      case 'fasterShooter':
        context.beginPath();
        context.moveTo(0.1, -0.52);
        context.lineTo(-0.38, 0.08);
        context.lineTo(-0.04, 0.08);
        context.lineTo(-0.18, 0.52);
        context.lineTo(0.42, -0.18);
        context.lineTo(0.08, -0.18);
        context.closePath();
        context.fill();
        break;

      case 'petFaster':
        context.beginPath();
        context.ellipse(0, 0.2, 0.34, 0.27, 0, 0, Math.PI * 2);
        context.fill();
        for (const [x, y, r] of [
          [-0.34, -0.2, 0.14],
          [-0.12, -0.38, 0.13],
          [0.14, -0.38, 0.13],
          [0.36, -0.18, 0.14],
        ]) {
          context.beginPath();
          context.arc(x, y, r, 0, Math.PI * 2);
          context.fill();
        }
        break;

      case 'damageUp':
        context.beginPath();
        context.moveTo(0, -0.5);
        context.lineTo(-0.34, -0.1);
        context.lineTo(-0.13, -0.1);
        context.lineTo(-0.13, 0.46);
        context.lineTo(0.13, 0.46);
        context.lineTo(0.13, -0.1);
        context.lineTo(0.34, -0.1);
        context.closePath();
        context.fill();
        break;

      case 'speedBoost':
        for (const offset of [-0.2, 0.2]) {
          context.beginPath();
          context.moveTo(-0.38 + offset, -0.42);
          context.lineTo(0.02 + offset, 0);
          context.lineTo(-0.38 + offset, 0.42);
          context.stroke();
        }
        break;

      case 'piercingShot':
        context.beginPath();
        context.arc(0, 0.08, 0.3, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.moveTo(0, 0.52);
        context.lineTo(0, -0.46);
        context.moveTo(-0.18, -0.24);
        context.lineTo(0, -0.5);
        context.lineTo(0.18, -0.24);
        context.stroke();
        break;

      case 'superCharge': {
        context.beginPath();
        for (let i = 0; i < 10; i++) {
          const angle = -Math.PI / 2 + (i * Math.PI) / 5;
          const r = i % 2 === 0 ? 0.5 : 0.22;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.fill();
        break;
      }

      default:
        context.beginPath();
        context.moveTo(0, -0.5);
        context.lineTo(0.42, -0.28);
        context.lineTo(0.34, 0.2);
        context.quadraticCurveTo(0, 0.52, 0, 0.52);
        context.quadraticCurveTo(0, 0.52, -0.34, 0.2);
        context.lineTo(-0.42, -0.28);
        context.closePath();
        context.stroke();
        break;
    }

    context.restore();
  }

  drawText(context, theme) {
    context.save();
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const panelX = this.width * 0.08;
    const panelY = this.height * 0.55;
    const panelW = this.width * 0.84;
    const panelH = this.height * 0.34;
    const panelR = Math.max(8, this.width * 0.08);

    context.save();
    context.shadowColor = 'rgba(0,0,0,0.65)';
    context.shadowBlur = 10;
    this.roundRect(context, panelX, panelY, panelW, panelH, panelR);
    context.fillStyle = 'rgba(4, 12, 24, 0.58)';
    context.fill();
    context.restore();

    context.lineWidth = 1.5;
    this.roundRect(context, panelX, panelY, panelW, panelH, panelR);
    context.strokeStyle = 'rgba(255,255,255,0.24)';
    context.stroke();

    const titleY = panelY + panelH * 0.38;
    const subY = panelY + panelH * 0.72;

    const titleSize = Math.round(Math.max(11, this.width * 0.105));
    const subSize = Math.round(Math.max(9, this.width * 0.082));
    const maxTextW = panelW * 0.9;

    const tr = (key) => t?.(getLang?.() || 'en', key) ?? key;
    let line1, line2;
    switch (this.type) {
      case 'doubleShooter':
        line1 = tr('upgrade.doubleShooter.title');
        line2 = tr('upgrade.doubleShooter.sub');
        break;
      case 'plusHp':
        line1 = tr('upgrade.plusHp.title');
        line2 = tr('upgrade.plusHp.sub');
        break;
      case 'fasterShooter':
        line1 = tr('upgrade.fasterShooter.title');
        line2 = tr('upgrade.fasterShooter.sub');
        break;
      case 'petFaster':
        line1 = tr('upgrade.petFaster.title');
        line2 = tr('upgrade.petFaster.sub');
        break;
      case 'damageUp':
        line1 = tr('upgrade.damageUp.title');
        line2 = tr('upgrade.damageUp.sub');
        break;
      case 'speedBoost':
        line1 = tr('upgrade.speedBoost.title');
        line2 = tr('upgrade.speedBoost.sub');
        break;
      case 'piercingShot':
        line1 = tr('upgrade.piercingShot.title');
        line2 = tr('upgrade.piercingShot.sub');
        break;
      case 'superCharge':
        line1 = tr('upgrade.superCharge.title');
        line2 = tr('upgrade.superCharge.sub');
        break;
      default:
        line1 = tr('upgrade.shield.title');
        line2 = tr('upgrade.shield.sub');
        break;
    }

    const textPalette = this.getTextPalette();

    const titleGradient = context.createLinearGradient(
      panelX,
      titleY - titleSize * 0.65,
      panelX + panelW,
      titleY + titleSize * 0.45
    );
    titleGradient.addColorStop(0, textPalette.titleTop);
    titleGradient.addColorStop(0.45, '#ffffff');
    titleGradient.addColorStop(1, textPalette.titleBottom);

    this.setFittedFont(
      context,
      line1,
      titleSize,
      Math.max(10, titleSize * 0.72),
      maxTextW,
      900,
      this.titleFontFamily
    );
    context.fillStyle = titleGradient;
    context.shadowColor = textPalette.glow;
    context.shadowBlur = 10;
    context.lineWidth = Math.max(3, titleSize * 0.22);
    context.strokeStyle = 'rgba(0,0,0,0.72)';
    context.strokeText(line1, this.width / 2, titleY);
    context.fillText(line1, this.width / 2, titleY);

    const baseAlpha = context.globalAlpha;
    context.globalAlpha = baseAlpha * 0.72;
    context.lineWidth = Math.max(1.2, this.width * 0.012);
    context.strokeStyle = textPalette.line;
    context.beginPath();
    context.moveTo(panelX + panelW * 0.2, panelY + panelH * 0.55);
    context.lineTo(panelX + panelW * 0.8, panelY + panelH * 0.55);
    context.stroke();
    context.globalAlpha = baseAlpha;

    const subGradient = context.createLinearGradient(
      panelX,
      subY - subSize * 0.5,
      panelX + panelW,
      subY + subSize * 0.4
    );
    subGradient.addColorStop(0, textPalette.subTop);
    subGradient.addColorStop(1, textPalette.subBottom);

    this.setFittedFont(
      context,
      line2,
      subSize,
      Math.max(8, subSize * 0.78),
      maxTextW,
      800,
      this.fontFamily
    );
    context.shadowColor = textPalette.glow;
    context.shadowBlur = 6;
    context.lineWidth = Math.max(2, subSize * 0.18);
    context.strokeStyle = 'rgba(0,0,0,0.68)';
    context.fillStyle = subGradient;
    context.strokeText(line2, this.width / 2, subY);
    context.fillText(line2, this.width / 2, subY);

    context.restore();
  }

  setFittedFont(context, text, maxSize, minSize, maxWidth, weight, fontFamily = this.fontFamily) {
    let size = maxSize;
    do {
      context.font = `${weight} ${Math.round(size)}px ${fontFamily}`;
      if (context.measureText(text).width <= maxWidth) break;
      size -= 1;
    } while (size > minSize);
  }

  getTextPalette() {
    switch (this.type) {
      case 'doubleShooter':
        return {
          titleTop: '#9fffee',
          titleBottom: '#22ffbd',
          subTop: '#eafffb',
          subBottom: '#8effdf',
          line: 'rgba(60, 255, 200, 0.78)',
          glow: 'rgba(60, 255, 200, 0.95)',
        };
      case 'plusHp':
        return {
          titleTop: '#ffd0e0',
          titleBottom: '#ff4f96',
          subTop: '#fff1f6',
          subBottom: '#ff9fc4',
          line: 'rgba(255, 80, 140, 0.78)',
          glow: 'rgba(255, 80, 140, 0.95)',
        };
      case 'fasterShooter':
        return {
          titleTop: '#dbe7ff',
          titleBottom: '#73a3ff',
          subTop: '#ffffff',
          subBottom: '#aac6ff',
          line: 'rgba(110, 160, 255, 0.78)',
          glow: 'rgba(110, 160, 255, 0.95)',
        };
      case 'petFaster':
        return {
          titleTop: '#d8f9ff',
          titleBottom: '#41ddff',
          subTop: '#ffffff',
          subBottom: '#9df1ff',
          line: 'rgba(70, 220, 255, 0.78)',
          glow: 'rgba(70, 220, 255, 0.95)',
        };
      case 'damageUp':
        return {
          titleTop: '#ffe2b5',
          titleBottom: '#ff8c3c',
          subTop: '#fff7eb',
          subBottom: '#ffc47d',
          line: 'rgba(255, 140, 60, 0.78)',
          glow: 'rgba(255, 140, 60, 0.95)',
        };
      case 'speedBoost':
        return {
          titleTop: '#d8ffd8',
          titleBottom: '#50ff78',
          subTop: '#ffffff',
          subBottom: '#a8ffba',
          line: 'rgba(80, 255, 120, 0.78)',
          glow: 'rgba(80, 255, 120, 0.95)',
        };
      case 'piercingShot':
        return {
          titleTop: '#fff6bf',
          titleBottom: '#ffdb49',
          subTop: '#ffffff',
          subBottom: '#fff09b',
          line: 'rgba(255, 220, 80, 0.78)',
          glow: 'rgba(255, 220, 80, 0.95)',
        };
      case 'superCharge':
        return {
          titleTop: '#dff8ff',
          titleBottom: '#50dcff',
          subTop: '#ffffff',
          subBottom: '#9cecff',
          line: 'rgba(80, 220, 255, 0.78)',
          glow: 'rgba(80, 220, 255, 0.95)',
        };
      default:
        return {
          titleTop: '#f2dcff',
          titleBottom: '#b978ff',
          subTop: '#ffffff',
          subBottom: '#d5b2ff',
          line: 'rgba(180, 120, 255, 0.78)',
          glow: 'rgba(180, 120, 255, 0.95)',
        };
    }
  }

  getTheme() {
    switch (this.type) {
      case 'doubleShooter':
        return {
          bgTop: 'rgba(60, 255, 200, 0.18)',
          bgBottom: 'rgba(0, 0, 0, 0.55)',
          border: 'rgba(60, 255, 200, 0.85)',
          glow: 'rgba(60, 255, 200, 0.95)',
          iconBg: 'rgba(60, 255, 200, 0.18)',
          icon: '⟡',
        };
      case 'plusHp':
        return {
          bgTop: 'rgba(255, 80, 140, 0.18)',
          bgBottom: 'rgba(0, 0, 0, 0.55)',
          border: 'rgba(255, 80, 140, 0.85)',
          glow: 'rgba(255, 80, 140, 0.95)',
          iconBg: 'rgba(255, 80, 140, 0.18)',
          icon: '❤',
        };
      case 'fasterShooter':
        return {
          bgTop: 'rgba(110, 160, 255, 0.20)',
          bgBottom: 'rgba(0, 0, 0, 0.55)',
          border: 'rgba(110, 160, 255, 0.85)',
          glow: 'rgba(110, 160, 255, 0.95)',
          iconBg: 'rgba(110, 160, 255, 0.18)',
          icon: '⚡',
        };
      default:
        return {
          bgTop: 'rgba(180, 120, 255, 0.20)',
          bgBottom: 'rgba(0, 0, 0, 0.55)',
          border: 'rgba(180, 120, 255, 0.85)',
          glow: 'rgba(180, 120, 255, 0.95)',
          iconBg: 'rgba(180, 120, 255, 0.18)',
          icon: '🛡',
        };
      case 'petFaster':
        return {
          bgTop: 'rgba(70, 220, 255, 0.20)',
          bgBottom: 'rgba(0, 0, 0, 0.55)',
          border: 'rgba(70, 220, 255, 0.85)',
          glow: 'rgba(70, 220, 255, 0.95)',
          iconBg: 'rgba(70, 220, 255, 0.18)',
        };

      case 'damageUp':
        return {
          bgTop: 'rgba(255, 140, 60, 0.20)',
          bgBottom: 'rgba(0, 0, 0, 0.55)',
          border: 'rgba(255, 140, 60, 0.85)',
          glow: 'rgba(255, 140, 60, 0.95)',
          iconBg: 'rgba(255, 140, 60, 0.18)',
          icon: '✹',
        };

      case 'speedBoost':
        return {
          bgTop: 'rgba(80, 255, 120, 0.20)',
          bgBottom: 'rgba(0, 0, 0, 0.55)',
          border: 'rgba(80, 255, 120, 0.85)',
          glow: 'rgba(80, 255, 120, 0.95)',
          iconBg: 'rgba(80, 255, 120, 0.18)',
          icon: '➜',
        };

      case 'piercingShot':
        return {
          bgTop: 'rgba(255, 220, 80, 0.20)',
          bgBottom: 'rgba(0, 0, 0, 0.55)',
          border: 'rgba(255, 220, 80, 0.85)',
          glow: 'rgba(255, 220, 80, 0.95)',
          iconBg: 'rgba(255, 220, 80, 0.18)',
          icon: '☄',
        };

      case 'superCharge':
        return {
          bgTop: 'rgba(80, 220, 255, 0.20)',
          bgBottom: 'rgba(0, 0, 0, 0.55)',
          border: 'rgba(80, 220, 255, 0.85)',
          glow: 'rgba(80, 220, 255, 0.95)',
          iconBg: 'rgba(80, 220, 255, 0.18)',
          icon: '★',
        };
    }
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

function createUpgradeCards(game) {
  game.upgradeCards = [];

  const numberOfCards = 3;
  const cardWidth = game.width * 0.25;
  const spacing = cardWidth * 0.2;
  const totalWidth = numberOfCards * cardWidth + (numberOfCards - 1) * spacing;
  const startX = (game.width - totalWidth) / 2;
  const targetY = game.height / 2 - cardWidth * 0.6;

  const allTypes = [
    'doubleShooter',
    'plusHp',
    'fasterShooter',
    'shield',
    'petFaster',
    'damageUp',
    'speedBoost',
    'piercingShot',
    'superCharge',
  ];

  const selectedTypes = allTypes
    .filter((type) => canOfferUpgrade(game, type))
    .sort(() => 0.5 - Math.random())
    .slice(0, numberOfCards);

  for (let i = 0; i < numberOfCards; i++) {
    const card = new Upgrades(game);
    card.type = selectedTypes[i];
    card.width = cardWidth;
    card.height = card.width * 1.2;
    card.x = startX + i * (cardWidth + spacing);
    card.y = game.height + card.height;
    card.targetY = targetY;
    card.appearing = true;
    card.opacity = 0;
    game.upgradeCards.push(card);
  }
}

function canOfferUpgrade(game, type) {
  switch (type) {
    case 'doubleShooter':
      return !game.player.doubleShot;

    case 'petFaster':
      return !!game.pet;

    case 'plusHp':
      return game.player.lives < 3;

    case 'piercingShot':
      return !game.player.piercingShot;

    default:
      return true;
  }
}

window.Upgrades = Upgrades;
window.createUpgradeCards = createUpgradeCards;

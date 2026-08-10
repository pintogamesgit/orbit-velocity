function getSpriteAnimationDelta(deltaTime) {
  return deltaTime * (window.OrbitVelocityGamePerf?.spriteAnimScale ?? 1);
}

class Pet {
  constructor(game) {
    this.game = game;

    this.image = document.getElementById('chimboSprite');

    this.spriteWidth = 128;
    this.spriteHeight = 192;
    this.maxFrame = 7;

    this.frameX = 0;
    this.frameY = 0;
    this.frameTimer = 0;
    this.frameInterval = 90;

    this.width = 80;
    this.height = Math.round(
      this.width * (this.spriteHeight / this.spriteWidth)
    );

    this.offsetX = -60;
    this.offsetY = 60;

    this.x = 0;
    this.y = 0;

    this.lives = 3;
    this.invulnerable = false;
    this.invulnerableTimer = 0;
    this.invulnerableInterval = 2000;

    this.petBullets = [];
    this.shootTimer = 0;

    this.baseShootInterval = 8000;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    const p = this.game.player;

    const px = p.x + p.width / 2 - 40;
    const py = p.y + p.height / 2 + 60;

    this.x = px + this.offsetX;
    this.y = py - this.offsetY;

    this.frameTimer += getSpriteAnimationDelta(deltaTime);
    if (this.frameTimer > this.frameInterval) {
      this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
      this.frameTimer = 0;
    }

    this.shootTimer += deltaTime;
    const interval = Math.max(
      this.game.petCooldownMin,
      this.baseShootInterval * this.game.petCooldownMult
    );
    if (!this.game.gameOver && this.shootTimer >= interval) {
      this.shoot();
      this.shootTimer = 0;
    }

    let write = 0;
    for (let i = 0; i < this.petBullets.length; i++) {
      const bullet = this.petBullets[i];
      bullet.update(deltaTime);
      if (!bullet.markedForDeletion) {
        this.petBullets[write++] = bullet;
      }
    }
    this.petBullets.length = write;
  }

  shoot() {
    const target = this.game.getClosestEnemy(
      this.x + this.width / 2,
      this.y + this.height / 2
    );
    if (!target) return;

    this.petBullets.push(
      new Pet1Bullet(this.game, this.x + this.width / 2, this.y + 10, target)
    );
  }

  draw(ctx) {
    if (!this.image) return;

    ctx.save();
    if (this.invulnerable) ctx.globalAlpha = 0.65;

    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.restore();

    this.petBullets.forEach((b) => b.draw(ctx));
  }
}

class Pet1Bullet {
  constructor(game, x, y, target) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.size = 12;
    this.speed = 3;
    this.damage = 8;

    this.target = target;
    this.markedForDeletion = false;
    this.r = this.size * 0.5;
    this.width = this.size;
    this.height = this.size;

    this.vx = 0;
    this.vy = -this.speed;

    this.turnRate = 0.08;

    this.trail = [];
    this.trailMax = 10;

    this.hue = 185;
  }

  update(deltaTime) {
    const dt = deltaTime / 16.67;
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.trailMax) this.trail.shift();

    if (!this.target || this.target.markedForDeletion) {
      this.target = this.game.getClosestEnemy(this.x, this.y);
    }

    if (!this.target) {
      this.x += this.vx * dt;
      this.y += this.vy * dt;

      if (
        this.x < -50 ||
        this.x > this.game.width + 50 ||
        this.y < -50 ||
        this.y > this.game.height + 50
      ) {
        this.markedForDeletion = true;
      }
      return;
    }

    const tx = this.target.x + this.target.width / 2;
    const ty = this.target.y + this.target.height / 2;

    const desiredX = tx - this.x;
    const desiredY = ty - this.y;

    const desiredDist = Math.hypot(desiredX, desiredY);

    if (desiredDist < 12) {
      this.target.lives -= this.damage;
      this.markedForDeletion = true;
      return;
    }

    const desiredVX = (desiredX / desiredDist) * this.speed;
    const desiredVY = (desiredY / desiredDist) * this.speed;

    const turn = 1 - Math.pow(1 - this.turnRate, dt);
    this.vx += (desiredVX - this.vx) * turn;
    this.vy += (desiredVY - this.vy) * turn;

    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  draw(ctx) {
    const r = this.size * 0.5;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      const a = (i + 1) / this.trail.length;

      ctx.globalAlpha = 0.25 * a;
      ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, 1)`;
      ctx.beginPath();
      ctx.arc(t.x, t.y, r * (0.35 + 0.65 * a), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 0.75;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, 1)`;
    ctx.shadowBlur = 18;
    ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, 1)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 1.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.fillStyle = `hsla(${this.hue}, 100%, 92%, 1)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 0.55, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

class Siren {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById('sirenSprite');

    this.maxFrame = 6;
    this.spriteWidth = this.image.width / (this.maxFrame + 1);
    this.spriteHeight = this.image.height;

    this.width = 50;
    this.height = this.width * (this.spriteHeight / this.spriteWidth);

    this.offsetX = 60;
    this.offsetY = 120;

    this.x = this.game.player.x - this.distanceX;
    this.y = this.game.player.y - this.distanceY;

    this.lives = 2;
    this.invulnerable = false;
    this.invulnerableTimer = 0;
    this.invulnerableInterval = 2000;
    this.markedForDeletion = false;

    // Keep Siren's ability on the same cooldown as the other pet's shot.
    this.controlTimer = 0;
    this.baseControlInterval = 8000;

    this.frameX = 0;
    this.frameTimer = 0;
    this.frameInterval = 90;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(deltaTime) {
    const p = this.game.player;

    const px = p.x + p.width / 2;
    const py = p.y + p.height / 2;

    this.x = px + this.offsetX;
    this.y = py + this.offsetY;

    this.controlInterval = Math.max(
      this.game.petCooldownMin,
      Math.round(this.baseControlInterval * this.game.petCooldownMult)
    );

    this.frameTimer += getSpriteAnimationDelta(deltaTime);
    if (this.frameTimer > this.frameInterval) {
      this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
      this.frameTimer = 0;
    }

    this.controlTimer += deltaTime;
    if (this.controlTimer >= this.controlInterval && !this.game.gameOver) {
      if (this.findTarget()) {
        this.controlTimer = 0;
      } else {
        // Stay ready and activate as soon as two valid enemies are available.
        this.controlTimer = this.controlInterval;
      }
    }
  }

  findTarget() {
    let first = null;
    let count = 0;
    for (let i = 0; i < this.game.enemies.length; i++) {
      const enemy = this.game.enemies[i];
      if (
        !enemy.markedForDeletion &&
        enemy.lives > 0 &&
        !enemy.mindControlled &&
        typeof enemy.clearMindControl === 'function'
      ) {
        count++;
        if (Math.random() < 1 / count) first = enemy;
      }
    }
    if (count < 2 || !first) return false;

    let second = null;
    let secondCount = 0;
    for (let i = 0; i < this.game.enemies.length; i++) {
      const enemy = this.game.enemies[i];
      if (
        enemy !== first &&
        !enemy.markedForDeletion &&
        enemy.lives > 0 &&
        !enemy.mindControlled &&
        typeof enemy.clearMindControl === 'function'
      ) {
        secondCount++;
        if (Math.random() < 1 / secondCount) second = enemy;
      }
    }
    if (!second) return false;

    const controller = first;
    const target = second;

    controller.mindControlled = true;
    controller.mindTarget = target;
    controller.mindTimer = 0;

    target.mindControlled = true;
    target.mindTarget = controller;
    target.mindTimer = 0;
    return true;
  }

  draw(ctx) {
    if (!this.image) return;

    const drawX = this.x - this.width / 2;
    const drawY = this.y - this.height;

    const clampedX = Math.max(0, Math.min(this.game.width - this.width, drawX));

    const clampedY = Math.max(
      0,
      Math.min(this.game.height - this.height, drawY)
    );

    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      clampedX,
      clampedY,
      this.width,
      this.height
    );
  }
}

window.Pet = Pet;
window.Siren = Siren;

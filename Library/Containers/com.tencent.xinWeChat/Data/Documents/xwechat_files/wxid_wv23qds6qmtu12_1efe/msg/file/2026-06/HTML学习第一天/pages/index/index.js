const TAGS = [
  { name: '火锅', src: '../../assets/tag-hotpot.png' },
  { name: '烧肉', src: '../../assets/tag-bbq.png' },
  { name: '奶茶', src: '../../assets/tag-milktea.png' },
  { name: '麻辣烫', src: '../../assets/tag-spicyhotpot.png' },
  { name: '寿司', src: '../../assets/tag-sushi.png' },
  { name: '炸鸡', src: '../../assets/tag-friedchicken.png' }
];

const TIPS = {
  火锅: '想吃热乎一点，围着锅慢慢涮最有仪式感。',
  烧肉: '需要一点满足感的时候，烤盘滋啦作响最能治愈。',
  奶茶: '先喝点甜的补充快乐值，再决定正餐也来得及。',
  麻辣烫: '今天适合来一碗重口但稳妥的幸福感。',
  寿司: '想吃得清爽一点，寿司是最不容易踩雷的选择。',
  炸鸡: '如果今天想奖励自己，炸鸡永远是简单直接的答案。'
};

const SLOTS = [
  { left: 3, top: 13, rotate: -12, scale: 0.98 },
  { left: 29, top: 11, rotate: -8, scale: 0.99 },
  { left: 56, top: 15, rotate: 8, scale: 0.98 },
  { left: 11, top: 55, rotate: -6, scale: 0.92 },
  { left: 37, top: 58, rotate: 4, scale: 0.91 },
  { left: 63, top: 53, rotate: -9, scale: 0.92 }
];

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeInOutSine = t => -(Math.cos(Math.PI * t) - 1) / 2;

function rafPolyfill(cb) {
  if (typeof requestAnimationFrame === 'function') return requestAnimationFrame(cb);
  return setTimeout(() => cb(Date.now()), 16);
}

function cafPolyfill(id) {
  if (typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(id);
    return;
  }
  clearTimeout(id);
}

function tagStyle(tag) {
  return `left:${tag.x}%;top:${tag.y}%;opacity:${tag.opacity == null ? 1 : tag.opacity};transform:rotate(${tag.rotate}deg) scale(${tag.scale});`;
}

Page({
  data: {
    tags: TAGS.map((tag, index) => ({
      ...tag,
      className: '',
      style: tagStyle({ ...SLOTS[index] })
    })),
    flyingTag: {
      visible: false,
      src: '',
      style: ''
    },
    resultLabel: '今天吃：',
    resultName: '奶茶',
    resultTip: TIPS['奶茶']
  },

  onLoad() {
    this.tagStates = TAGS.map((tag, index) => ({
      ...tag,
      base: { ...SLOTS[index] },
      x: SLOTS[index].left,
      y: SLOTS[index].top,
      rotate: SLOTS[index].rotate,
      scale: SLOTS[index].scale,
      seed: Math.random() * Math.PI * 2,
      className: '',
      opacity: 1
    }));

    this.state = {
      phase: 'idle',
      startTime: 0,
      drawDuration: 2000,
      resultDuration: 2000,
      winnerIndex: 2,
      flight: null
    };

    this.frameHandle = rafPolyfill(this.frame.bind(this));
  },

  onUnload() {
    cafPolyfill(this.frameHandle);
  },

  handleStart() {
    if (this.state.phase !== 'idle') return;
    this.state.phase = 'spinning';
    this.state.startTime = Date.now();
    this.state.winnerIndex = Math.floor(Math.random() * this.tagStates.length);
    this.tagStates.forEach(tag => {
      tag.className = '';
      tag.opacity = 1;
    });
    this.setData({
      flyingTag: {
        visible: false,
        src: '',
        style: ''
      },
      resultLabel: '正在开奖',
      resultName: '',
      resultTip: '这次只摇机器里的标签，其他元素保持原图不动。',
      tags: this.tagStates.map(tag => ({
        name: tag.name,
        src: tag.src,
        className: tag.className,
        style: tagStyle(tag)
      }))
    });
  },

  frame(now) {
    const time = typeof now === 'number' ? now : Date.now();
    if (this.state.phase === 'spinning') {
      this.animateSpin(time - this.state.startTime);
    } else if (this.state.phase === 'result') {
      this.animateResult(time - this.state.startTime);
    } else {
      this.animateIdle(time);
    }
    this.frameHandle = rafPolyfill(this.frame.bind(this));
  },

  animateIdle(time) {
    const t = time / 1000;
    this.tagStates.forEach((tag, index) => {
      const idle = t + index + tag.seed;
      tag.x = tag.base.left + Math.sin(idle) * 0.7;
      tag.y = tag.base.top + Math.cos(idle * 1.1) * 0.7;
      tag.rotate = tag.base.rotate + Math.sin(idle * 0.8) * 1.6;
      tag.scale = tag.base.scale + Math.sin(idle) * 0.015;
    });
    this.syncTags();
  },

  animateSpin(elapsed) {
    const progress = clamp(elapsed / this.state.drawDuration, 0, 1);
    const decel = progress < 0.74 ? 1 : 1 - easeOutCubic((progress - 0.74) / 0.26) * 0.86;

    this.tagStates.forEach((tag, index) => {
      const s1 = elapsed / 110 + tag.seed + index * 0.5;
      const s2 = elapsed / 95 + tag.seed * 0.8;
      const s3 = elapsed / 80 + tag.seed;
      const s4 = elapsed / 125 + tag.seed;
      tag.x = tag.base.left + Math.sin(s1) * 9 * decel;
      tag.y = tag.base.top + Math.cos(s2) * 12 * decel;
      tag.rotate = tag.base.rotate + Math.sin(s3) * 30 * decel;
      tag.scale = tag.base.scale + Math.sin(s4) * 0.18 * decel;
    });

    this.syncTags();

    if (progress >= 1) {
      this.state.phase = 'result';
      this.state.startTime = Date.now();
      this.tagStates.forEach((tag, index) => {
        tag.className = index === this.state.winnerIndex ? 'result' : '';
      });
      this.setupFlight(this.tagStates[this.state.winnerIndex]);
    }
  },

  animateResult(elapsed) {
    const t = clamp(elapsed / this.state.resultDuration, 0, 1);
    const grow = easeOutCubic(clamp(t / 0.38, 0, 1));
    const travel = easeInOutSine(clamp((t - 0.14) / 0.86, 0, 1));
    const winner = this.tagStates[this.state.winnerIndex];

    this.tagStates.forEach((tag, index) => {
      if (index !== this.state.winnerIndex) {
        tag.x = lerp(tag.x, tag.base.left, 0.08);
        tag.y = lerp(tag.y, tag.base.top + 4, 0.08);
        tag.rotate = lerp(tag.rotate, tag.base.rotate, 0.08);
        tag.scale = lerp(tag.scale, tag.base.scale * 0.92, 0.08);
        tag.opacity = lerp(tag.opacity, 0.16, 0.08);
        return;
      }

      tag.opacity = lerp(tag.opacity, 0, 0.18);
      tag.rotate = lerp(tag.rotate, 0, 0.12);
      tag.scale = lerp(tag.scale, tag.base.scale * 0.9, 0.18);
    });

    this.syncTags(this.flightStyle(winner, grow, travel, t));

    if (t >= 1) {
      this.state.phase = 'idle';
      this.state.flight = null;
      this.tagStates.forEach(tag => {
        tag.className = '';
        tag.opacity = 1;
      });
      this.setData({
        flyingTag: {
          visible: false,
          src: '',
          style: ''
        },
        resultLabel: '今天吃：',
        resultName: winner.name,
        resultTip: TIPS[winner.name]
      });
    }
  },

  setupFlight(winner) {
    this.state.flight = {
      startX: 172,
      startY: 255,
      controlX: 220,
      controlY: 138,
      endX: 126,
      endY: 790,
      src: winner.src
    };
  },

  flightStyle(winner, grow, travel, t) {
    if (!this.state.flight) {
      return {
        visible: false,
        src: '',
        style: ''
      };
    }
    const { startX, startY, controlX, controlY, endX, endY, src } = this.state.flight;
    const curveX = Math.pow(1 - travel, 2) * startX + 2 * (1 - travel) * travel * controlX + Math.pow(travel, 2) * endX;
    const curveY = Math.pow(1 - travel, 2) * startY + 2 * (1 - travel) * travel * controlY + Math.pow(travel, 2) * endY;
    const scale = lerp(0.72, 1.9, grow);
    const rotate = lerp(winner.base.rotate, -4, travel);
    const fade = t > 0.82 ? 1 - (t - 0.82) / 0.18 : 1;
    return {
      visible: true,
      src,
      style: `left:${curveX}rpx;top:${curveY}rpx;opacity:${fade};transform:rotate(${rotate}deg) scale(${scale});`
    };
  },

  syncTags(flyingTag) {
    this.setData({
      tags: this.tagStates.map(tag => ({
        name: tag.name,
        src: tag.src,
        className: tag.className,
        style: tagStyle(tag)
      })),
      ...(flyingTag ? { flyingTag } : {})
    });
  }
});

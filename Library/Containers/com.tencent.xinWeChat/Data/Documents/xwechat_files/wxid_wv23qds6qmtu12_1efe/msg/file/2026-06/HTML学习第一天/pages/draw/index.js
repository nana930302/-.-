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

const app = getApp();

function pickVisibleEntries(list, targetName = '') {
  const pool = list.map(item => ({ ...item }));
  const visible = [];

  if (targetName) {
    const targetIndex = pool.findIndex(item => item.name === targetName);
    if (targetIndex >= 0) {
      visible.push(pool.splice(targetIndex, 1)[0]);
    }
  }

  while (visible.length < Math.min(6, list.length) && pool.length) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    visible.push(pool.splice(randomIndex, 1)[0]);
  }

  return visible;
}

Page({
  data: {
    category: 'food',
    pageTitle: '抽签页',
    pageSubtitle: '摇一摇，决定今天吃什么',
    resultLabel: '今天吃：',
    resultName: '奶茶',
    resultTip: '这次想吃得轻松一点。',
    tags: [],
    flyingTag: {
      visible: false,
      tone: '',
      name: '',
      style: ''
    },
    isFavorite: false
  },

  onLoad(query) {
    this.category = query.category === 'drink' ? 'drink' : 'food';
    this.setupCategory(this.category, query.target ? decodeURIComponent(query.target) : '');
    this.frameHandle = rafPolyfill(this.frame.bind(this));
  },

  onUnload() {
    cafPolyfill(this.frameHandle);
  },

  setupCategory(category, targetName = '') {
    const entries = app.getCatalog(category);
    const safeEntries = entries.length ? pickVisibleEntries(entries, targetName) : pickVisibleEntries(app.getCatalog('food'), targetName);

    this.tagStates = safeEntries.map((item, index) => ({
      ...item,
      base: { ...SLOTS[index] },
      x: SLOTS[index].left,
      y: SLOTS[index].top,
      rotate: SLOTS[index].rotate,
      scale: SLOTS[index].scale,
      seed: Math.random() * Math.PI * 2,
      className: '',
      opacity: 1
    }));

    const defaultEntry = safeEntries.find(item => item.name === targetName) || safeEntries[0];
    this.state = {
      phase: 'idle',
      startTime: 0,
      drawDuration: 2000,
      resultDuration: 2000,
      winnerIndex: 0,
      flight: null
    };

    this.category = category;
    this.setData({
      category,
      pageTitle: category === 'drink' ? '喝什么' : '抽签页',
      pageSubtitle: targetName
        ? (category === 'drink' ? '菜单已经帮你锁定这一杯' : '菜单已经帮你先选好了')
        : (category === 'drink' ? '摇一摇，决定今天喝什么' : '摇一摇，决定今天吃什么'),
      resultLabel: targetName ? '这次先定它：' : (category === 'drink' ? '今天喝：' : '今天吃：'),
      resultName: defaultEntry.name,
      resultTip: defaultEntry.tip,
      isFavorite: app.isFavorite(category, defaultEntry.name),
      flyingTag: {
        visible: false,
        tone: '',
        name: '',
        style: ''
      },
      tags: this.tagStates.map(tag => ({
        name: tag.name,
        tone: tag.tone,
        className: '',
        style: tagStyle(tag)
      }))
    });
  },

  goBack() {
    wx.navigateBack({
      fail: () => {
        wx.redirectTo({
          url: '/pages/home/index'
        });
      }
    });
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
      isFavorite: false,
      flyingTag: {
        visible: false,
        tone: '',
        name: '',
        style: ''
      },
      resultLabel: this.category === 'drink' ? '正在摇饮品' : '正在开奖',
      resultName: '',
      resultTip: this.category === 'drink' ? '这次看看今天最适合喝哪一杯。' : '这次只摇机器里的签条，其他元素保持原图不动。',
      tags: this.tagStates.map(tag => ({
        name: tag.name,
        tone: tag.tone,
        className: tag.className,
        style: tagStyle(tag)
      }))
    });
  },

  handleFavorite() {
    if (!this.data.resultName) return;

    const entry = this.tagStates.find(item => item.name === this.data.resultName);
    if (!entry) return;

    const active = app.toggleFavorite({
      type: this.category,
      name: entry.name,
      tip: entry.tip,
      tone: entry.tone
    });

    this.setData({
      isFavorite: active
    });

    wx.showToast({
      title: active ? '已加入收藏' : '已取消收藏',
      icon: 'none'
    });
  },

  switchCategory() {
    const next = this.category === 'food' ? 'drink' : 'food';
    this.setupCategory(next);
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
      app.addHistory({
        type: this.category,
        name: winner.name,
        tip: winner.tip,
        tone: winner.tone
      });
      this.setData({
        flyingTag: {
          visible: false,
          tone: '',
          name: '',
          style: ''
        },
        resultLabel: this.category === 'drink' ? '今天喝：' : '今天吃：',
        resultName: winner.name,
        resultTip: winner.tip,
        isFavorite: app.isFavorite(this.category, winner.name)
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
      name: winner.name,
      tone: winner.tone
    };
  },

  flightStyle(winner, grow, travel, t) {
    if (!this.state.flight) {
      return {
        visible: false,
        tone: '',
        name: '',
        style: ''
      };
    }
    const { startX, startY, controlX, controlY, endX, endY, name, tone } = this.state.flight;
    const curveX = Math.pow(1 - travel, 2) * startX + 2 * (1 - travel) * travel * controlX + Math.pow(travel, 2) * endX;
    const curveY = Math.pow(1 - travel, 2) * startY + 2 * (1 - travel) * travel * controlY + Math.pow(travel, 2) * endY;
    const scale = lerp(0.72, 1.9, grow);
    const rotate = lerp(winner.base.rotate, -4, travel);
    const fade = t > 0.82 ? 1 - (t - 0.82) / 0.18 : 1;
    return {
      visible: true,
      tone,
      name,
      style: `left:${curveX}rpx;top:${curveY}rpx;opacity:${fade};transform:rotate(${rotate}deg) scale(${scale});`
    };
  },

  syncTags(flyingTag) {
    this.setData({
      tags: this.tagStates.map(tag => ({
        name: tag.name,
        tone: tag.tone,
        className: tag.className,
        style: tagStyle(tag)
      })),
      ...(flyingTag ? { flyingTag } : {})
    });
  }
});

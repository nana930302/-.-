Page({
  onLoad() {
    this.timer = setTimeout(() => {
      wx.redirectTo({
        url: '/pages/home/index'
      });
    }, 1600);
  },

  onUnload() {
    if (this.timer) clearTimeout(this.timer);
  },

  enterApp() {
    if (this.timer) clearTimeout(this.timer);
    wx.redirectTo({
      url: '/pages/home/index'
    });
  }
});

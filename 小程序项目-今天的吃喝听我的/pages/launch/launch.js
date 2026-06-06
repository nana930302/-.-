// pages/launch/launch.js

Page({
  data: {
    showContent: false,
    showCharacters: false,
    showTip: false
  },

  onLoad: function() {
    this.showAnimation();
  },

  showAnimation: function() {
    const self = this;
    
    // 逐步显示内容
    setTimeout(() => {
      self.setData({ showContent: true });
    }, 200);

    setTimeout(() => {
      self.setData({ showCharacters: true });
    }, 500);

    setTimeout(() => {
      self.setData({ showTip: true });
    }, 1200);

    // 3秒后跳转到主页面
    setTimeout(() => {
      wx.redirectTo({
        url: '../index/index',
        success: function() {
          console.log('跳转到主页面');
        },
        fail: function(err) {
          console.error('跳转失败:', err);
        }
      });
    }, 3500);
  },

  // 允许用户点击跳过
  skipLaunch: function() {
    wx.redirectTo({
      url: '../index/index'
    });
  }
});

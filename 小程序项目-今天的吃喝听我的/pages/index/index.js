// pages/index/index.js

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },

  onLoad: function() {
    // 检查用户是否已授权
    const self = this;
    
    // 检查是否支持 getUserProfile
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
  },

  onReady: function() {
    // 页面初始化完成
  },

  onShow: function() {
    // 页面显示时调用
  },

  // 处理点击推荐卡片
  onRecommendTap: function(e) {
    const dataset = e.currentTarget.dataset;
    wx.showToast({
      title: '即将加载推荐列表',
      icon: 'loading',
      duration: 1500
    });
  },

  // 处理点击功能项
  onFeatureTap: function(e) {
    const index = e.currentTarget.dataset.index;
    const features = ['随机推荐', '我的收藏', '评分排行', '设置'];
    
    wx.showToast({
      title: features[index],
      icon: 'success',
      duration: 1500
    });
  }
});

// app.js

App({
  onLaunch: function() {
    // 应用启动
    console.log('应用启动');
    
    // 初始化应用数据
    this.globalData = {
      userInfo: null,
      appName: '今天的吃喝听我的'
    };
  },

  onShow: function() {
    // 应用显示时调用
    console.log('应用显示');
  },

  onHide: function() {
    // 应用隐藏时调用
    console.log('应用隐藏');
  },

  globalData: {
    userInfo: null,
    appName: '今天的吃喝听我的'
  }
});

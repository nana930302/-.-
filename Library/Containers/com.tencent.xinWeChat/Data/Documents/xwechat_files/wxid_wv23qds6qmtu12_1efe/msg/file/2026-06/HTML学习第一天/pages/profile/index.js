const app = getApp();

Page({
  data: {
    stats: {
      favoriteCount: 0,
      historyCount: 0,
      foodCount: 0,
      drinkCount: 0
    },
    history: [],
    insight: {
      summary: '',
      latest: null,
      preferredType: null,
      favoritePreview: []
    }
  },

  onShow() {
    this.setData({
      stats: app.getStats(),
      history: app.getHistory().slice(0, 6),
      insight: app.getInsight()
    });
  },

  clearFavorites() {
    wx.showModal({
      title: '清空收藏',
      content: '确认清空所有收藏吗？',
      success: res => {
        if (!res.confirm) return;
        app.clearFavorites();
        this.onShow();
      }
    });
  },

  clearHistory() {
    wx.showModal({
      title: '清空记录',
      content: '确认清空最近抽签记录吗？',
      success: res => {
        if (!res.confirm) return;
        app.clearHistory();
        this.onShow();
      }
    });
  },

  handleNav(event) {
    const { page } = event.currentTarget.dataset;
    const routes = {
      home: '/pages/home/index',
      drinks: '/pages/drinks/index',
      favorites: '/pages/favorites/index',
      profile: '/pages/profile/index'
    };
    if (page === 'profile') return;
    wx.redirectTo({
      url: routes[page]
    });
  }
});

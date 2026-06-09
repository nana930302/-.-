const app = getApp();

Page({
  data: {
    favorites: []
  },

  onShow() {
    this.setData({
      favorites: app.getFavorites()
    });
  },

  removeFavorite(event) {
    const { id } = event.currentTarget.dataset;
    const favorites = app.removeFavorite(id);
    this.setData({
      favorites
    });
    wx.showToast({
      title: '已移除',
      icon: 'none'
    });
  },

  goDraw(event) {
    const { type } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/draw/index?category=${type}`
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
    if (page === 'favorites') return;
    wx.redirectTo({
      url: routes[page]
    });
  }
});

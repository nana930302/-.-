const app = getApp();

Page({
  data: {
    stats: {
      favoriteCount: 0,
      historyCount: 0
    },
    foodPicks: [],
    drinkPicks: [],
    recentHistory: [],
    insight: {
      summary: '',
      latest: null
    }
  },

  onShow() {
    const stats = app.getStats();
    const foodPicks = app.getCatalog('food').slice(0, 4);
    const drinkPicks = app.getCatalog('drink').slice(0, 3);
    const recentHistory = app.getHistory().slice(0, 2);
    const insight = app.getInsight();
    this.setData({
      stats,
      foodPicks,
      drinkPicks,
      recentHistory,
      insight
    });
  },

  goDrawFood() {
    wx.navigateTo({
      url: '/pages/draw/index?category=food'
    });
  },

  goDrawDrink() {
    wx.navigateTo({
      url: '/pages/draw/index?category=drink'
    });
  },

  goDrinks() {
    wx.navigateTo({
      url: '/pages/drinks/index'
    });
  },

  goMenu() {
    wx.navigateTo({
      url: '/pages/menu/index'
    });
  },

  goFavorites() {
    wx.navigateTo({
      url: '/pages/favorites/index'
    });
  },

  goProfile() {
    wx.navigateTo({
      url: '/pages/profile/index'
    });
  },

  pickLatest() {
    const latest = this.data.insight.latest;
    if (!latest) {
      this.goDrawFood();
      return;
    }
    wx.navigateTo({
      url: `/pages/draw/index?category=${latest.type}&target=${encodeURIComponent(latest.name)}&source=home`
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

    if (page === 'home') return;
    wx.redirectTo({
      url: routes[page]
    });
  }
});

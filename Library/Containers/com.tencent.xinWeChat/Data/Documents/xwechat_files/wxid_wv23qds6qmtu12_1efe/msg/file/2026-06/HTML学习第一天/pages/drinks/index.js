const app = getApp();

Page({
  data: {
    drinks: [],
    recentDrink: null,
    drinkPage: 1,
    pageSize: 16,
    totalDrinks: 0,
    hasMoreDrinks: true,
    isLoadingMore: false,
    flavorOptions: [],
    activeFlavor: '全部',
    sortMode: 'default'
  },

  onShow() {
    this.setData({
      flavorOptions: app.getFlavorOptions('drink')
    });
    const recentDrink = app.getHistory().find(item => item.type === 'drink') || null;
    this.setData({
      drinks: [],
      recentDrink,
      drinkPage: 1,
      totalDrinks: 0,
      hasMoreDrinks: true,
      isLoadingMore: false
    });
    this.loadMoreDrinks();
  },

  onReachBottom() {
    this.loadMoreDrinks();
  },

  goDrawDrink() {
    wx.navigateTo({
      url: '/pages/draw/index?category=drink'
    });
  },

  changeFlavor(event) {
    const { flavor } = event.currentTarget.dataset;
    if (flavor === this.data.activeFlavor) return;
    this.setData({
      activeFlavor: flavor,
      drinks: [],
      drinkPage: 1,
      totalDrinks: 0,
      hasMoreDrinks: true,
      isLoadingMore: false
    });
    this.loadMoreDrinks();
  },

  changeSort(event) {
    const { sort } = event.currentTarget.dataset;
    if (sort === this.data.sortMode) return;
    this.setData({
      sortMode: sort,
      drinks: [],
      drinkPage: 1,
      totalDrinks: 0,
      hasMoreDrinks: true,
      isLoadingMore: false
    });
    this.loadMoreDrinks();
  },

  chooseDrink(event) {
    const { name } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/draw/index?category=drink&target=${encodeURIComponent(name)}&source=drinks`
    });
  },

  toggleFavorite(event) {
    const { name } = event.currentTarget.dataset;
    const entry = app.getCatalog('drink').find(item => item.name === name);
    if (!entry) return;
    const active = app.toggleFavorite({
      type: 'drink',
      name: entry.name,
      tip: entry.tip,
      tone: entry.tone
    });
    this.setData({
      drinks: this.data.drinks.map(item => item.name === name ? { ...item, isFavorite: active } : item)
    });
    wx.showToast({
      title: active ? '已加入收藏' : '已取消收藏',
      icon: 'none'
    });
  },

  loadMoreDrinks() {
    if (!this.data.hasMoreDrinks || this.data.isLoadingMore) return;
    this.setData({
      isLoadingMore: true
    });
    const { list, total, hasMore } = app.getCatalogPage('drink', this.data.drinkPage, this.data.pageSize, {
      flavor: this.data.activeFlavor,
      sort: this.data.sortMode
    });
    const decorated = list.map(item => ({
      ...item,
      isFavorite: app.isFavorite('drink', item.name)
    }));
    this.setData({
      drinks: this.data.drinks.concat(decorated),
      totalDrinks: total,
      hasMoreDrinks: hasMore,
      drinkPage: this.data.drinkPage + 1,
      isLoadingMore: false
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
    if (page === 'drinks') return;
    wx.redirectTo({
      url: routes[page]
    });
  }
});

const app = getApp();

Page({
  data: {
    foods: [],
    foodPage: 1,
    pageSize: 20,
    totalFoods: 0,
    hasMoreFoods: true,
    isLoadingMore: false,
    flavorOptions: [],
    activeFlavor: '全部',
    sortMode: 'default'
  },

  onShow() {
    this.setData({
      flavorOptions: app.getFlavorOptions('food')
    });
    this.resetAndLoad();
  },

  onReachBottom() {
    this.loadMoreFoods();
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

  goDraw(event) {
    const { category } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/draw/index?category=${category}`
    });
  },

  goDrinks() {
    wx.navigateTo({
      url: '/pages/drinks/index'
    });
  },

  changeFlavor(event) {
    const { flavor } = event.currentTarget.dataset;
    if (flavor === this.data.activeFlavor) return;
    this.setData({
      activeFlavor: flavor
    });
    this.resetAndLoad();
  },

  changeSort(event) {
    const { sort } = event.currentTarget.dataset;
    if (sort === this.data.sortMode) return;
    this.setData({
      sortMode: sort
    });
    this.resetAndLoad();
  },

  chooseItem(event) {
    const { category, name } = event.currentTarget.dataset;
    const entry = this.findEntry(category, name);
    app.addHistory({
      ...entry,
      type: category
    });
    wx.navigateTo({
      url: `/pages/draw/index?category=${category}&target=${encodeURIComponent(name)}&source=menu`
    });
  },

  toggleFavorite(event) {
    const { category, name } = event.currentTarget.dataset;
    const entry = this.findEntry(category, name);
    const active = app.toggleFavorite({
      type: category,
      name: entry.name,
      tip: entry.tip,
      tone: entry.tone
    });
    this.refreshVisibleFoods();
    wx.showToast({
      title: active ? '已加入收藏' : '已取消收藏',
      icon: 'none'
    });
  },

  resetAndLoad() {
    this.setData({
      foods: [],
      foodPage: 1,
      totalFoods: 0,
      hasMoreFoods: true,
      isLoadingMore: false
    });
    this.loadMoreFoods();
  },

  loadMoreFoods() {
    if (!this.data.hasMoreFoods || this.data.isLoadingMore) return;

    this.setData({
      isLoadingMore: true
    });

    const { list, total, hasMore } = app.getCatalogPage('food', this.data.foodPage, this.data.pageSize, {
      flavor: this.data.activeFlavor,
      sort: this.data.sortMode
    });
    const nextFoods = this.data.foods.concat(this.decorateList('food', list));

    this.setData({
      foods: nextFoods,
      totalFoods: total,
      hasMoreFoods: hasMore,
      foodPage: this.data.foodPage + 1,
      isLoadingMore: false
    });
  },

  refreshVisibleFoods() {
    const currentCount = this.data.foods.length;
    const list = app.getCatalogView('food', {
      flavor: this.data.activeFlavor,
      sort: this.data.sortMode
    }).slice(0, currentCount);
    this.setData({
      foods: this.decorateList('food', list),
      totalFoods: app.getCatalogView('food', {
        flavor: this.data.activeFlavor,
        sort: this.data.sortMode
      }).length
    });
  },

  decorateList(category, list) {
    return list.map(item => ({
      ...item,
      category,
      isFavorite: app.isFavorite(category, item.name)
    }));
  },

  findEntry(category, name) {
    return app.getCatalog(category).find(item => item.name === name);
  }
});

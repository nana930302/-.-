const STORAGE_KEYS = {
  favorites: 'meal_picker_favorites',
  history: 'meal_picker_history'
};

const TONES = ['tone-pink', 'tone-lime', 'tone-blue', 'tone-orange', 'tone-purple', 'tone-coral'];

const FOOD_BASES = [
  { name: '火锅', tip: '想吃热乎一点，围着锅慢慢涮最有仪式感。', flavor: '暖胃' },
  { name: '烧肉', tip: '需要一点满足感的时候，烤盘滋啦作响最能治愈。', flavor: '浓郁' },
  { name: '麻辣烫', tip: '今天适合来一碗重口但稳妥的幸福感。', flavor: '重口' },
  { name: '寿司', tip: '想吃得清爽一点，寿司是最不容易踩雷的选择。', flavor: '清爽' },
  { name: '炸鸡', tip: '如果今天想奖励自己，炸鸡永远是简单直接的答案。', flavor: '油香' },
  { name: '牛肉面', tip: '想要一顿扎实又有热气的满足感，这类主食最稳。', flavor: '暖胃' },
  { name: '小笼包', tip: '今天适合吃点经典又不会出错的热腾腾选择。', flavor: '鲜香' },
  { name: '烤鱼', tip: '适合想把口味拉满，边聊边慢慢吃的一顿。', flavor: '重口' },
  { name: '汉堡薯条', tip: '如果今天想省心又想吃得痛快，它很难让人失望。', flavor: '油香' },
  { name: '拌饭', tip: '想快点解决选择困难，又想吃得有内容，这个很合适。', flavor: '鲜香' }
];

const FOOD_CUISINES = ['川味', '湘味', '粤式', '台式', '日式', '韩式', '泰式', '闽南', '东北', '西北'];
const FOOD_METHODS = ['爆炒', '炭烤', '铁板', '红烧', '盐酥', '椒麻', '咖喱', '酸汤', '蒜香', '番茄'];
const FOOD_MAINS = ['鸡腿饭', '牛肉锅', '肥牛饭', '海鲜面', '虾仁炒饭', '排骨煲', '土豆鸡', '豆花鱼', '烤肠拼盘', '芝士焗饭'];

const COCKTAIL_NAMES = [
  '莫吉托', '玛格丽特', '长岛冰茶', '自由古巴', '血腥玛丽', '曼哈顿', '尼格罗尼', '古典鸡尾酒', '金汤力', '白俄罗斯',
  '黑俄罗斯', '龙舌兰日出', '椰林飘香', '大都会', '戴吉利', '干马天尼', '威士忌酸', '边车', '爱尔兰咖啡', '新加坡司令',
  '金菲士', '薄荷朱利普', '航空', '汤姆柯林斯', '帕洛玛', '海风', '咸狗', '科斯莫波利坦', '僵尸', '飓风',
  '迈泰', '蓝色夏威夷', '法国75', '纸飞机', '老广场', '教父', '教母', '自由法兰西', '白色佳人', '亚历山大',
  '琴蕾', '波旁高球', '黑麦曼哈顿', '杏仁酸', '末班车', '南方骡子', '蜜蜂之膝', '最后的话', '苜蓿俱乐部', '猴腺',
  '玫瑰', '基尔皇家', '贝里尼', '含羞草', '阿佩罗橙光', '内格罗尼斯巴利亚托', '美式咖啡酒', '罗布罗伊', '锈钉', '萨泽拉克',
  '维斯帕', '苦艾菲兹', '绿蜥蜴', '蓝色泻湖', '苹果马天尼', '浓缩咖啡马天尼', '柯梦波丹', '法式马天尼', '荔枝马天尼', '意式苦橙汽泡',
  '暗黑风暴', '古巴微风', '卡皮里尼亚', '卡皮罗丝卡', '巴西日出', '琴酒酸', '朗姆酸', '波本酸', '梅斯卡尔帕洛玛', '龙舌兰酸',
  '雪莉高球', '乌龙高球', '柚子金汤力', '葡萄柚菲兹', '洛神莫吉托', '百香果玛格丽特', '草莓戴吉利', '芒果椰林飘香', '青提气泡酒', '蜜桃贝里尼',
  '茉莉花马天尼', '桂花金菲士', '乌梅高球', '橙花科林斯', '黑醋栗司令', '蓝莓琴蕾', '热带迈泰', '烟熏古典', '蜂蜜波本酸', '西柚海风'
];

const FOOD_FLAVOR_BY_METHOD = {
  爆炒: '锅气',
  炭烤: '浓郁',
  铁板: '鲜香',
  红烧: '浓郁',
  盐酥: '油香',
  椒麻: '重口',
  咖喱: '香浓',
  酸汤: '酸香',
  蒜香: '鲜香',
  番茄: '清爽'
};

const DRINK_FLAVOR_ORDER = ['清爽', '果香', '花香', '酸感', '苦甜', '醇厚'];
const FOOD_FLAVOR_ORDER = ['清爽', '鲜香', '暖胃', '锅气', '香浓', '浓郁', '酸香', '油香', '重口'];

function withTone(list) {
  return list.map((item, index) => ({
    ...item,
    tone: TONES[index % TONES.length]
  }));
}

function getDrinkFlavor(name) {
  if (name.includes('莫吉托') || name.includes('高球') || name.includes('菲兹') || name.includes('海风')) return '清爽';
  if (name.includes('花') || name.includes('茉莉') || name.includes('桂花') || name.includes('橙花')) return '花香';
  if (name.includes('柚') || name.includes('葡萄') || name.includes('百香果') || name.includes('草莓') || name.includes('蜜桃') || name.includes('荔枝') || name.includes('蓝莓') || name.includes('苹果')) return '果香';
  if (name.includes('酸') || name.includes('玛格丽特') || name.includes('戴吉利') || name.includes('帕洛玛')) return '酸感';
  if (name.includes('古典') || name.includes('曼哈顿') || name.includes('尼格罗尼') || name.includes('马天尼') || name.includes('萨泽拉克') || name.includes('锈钉')) return '苦甜';
  return '醇厚';
}

function sortByFlavor(list, order) {
  const rank = order.reduce((map, item, index) => {
    map[item] = index;
    return map;
  }, {});

  return [...list].sort((a, b) => {
    const flavorDiff = (rank[a.flavor] ?? 999) - (rank[b.flavor] ?? 999);
    if (flavorDiff !== 0) return flavorDiff;
    return a.name.localeCompare(b.name, 'zh-Hans-CN');
  });
}

function buildFoodCatalog() {
  const generated = [];
  FOOD_CUISINES.forEach((cuisine, cuisineIndex) => {
    FOOD_METHODS.forEach((method, methodIndex) => {
      FOOD_MAINS.forEach((main, mainIndex) => {
        generated.push({
          name: `${cuisine}${method}${main}`,
          tip: `今天如果想吃得更有方向感，${cuisine}风味配上${method}路线，会是很稳的一餐。`,
          flavor: FOOD_FLAVOR_BY_METHOD[method] || '鲜香',
          tone: TONES[(cuisineIndex + methodIndex + mainIndex) % TONES.length]
        });
      });
    });
  });

  return withTone(FOOD_BASES).concat(generated).slice(0, 220);
}

function buildDrinkCatalog() {
  return COCKTAIL_NAMES.map((name, index) => ({
    name,
    tone: TONES[index % TONES.length],
    flavor: getDrinkFlavor(name),
    tip: `如果今天想试一杯更有调酒感的选择，${name}会带来更完整的香气和层次。`
  }));
}

const CATALOG = {
  food: buildFoodCatalog(),
  drink: buildDrinkCatalog()
};

function readList(key) {
  try {
    return wx.getStorageSync(key) || [];
  } catch (error) {
    return [];
  }
}

function writeList(key, value) {
  try {
    wx.setStorageSync(key, value);
  } catch (error) {
    // Ignore storage failures to keep the demo usable.
  }
}

App({
  globalData: {
    catalog: CATALOG
  },

  getCatalog(type) {
    return (this.globalData.catalog[type] || []).map(item => ({ ...item }));
  },

  getCatalogView(type, options = {}) {
    const { flavor = '全部', sort = 'default' } = options;
    let catalog = this.getCatalog(type);
    if (flavor && flavor !== '全部') {
      catalog = catalog.filter(item => item.flavor === flavor);
    }
    if (sort === 'flavor') {
      catalog = sortByFlavor(catalog, type === 'drink' ? DRINK_FLAVOR_ORDER : FOOD_FLAVOR_ORDER);
    } else if (sort === 'name') {
      catalog = [...catalog].sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'));
    }
    return catalog;
  },

  getCatalogPage(type, page = 1, pageSize = 20, options = {}) {
    const catalog = this.getCatalogView(type, options);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      list: catalog.slice(start, end).map(item => ({ ...item })),
      total: catalog.length,
      hasMore: end < catalog.length
    };
  },

  getFlavorOptions(type) {
    const catalog = this.globalData.catalog[type] || [];
    const order = type === 'drink' ? DRINK_FLAVOR_ORDER : FOOD_FLAVOR_ORDER;
    const flavors = [...new Set(catalog.map(item => item.flavor).filter(Boolean))];
    const sorted = order.filter(item => flavors.includes(item)).concat(flavors.filter(item => !order.includes(item)));
    return ['全部'].concat(sorted);
  },

  getFavorites() {
    return readList(STORAGE_KEYS.favorites);
  },

  getHistory() {
    return readList(STORAGE_KEYS.history);
  },

  isFavorite(type, name) {
    return this.getFavorites().some(item => item.type === type && item.name === name);
  },

  toggleFavorite(entry) {
    const favorites = this.getFavorites();
    const existingIndex = favorites.findIndex(item => item.type === entry.type && item.name === entry.name);

    if (existingIndex >= 0) {
      favorites.splice(existingIndex, 1);
      writeList(STORAGE_KEYS.favorites, favorites);
      return false;
    }

    favorites.unshift({
      ...entry,
      id: `${entry.type}-${entry.name}`,
      createdAt: Date.now()
    });
    writeList(STORAGE_KEYS.favorites, favorites);
    return true;
  },

  removeFavorite(id) {
    const favorites = this.getFavorites().filter(item => item.id !== id);
    writeList(STORAGE_KEYS.favorites, favorites);
    return favorites;
  },

  addHistory(entry) {
    const history = this.getHistory();
    history.unshift({
      ...entry,
      id: `${entry.type}-${entry.name}-${Date.now()}`,
      createdAt: Date.now()
    });
    writeList(STORAGE_KEYS.history, history.slice(0, 20));
  },

  clearFavorites() {
    writeList(STORAGE_KEYS.favorites, []);
  },

  clearHistory() {
    writeList(STORAGE_KEYS.history, []);
  },

  getStats() {
    const favorites = this.getFavorites();
    const history = this.getHistory();
    const foodCount = history.filter(item => item.type === 'food').length;
    const drinkCount = history.filter(item => item.type === 'drink').length;
    return {
      favoriteCount: favorites.length,
      historyCount: history.length,
      foodCount,
      drinkCount
    };
  },

  getInsight() {
    const history = this.getHistory();
    const favorites = this.getFavorites();
    const latest = history[0];
    const mode = history.length
      ? (history.filter(item => item.type === 'drink').length > history.filter(item => item.type === 'food').length ? 'drink' : 'food')
      : null;

    return {
      latest,
      favoritePreview: favorites.slice(0, 2),
      preferredType: mode,
      summary: latest
        ? `你最近更像在找${mode === 'drink' ? '喝什么' : '吃什么'}，上次选的是${latest.name}。`
        : '还没有留下选择记录，先去摇一摇找到今天的答案吧。'
    };
  }
});

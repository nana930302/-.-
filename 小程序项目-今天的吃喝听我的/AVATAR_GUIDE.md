# 🎭 头像和图片资源说明

## 📸 头像设计

本小程序使用两个卡通形象作为品牌代表：

### 喵喵（小猫）
- **角色**：午餐小顾问
- **颜色**：暖橙色 (#FF9F5A)
- **特点**：可爱的猫脸、立起来的猫耳朵、胡须
- **应用场景**：午餐推荐、品牌头像、启动页面

### 汪汪（小狗）
- **角色**：晚餐小顾问  
- **颜色**：棕色 (#A0522D)
- **特点**：友善的狗脸、垂下来的狗耳朵、卷尾巴
- **应用场景**：晚餐推荐、品牌头像、启动页面

## 🎨 使用头像

### 方案一：使用 SVG（推荐）
所有卡通形象都使用 SVG 格式绘制，具有以下优势：
- ✅ 任意缩放无失真
- ✅ 文件体积小
- ✅ 支持动画效果
- ✅ 易于修改颜色和细节

**SVG 位置**：
- 启动页：`pages/launch/launch.wxml` 内的 `<svg>` 标签
- 可以复制 SVG 代码到其他位置使用

### 方案二：导出为 PNG
如果需要导出为静态图片：

1. **使用在线工具**
   - https://www.svgconverter.com/
   - 将 SVG 代码粘贴并导出为 PNG

2. **使用 ImageMagick（命令行）**
   ```bash
   convert -background transparent cat.svg cat.png
   convert -background transparent dog.svg dog.png
   ```

3. **使用 Inkscape（图形编辑）**
   - 导入 SVG 文件
   - 导出为 PNG、JPG 等格式

## 📐 头像规格

### 启动页面头像
- **尺寸**：180rpx × 180rpx
- **格式**：SVG（内联于 WXML）
- **用途**：启动动画展示

### 应用头像（app icon）
建议规格：
- 192×192px（最小）
- 512×512px（推荐）
- 1024×1024px（最高质量）

### 微信头像圆形版本
为适配微信头像显示，建议制作圆形版本：

```svg
<svg viewBox="0 0 200 200">
  <!-- 圆形背景 -->
  <circle cx="100" cy="100" r="100" fill="#FFF5E6"/>
  
  <!-- 卡通头部 -->
  <!-- ... SVG 代码 ... -->
</svg>
```

## 🎯 集成头像到小程序

### 1. 应用全局头像
修改 `app.json` 添加应用头像：
```json
{
  "window": {
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTitleText": "今天的吃喝听我的",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "assets/home.png",
        "selectedIconPath": "assets/home-active.png"
      }
    ]
  }
}
```

### 2. 用户头像
在用户信息卡片上显示喵喵或汪汪头像：
```wxml
<view class="user-avatar">
  <svg class="avatar-svg" viewBox="0 0 200 200">
    <!-- 喵喵 SVG 代码 -->
  </svg>
</view>
```

### 3. 品牌 Logo
在应用启动页、关于页面等位置显示品牌 Logo。

## 🖼️ 提取 SVG 代码

### 喵喵的 SVG 代码位置
文件：`pages/launch/launch.wxml`
搜索：`<svg class="cat-svg"`

### 汪汪的 SVG 代码位置
文件：`pages/launch/launch.wxml`
搜索：`<svg class="dog-svg"`

### 复用 SVG 的方法

**创建 SVG 组件文件**（可选）：

创建 `components/cat-avatar.wxml`：
```wxml
<svg class="cat-avatar" viewBox="0 0 200 200">
  <!-- 喵喵 SVG 代码 -->
</svg>
```

然后在其他页面引用：
```wxml
<import src="../../components/cat-avatar.wxml"/>
<template is="cat-avatar"/>
```

## 🎨 自定义头像

### 修改喵喵的颜色
在 `pages/launch/launch.wxml` 中搜索 `#FF9F5A`，替换为新颜色。

**喵喵的所有颜色属性**：
- 头部：`#FF9F5A`
- 内耳：`#FFB88C`
- 鼻子：`#FF69B4`
- 爪子：`#FFB88C`

### 修改汪汪的颜色
在 `pages/launch/launch.wxml` 中搜索 `#A0522D`，替换为新颜色。

**汪汪的所有颜色属性**：
- 头部：`#A0522D`
- 内耳：`#CD853F`
- 鼻子：`#000000`
- 爪子：`#CD853F`

### 添加更多细节
可以在 SVG 中添加：
- 更多毛发纹理（增加 `<circle>` 元素）
- 眼神高光（增加小 `<circle>` 元素）
- 配饰（帽子、眼镜等）
- 动画效果（`<animate>` 标签）

## 📱 微信小程序头像要求

### 官方要求
- **格式**：PNG、JPG、GIF
- **尺寸**：512×512px 或更大
- **文件大小**：不超过 2MB
- **内容**：不能包含二维码、联系方式等

### 上传位置
- 微信公众平台 → 管理 → 基本信息 → 小程序头像

## 🚀 进阶：动画头像

为头像添加动画效果：

```wxss
.cat-avatar {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

## 💡 设计建议

1. **保持一致性**：整个小程序使用统一的卡通风格
2. **清晰可识别**：头像在小尺寸下也能清晰显示
3. **品牌认知**：用户一眼能识别喵喵和汪汪的形象
4. **适配圆形**：考虑头像显示为圆形的情况
5. **无障碍性**：为头像添加 alt 文本或 aria-label

---

**需要帮助？**
- 查看 `README.md` 了解项目整体情况
- 查看 `pages/launch/launch.wxml` 查看完整 SVG 代码
- 阅读微信小程序官方文档了解更多集成方式

# 🐱🐶 今天的吃喝听我的 - 微信小程序

## 📱 项目简介

这是一个可爱的美食推荐小程序，以**小猫喵喵**和**小狗汪汪**作为虚拟服务员，为用户提供午餐和晚餐推荐。整个应用采用卡通风格设计，具有毛茸茸的可爱形象。

## 🎨 项目特色

### 1. **卡通形象设计**
- **喵喵**（小猫）：午餐小顾问，颜色为暖橙色 (#FF9F5A)
- **汪汪**（小狗）：晚餐小顾问，颜色为棕色 (#A0522D)
- 使用 SVG 绘制，实现毛茸茸的可爱效果

### 2. **启动动画**
- 欢迎页面进场动画
- 卡通人物上下浮动效果
- 加载指示动画
- 3.5秒后自动跳转到主页面

### 3. **UI/UX 设计**
- 柔和的渐变背景（粉红、米白、紫色渐变）
- 响应式设计，适配各种屏幕尺寸
- 流畅的动画和过渡效果

## 📁 项目结构

```
小程序项目-今天的吃喝听我的/
├── app.js                    # 应用入口文件
├── app.json                  # 应用配置文件
├── app.wxss                  # 全局样式文件
├── pages/
│   ├── launch/              # 启动页面
│   │   ├── launch.wxml      # 启动页面布局
│   │   ├── launch.wxss      # 启动页面样式
│   │   └── launch.js        # 启动页面逻辑
│   └── index/               # 主页面
│       ├── index.wxml       # 主页面布局
│       ├── index.wxss       # 主页面样式
│       └── index.js         # 主页面逻辑
└── README.md                # 项目说明文档
```

## 🚀 快速开始

### 前置要求
- 微信开发者工具（下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html）
- 申请小程序账号

### 部署步骤

1. **打开微信开发者工具**
   - 启动微信开发者工具
   - 选择"新建项目"

2. **导入项目**
   - 选择项目根目录（`小程序项目-今天的吃喝听我的`）
   - 输入新申请的小程序 AppID
   - 点击"新建"

3. **开发调试**
   - 点击"预览"或"真机调试"
   - 在手机上扫描二维码查看效果

4. **发布上线**
   - 在开发者工具中上传代码
   - 进入微信公众平台审核并发布

## 🎯 核心功能

### 启动页面 (Launch Page)
- 展示应用标题和欢迎文案
- 显示两个卡通角色的推荐信息
- 配有加载动画

### 主页面 (Index Page)
- 展示喵喵和汪汪的推荐卡片
- 提供功能菜单（随机推荐、我的收藏、评分排行、设置）
- 用户友好的交互界面

## 🎨 设计规范

### 颜色方案
- **主色调**：#FF6B9D（粉红色）
- **喵喵色**：#FF9F5A（暖橙色）
- **汪汪色**：#A0522D（棕色）
- **背景**：渐变色 (#FFF5E6 → #FFE4E1 → #F0E6FF)

### 字体
- 使用系统默认字体栈，确保跨平台一致性
- 标题：粗体（font-weight: bold）
- 描述：轻体（font-weight: normal）

### 动画
- **进场动画**：fadeIn、fadeInUp、fadeInDown
- **交互动画**：bounce、headShake
- **加载动画**：dot-bounce

## 📝 文件说明

### app.json
应用全局配置文件，包括：
- 页面路由
- 窗口样式
- 导航栏配置

### pages/launch/launch.wxml
启动页面的结构文件，使用 SVG 绘制卡通形象：
- 小猫SVG（head、ears、eyes、nose、mouth）
- 小狗SVG（head、ears、eyes、nose、mouth、tail）
- 毛茸茸效果（多个重叠圆形）

### pages/launch/launch.wxss
启动页面的样式文件，包括：
- 背景渐变动画
- 卡通人物浮动动画
- 加载指示动画

### pages/index/index.wxml
主页面的结构文件，包括：
- 顶部标题栏
- 推荐卡片区域
- 功能菜单网格
- 页脚信息

## 🔧 自定义修改

### 修改推荐内容
编辑 `pages/index/index.wxml` 中的推荐卡片内容。

### 修改卡通形象
编辑 `pages/launch/launch.wxml` 中的 SVG 代码，调整颜色、形状等。

### 修改颜色方案
修改 `app.wxss` 中的 CSS 变量：
```css
:root {
  --primary-color: #FF6B9D;  /* 主色调 */
  --cat-color: #FF9F5A;      /* 喵喵色 */
  --dog-color: #A0522D;      /* 汪汪色 */
}
```

### 修改动画时长
编辑 `pages/launch/launch.wxss` 中的 `animation` 属性，调整动画时长。

## 🐛 常见问题

### 1. 图片无法显示
- 确保所有图片文件都在正确的目录中
- 检查图片路径是否正确
- 在微信开发者工具中清除缓存

### 2. 动画不流畅
- 检查浏览器硬件加速是否开启
- 减少同时运行的动画数量
- 优化 SVG 代码复杂度

### 3. 页面响应迟缓
- 检查 JavaScript 代码是否有性能问题
- 减少 DOM 元素数量
- 使用防抖/节流处理频繁事件

## 📚 学习资源

### 微信小程序官方文档
- 开发文档：https://developers.weixin.qq.com/miniprogram/dev/framework/
- 组件文档：https://developers.weixin.qq.com/miniprogram/dev/component/

### CSS 动画
- MDN CSS Animations：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations
- 动画演示：https://animate.style/

### SVG 绘图
- SVG 教程：https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
- SVG 编辑器：https://www.svgeditor.io/

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

### 提交问题
- 清晰描述问题现象
- 提供复现步骤
- 附上截图或日志信息

### 提交代码
- 遵循项目的代码风格
- 添加必要的注释
- 测试所有功能

## 📄 许可证

MIT License - 自由使用和修改本项目代码

## ✨ 致谢

感谢使用"今天的吃喝听我的"小程序！

如有任何问题或建议，欢迎联系我们。

---

**最后更新**：2026年6月6日

**维护者**：洋仔团队

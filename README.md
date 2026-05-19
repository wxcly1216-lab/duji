# 读迹 · Reading Portfolio (DRPS)

> A Digital Reading Portfolio System (DRPS) for IGCSE Chinese as a Second Language learners.
> 为 IGCSE 中文二语学习者设计的数位阅读档案系统。

基于弗拉维尔（Flavell, 1979）元认知理论开发，搭建「元认知计划 → 监控 → 评估 → 迭代」的完整闭环。

## 在线体验

打开 `index.html` 即可使用。无需后端，纯前端单页应用。

## 功能模块

1. **新手引导** — 4 步介绍产品理念（可跳过 / 可重看）
2. **首页** — 报纸式刊头、连读天数、学期数据、正在读、旅程预览、最近反思
3. **阅读旅程** — 横向蛇形旅程地图，每本书一站
4. **推荐书单** — 30 本书，按 Breakthrough / Level 1–4 分级
5. **书籍详情 + 反思弹窗** — 章节路线 + 4 步分步反思引导（金句 / 理解 / 批判 / 感受）
6. **我的读迹** — 朱砂印章徽章、学期数据、金句墙

## Tweaks 调节面板（右下角）

- 主色调：朱砂 / 苍色 / 黛色 / 赭石
- 字体：文楷 / 宋体 / 黑体
- 卡片密度：紧凑 / 标准 / 宽松
- 首页布局变体
- 重看新手引导按钮

## 文件结构

```
.
├── index.html           # 入口 HTML
├── styles.css           # 全局样式系统（米色纸张 + 朱砂印章 + 衬线）
├── data.js              # 30 本书、用户数据、徽章、反思样本
├── components.jsx       # 共用组件（BookCover, Stamp, Masthead, TabBar 等）
├── journey.jsx          # 旅程地图 SVG
├── screens.jsx          # 主要屏幕：Home / Journey / Booklist / Profile
├── book-detail.jsx      # 书籍详情 + 反思弹窗
├── onboarding.jsx       # 4 步新手引导
├── app.jsx              # 应用入口 + 导航 + Tweaks 面板
├── ios-frame.jsx        # iOS 手机外框
└── tweaks-panel.jsx     # Tweaks 面板框架
```

## 部署

任何静态文件托管均可：

### GitHub Pages

```bash
# 在仓库 Settings → Pages → Source 选择 main 分支即可
# 访问地址：https://wxcly1216-lab.github.io/duji/
```

### Netlify / Vercel

拖入整个文件夹即可，无需构建。

### 本地

```bash
# 任何静态服务器：
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 设计语言

- **色彩**：米白宣纸底（#F0E6D2）+ 墨褐文字（#2C231A）+ 朱砂印章红（#B23A2E）
- **字体**：Noto Serif SC（衬线标题）+ Cormorant Garamond（英文斜体）
- **元素**：朱砂印章 · 虚线手绘边框 · 纸张颗粒底纹 · 编辑式刊头排版

## 学术背景

研究项目：**教师视角下元认知导向数位阅读档案系统（DRPS）在中文二语阅读教学中的应用研究**

参考文献：
1. Flavell, J. H. (1979). Metacognition and cognitive monitoring: A new area of cognitive-developmental inquiry. American Psychological Association.
2. Anderson, N. J. (2002). Exploring second language reading: Issues and strategies. Heinle & Heinle.

## License

MIT — 仅供教学研究与论文演示使用。

# AI换衣应用 - 产品功能计划

## 项目概述

创建一个AI虚拟试衣应用，用户可以上传人物照片，选择服装，通过AI生成换装效果。

## 核心用户流程

```
上传人物照片 → 选择服装 → AI处理 → 查看结果 → 下载/分享
```

## 第一版功能范围 (MVP)

### 1. 首页主界面
- **人物照片上传区**：拖拽/点击上传，支持示例图片快速体验
- **服装选择区**：预设服装库，分类浏览
- **AI处理进度**：实时进度展示，阶段提示
- **结果展示**：原图vs效果图对比，支持下载

### 2. 功能模块

| 模块 | 功能描述 |
|------|---------|
| ImageDropzone | 图片上传组件，支持拖拽和点击 |
| ClothingSelector | 服装选择面板，分类标签 |
| ProcessingOverlay | AI处理进度遮罩层 |
| ResultViewer | 结果对比展示，滑动对比 |

### 3. 设计风格
- **风格定位**：时尚简约 + 轻科技感
- **配色方案**：靛蓝主色调（科技感）+ 粉色点缀（时尚感）
- **视觉特点**：大圆角卡片、柔和阴影、渐变按钮

## 页面结构

```
/                    # 首页（主工作区）
```

## 组件规划

```
src/
├── pages/
│   └── Index.tsx           # 主工作区
├── components/
│   ├── layout/
│   │   └── Header.tsx      # 顶部导航
│   ├── upload/
│   │   ├── ImageDropzone.tsx    # 图片上传区
│   │   └── PersonPreview.tsx    # 人物预览
│   ├── clothing/
│   │   ├── ClothingSelector.tsx # 服装选择器
│   │   └── ClothingCard.tsx     # 服装卡片
│   ├── processing/
│   │   └── ProcessingOverlay.tsx # 处理进度
│   └── result/
│       ├── ResultViewer.tsx     # 结果展示
│       └── ImageCompare.tsx     # 图片对比
├── stores/
│   └── tryOnStore.ts       # 状态管理
├── services/
│   └── tryOnService.ts     # AI服务调用
└── types/
    └── index.ts            # 类型定义
```

## AI服务集成

需要使用 `ai-integration` skill 集成AI换衣服务，核心流程：
1. 上传人物图片
2. 选择服装图片
3. 调用AI换衣API
4. 轮询处理进度
5. 获取结果图片

## 待确认事项

- [ ] AI换衣服务的具体提供商/API
- [ ] 预设服装图片来源
- [ ] 是否需要用户登录功能

## 验证方案

1. 启动开发服务器 `pnpm run dev`
2. 测试图片上传功能
3. 测试服装选择交互
4. 测试AI处理流程（模拟）
5. 测试结果展示和下载

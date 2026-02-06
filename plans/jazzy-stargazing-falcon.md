# AI换衣应用 - 产品功能计划

## 项目概述

创建一个AI虚拟试衣应用，用户可以上传人物照片，选择服装，通过AI生成换装效果。

## 用户流程

```
上传人物照片 → 选择服装 → AI处理 → 查看结果 → 下载
```

## 功能范围 (MVP)

### 首页主界面
- **人物照片上传**：拖拽/点击上传
- **服装选择**：预设服装库（示例图片），分类浏览
- **AI处理进度**：实时进度展示
- **结果展示**：原图vs效果图对比，下载功能

### 设计风格
- **风格**：时尚简约 + 轻科技感
- **配色**：靛蓝主色 + 渐变效果
- **特点**：大圆角、柔和阴影、流畅动画

---

## 实现计划

### Step 1: 设计系统配置
**文件**: `src/index.css`, `tailwind.config.ts`
- 定义主色调（靛蓝渐变）
- 添加动画效果（上传区悬停、卡片选中、进度条流光）
- 设置圆角、阴影等视觉变量

### Step 2: 类型定义
**文件**: `src/types/index.ts`
```typescript
// 核心类型
- ClothingItem: 服装数据
- TryOnTask: 换衣任务
- TryOnResult: 处理结果
- ProcessingStatus: 处理状态
```

### Step 3: 状态管理
**文件**: `src/stores/tryOnStore.ts`
- 当前步骤状态
- 人物图片数据
- 选中服装
- 处理任务状态
- 结果数据

### Step 4: AI服务层（通用接口）
**文件**: `src/services/tryOnService.ts`
```typescript
// 通用API接口设计
interface TryOnAPI {
  endpoint: string;        // API地址
  apiKey?: string;         // API密钥
}

// 核心方法
- submitTryOn(personImage, clothingImage): 提交换衣请求
- checkStatus(taskId): 查询处理进度
- getResult(taskId): 获取结果
```
> 设计为可配置的通用接口，支持后续对接任意AI API

### Step 5: UI组件开发

| 组件 | 文件路径 | 功能 |
|------|---------|------|
| Header | `components/layout/Header.tsx` | 顶部导航栏 |
| ImageDropzone | `components/upload/ImageDropzone.tsx` | 图片上传区（拖拽+点击） |
| ClothingSelector | `components/clothing/ClothingSelector.tsx` | 服装选择面板 |
| ClothingCard | `components/clothing/ClothingCard.tsx` | 服装卡片 |
| ProcessingOverlay | `components/processing/ProcessingOverlay.tsx` | 处理进度遮罩 |
| ResultViewer | `components/result/ResultViewer.tsx` | 结果对比展示 |
| ImageCompare | `components/result/ImageCompare.tsx` | 滑动对比组件 |

### Step 6: 主页面整合
**文件**: `src/pages/Index.tsx`
- 整合所有组件
- 实现完整用户流程
- 响应式布局（桌面端左右分栏，移动端上下布局）

### Step 7: 预设服装数据
**文件**: `src/data/clothingData.ts`
- 使用Unsplash服装图片
- 分类：上装、下装、连衣裙
- 包含名称、分类、缩略图URL

---

## 关键文件清单

```
修改文件:
├── src/index.css              # 设计系统
├── tailwind.config.ts         # Tailwind配置
├── src/pages/Index.tsx        # 主页面

新建文件:
├── src/types/index.ts         # 类型定义
├── src/stores/tryOnStore.ts   # 状态管理
├── src/services/tryOnService.ts # AI服务
├── src/data/clothingData.ts   # 服装数据
├── src/components/
│   ├── layout/Header.tsx
│   ├── upload/ImageDropzone.tsx
│   ├── clothing/ClothingSelector.tsx
│   ├── clothing/ClothingCard.tsx
│   ├── processing/ProcessingOverlay.tsx
│   ├── result/ResultViewer.tsx
│   └── result/ImageCompare.tsx
```

## 复用现有组件

- `components/ui/button.tsx` - 按钮
- `components/ui/card.tsx` - 卡片容器
- `components/ui/tabs.tsx` - 服装分类标签
- `components/ui/progress.tsx` - 进度条
- `components/ui/dialog.tsx` - 弹窗
- `components/ui/skeleton.tsx` - 加载骨架
- `lib/utils.ts` - cn() 工具函数
- `hooks/use-toast.ts` - Toast通知

## 验证方案

1. `pnpm run dev` 启动开发服务器
2. 测试图片上传（拖拽+点击）
3. 测试服装选择和分类切换
4. 测试AI处理流程（模拟进度）
5. 测试结果展示和下载功能
6. 测试响应式布局（桌面+移动端）

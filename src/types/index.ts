// 服装分类
export type ClothingCategory = 'all' | 'tops' | 'bottoms' | 'dresses';

// 服装数据
export interface ClothingItem {
  id: string;
  name: string;
  category: Exclude<ClothingCategory, 'all'>;
  imageUrl: string;
  thumbnailUrl: string;
}

// 应用步骤
export type AppStep = 'upload' | 'select' | 'processing' | 'result';

// 处理阶段
export type ProcessingStage =
  | 'detecting'    // 检测人物
  | 'analyzing'    // 分析服装
  | 'merging'      // 融合处理
  | 'refining';    // 优化细节

// 处理状态
export interface ProcessingStatus {
  stage: ProcessingStage;
  progress: number;  // 0-100
  message: string;
}

// 换衣任务
export interface TryOnTask {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  stage: ProcessingStage;
  createdAt: Date;
}

// 换衣结果
export interface TryOnResult {
  taskId: string;
  originalImageUrl: string;
  resultImageUrl: string;
  clothingItem: ClothingItem;
  createdAt: Date;
}

// 人物图片状态
export interface PersonImageState {
  file: File | null;
  previewUrl: string | null;
  status: 'idle' | 'uploading' | 'uploaded' | 'error';
  error?: string;
}

// API配置
export interface TryOnAPIConfig {
  endpoint: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

// API请求
export interface TryOnRequest {
  personImageUrl: string;
  clothingImageUrl: string;
  options?: {
    quality?: 'standard' | 'high';
    preserveBackground?: boolean;
  };
}

// API响应
export interface TryOnResponse {
  success: boolean;
  taskId?: string;
  resultUrl?: string;
  error?: {
    code: string;
    message: string;
  };
}

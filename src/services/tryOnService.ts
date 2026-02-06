import type {
  TryOnAPIConfig,
  TryOnRequest,
  TryOnResponse,
  ProcessingStage
} from '@/types';

// 默认API配置 - 可根据实际API修改
const defaultConfig: TryOnAPIConfig = {
  endpoint: '/api/try-on',
  apiKey: undefined,
};

// 处理阶段配置
const PROCESSING_STAGES: { stage: ProcessingStage; message: string; duration: number }[] = [
  { stage: 'detecting', message: '正在检测人物姿态...', duration: 2000 },
  { stage: 'analyzing', message: '正在分析服装特征...', duration: 2000 },
  { stage: 'merging', message: '正在智能融合处理...', duration: 3000 },
  { stage: 'refining', message: '正在优化细节效果...', duration: 2000 },
];

class TryOnService {
  private config: TryOnAPIConfig;

  constructor(config: TryOnAPIConfig = defaultConfig) {
    this.config = config;
  }

  // 配置API
  configure(config: Partial<TryOnAPIConfig>) {
    this.config = { ...this.config, ...config };
  }

  // 提交换衣请求
  async submitTryOn(request: TryOnRequest): Promise<TryOnResponse> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...this.config.headers,
      };

      if (this.config.apiKey) {
        headers['Authorization'] = `Bearer ${this.config.apiKey}`;
      }

      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('TryOn API error:', error);
      return {
        success: false,
        error: {
          code: 'API_ERROR',
          message: error instanceof Error ? error.message : '请求失败',
        },
      };
    }
  }

  // 模拟处理进度（用于演示，实际接入API后可移除）
  async simulateProcessing(
    onProgress: (progress: number, stage: ProcessingStage, message: string) => void
  ): Promise<string> {
    let totalProgress = 0;
    const totalDuration = PROCESSING_STAGES.reduce((acc, s) => acc + s.duration, 0);

    for (const { stage, message, duration } of PROCESSING_STAGES) {
      const startProgress = totalProgress;
      const progressIncrement = (duration / totalDuration) * 100;
      const steps = 10;
      const stepDuration = duration / steps;

      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        const progress = Math.min(
          startProgress + (progressIncrement * i / steps),
          99
        );
        onProgress(Math.round(progress), stage, message);
      }

      totalProgress += progressIncrement;
    }

    onProgress(100, 'refining', '处理完成！');

    // 返回模拟的结果图片URL（使用原图作为演示）
    return 'simulated_result';
  }

  // 图片转Base64
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  // 下载结果图片
  async downloadResult(imageUrl: string, filename: string = 'try-on-result.jpg') {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      // 降级方案：直接打开图片
      window.open(imageUrl, '_blank');
    }
  }
}

// 导出单例
export const tryOnService = new TryOnService();

// 导出类以便自定义配置
export { TryOnService };

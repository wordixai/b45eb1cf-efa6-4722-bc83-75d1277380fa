import { Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { ProcessingStage } from '@/types';

interface ProcessingOverlayProps {
  progress: number;
  stage: ProcessingStage;
  message: string;
}

export function ProcessingOverlay({
  progress,
  message,
}: ProcessingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md mx-4 p-8 rounded-3xl bg-card shadow-2xl">
        <div className="flex flex-col items-center text-center">
          {/* 动画图标 */}
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-10 h-10 text-primary-foreground animate-float" />
            </div>
            {/* 外圈动画 */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
          </div>

          {/* 标题 */}
          <h3 className="text-xl font-bold text-foreground mb-2">
            AI 正在为您换装
          </h3>
          <p className="text-muted-foreground mb-6">{message}</p>

          {/* 进度条 */}
          <div className="w-full mb-4">
            <Progress value={progress} className="h-2 progress-shimmer" />
          </div>

          {/* 进度百分比 */}
          <p className="text-2xl font-bold text-gradient">{progress}%</p>

          {/* 预计时间 */}
          <p className="text-sm text-muted-foreground mt-4">
            请稍候，预计还需 {Math.max(1, Math.ceil((100 - progress) / 10))} 秒
          </p>
        </div>
      </div>
    </div>
  );
}

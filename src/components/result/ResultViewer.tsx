import { Download, RotateCcw, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageCompare } from './ImageCompare';
import { tryOnService } from '@/services/tryOnService';
import { toast } from 'sonner';
import type { TryOnResult } from '@/types';

interface ResultViewerProps {
  result: TryOnResult;
  onReset: () => void;
}

export function ResultViewer({ result, onReset }: ResultViewerProps) {
  const handleDownload = async () => {
    try {
      await tryOnService.downloadResult(
        result.resultImageUrl,
        `try-on-${result.clothingItem.name}-${Date.now()}.jpg`
      );
      toast.success('图片已下载');
    } catch {
      toast.error('下载失败，请重试');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI换衣效果',
          text: `看看我试穿 ${result.clothingItem.name} 的效果！`,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('分享失败');
        }
      }
    } else {
      // 复制链接
      await navigator.clipboard.writeText(window.location.href);
      toast.success('链接已复制到剪贴板');
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* 对比展示 */}
      <div className="flex-1 mb-4">
        <ImageCompare
          originalImage={result.originalImageUrl}
          resultImage={result.resultImageUrl}
        />
      </div>

      {/* 服装信息 */}
      <div className="mb-4 p-4 rounded-xl bg-muted/50">
        <div className="flex items-center gap-3">
          <img
            src={result.clothingItem.thumbnailUrl}
            alt={result.clothingItem.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-foreground">{result.clothingItem.name}</p>
            <p className="text-sm text-muted-foreground">换装效果</p>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          onClick={handleDownload}
          className="btn-gradient h-12"
        >
          <Download className="w-4 h-4 mr-2" />
          下载
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          className="h-12"
        >
          <Share2 className="w-4 h-4 mr-2" />
          分享
        </Button>

        <Button
          onClick={onReset}
          variant="secondary"
          className="h-12"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          重试
        </Button>
      </div>
    </div>
  );
}

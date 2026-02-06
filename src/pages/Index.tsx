import { useCallback } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { ImageDropzone } from '@/components/upload/ImageDropzone';
import { ClothingSelector } from '@/components/clothing/ClothingSelector';
import { ProcessingOverlay } from '@/components/processing/ProcessingOverlay';
import { ResultViewer } from '@/components/result/ResultViewer';
import { useTryOnStore } from '@/stores/tryOnStore';
import { tryOnService } from '@/services/tryOnService';
import { toast } from 'sonner';
import type { ClothingItem, TryOnResult } from '@/types';

export default function Index() {
  const {
    currentStep,
    personImage,
    selectedClothing,
    processing,
    result,
    setStep,
    setPersonImage,
    selectClothing,
    startProcessing,
    updateProgress,
    setResult,
    reset,
  } = useTryOnStore();

  // 处理图片选择
  const handleImageSelect = useCallback((file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPersonImage({
      file,
      previewUrl,
      status: 'uploaded',
    });
    setStep('select');
    toast.success('图片上传成功');
  }, [setPersonImage, setStep]);

  // 清除图片
  const handleClearImage = useCallback(() => {
    if (personImage.previewUrl) {
      URL.revokeObjectURL(personImage.previewUrl);
    }
    setPersonImage({
      file: null,
      previewUrl: null,
      status: 'idle',
    });
    selectClothing(null);
    setStep('upload');
  }, [personImage.previewUrl, setPersonImage, selectClothing, setStep]);

  // 选择服装
  const handleSelectClothing = useCallback((item: ClothingItem) => {
    selectClothing(item);
  }, [selectClothing]);

  // 开始换装
  const handleStartTryOn = useCallback(async () => {
    if (!personImage.previewUrl || !selectedClothing) {
      toast.error('请先上传图片并选择服装');
      return;
    }

    startProcessing();

    try {
      // 模拟AI处理（实际接入API后替换此处）
      await tryOnService.simulateProcessing((progress, stage, message) => {
        updateProgress(progress, stage, message);
      });

      // 创建结果（演示用，实际应使用API返回的结果图）
      const tryOnResult: TryOnResult = {
        taskId: `task_${Date.now()}`,
        originalImageUrl: personImage.previewUrl,
        resultImageUrl: selectedClothing.imageUrl, // 演示用，实际为AI生成图
        clothingItem: selectedClothing,
        createdAt: new Date(),
      };

      setResult(tryOnResult);
      toast.success('换装完成！');
    } catch (error) {
      console.error('Try-on error:', error);
      toast.error('处理失败，请重试');
      setStep('select');
    }
  }, [personImage.previewUrl, selectedClothing, startProcessing, updateProgress, setResult, setStep]);

  // 重置
  const handleReset = useCallback(() => {
    if (personImage.previewUrl) {
      URL.revokeObjectURL(personImage.previewUrl);
    }
    reset();
  }, [personImage.previewUrl, reset]);

  // 是否可以开始换装
  const canStartTryOn = personImage.status === 'uploaded' && selectedClothing !== null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* 处理中遮罩 */}
        {processing.isProcessing && (
          <ProcessingOverlay
            progress={processing.progress}
            stage={processing.stage}
            message={processing.message}
          />
        )}

        {/* 结果展示 */}
        {currentStep === 'result' && result ? (
          <div className="max-w-md mx-auto">
            <ResultViewer result={result} onReset={handleReset} />
          </div>
        ) : (
          /* 主工作区 */
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* 左侧：图片上传区 */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                1. 上传人物照片
              </h2>
              <ImageDropzone
                onImageSelect={handleImageSelect}
                previewUrl={personImage.previewUrl}
                onClear={handleClearImage}
                disabled={processing.isProcessing}
              />
            </div>

            {/* 右侧：服装选择区 */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                2. 选择服装
              </h2>
              <div className="flex-1 min-h-[400px] lg:min-h-0">
                <ClothingSelector
                  selectedItem={selectedClothing}
                  onSelect={handleSelectClothing}
                  disabled={processing.isProcessing || personImage.status !== 'uploaded'}
                />
              </div>

              {/* 换装按钮 */}
              <div className="mt-6">
                <Button
                  onClick={handleStartTryOn}
                  disabled={!canStartTryOn || processing.isProcessing}
                  className="w-full h-14 text-lg btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  开始换装
                </Button>
                {!canStartTryOn && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    {personImage.status !== 'uploaded'
                      ? '请先上传人物照片'
                      : '请选择一件服装'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 底部提示 */}
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>AI换衣 - 智能虚拟试衣体验</p>
      </footer>
    </div>
  );
}

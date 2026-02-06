import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ImageCompareProps {
  originalImage: string;
  resultImage: string;
  className?: string;
}

export function ImageCompare({
  originalImage,
  resultImage,
  className,
}: ImageCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-ew-resize select-none',
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 结果图（底层） */}
      <img
        src={resultImage}
        alt="换装效果"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* 原图（顶层，被裁切） */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={originalImage}
          alt="原图"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none' }}
          draggable={false}
        />
      </div>

      {/* 分割线 */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* 拖动手柄 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-muted-foreground rounded-full" />
            <div className="w-0.5 h-4 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </div>

      {/* 标签 */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
        原图
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary text-xs font-medium text-primary-foreground">
        效果
      </div>
    </div>
  );
}

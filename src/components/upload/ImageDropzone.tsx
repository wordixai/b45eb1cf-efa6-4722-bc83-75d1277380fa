import { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
  onClear: () => void;
  disabled?: boolean;
}

export function ImageDropzone({
  onImageSelect,
  previewUrl,
  onClear,
  disabled = false,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  }, [disabled, onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
    // 重置input以便同一文件可再次选择
    e.target.value = '';
  }, [onImageSelect]);

  if (previewUrl) {
    return (
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-muted animate-fade-in">
        <img
          src={previewUrl}
          alt="上传的图片"
          className="w-full h-full object-cover"
        />
        {!disabled && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
          <p className="text-sm text-foreground font-medium">人物照片已上传</p>
          <p className="text-xs text-muted-foreground">点击右上角可更换图片</p>
        </div>
      </div>
    );
  }

  return (
    <label
      className={cn(
        'dropzone w-full aspect-[3/4] cursor-pointer',
        isDragging && 'active',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={disabled}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <div
          className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
            isDragging
              ? 'bg-primary text-primary-foreground scale-110'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {isDragging ? (
            <ImageIcon className="w-8 h-8" />
          ) : (
            <Upload className="w-8 h-8" />
          )}
        </div>

        <div>
          <p className="text-foreground font-medium mb-1">
            {isDragging ? '释放以上传图片' : '点击或拖拽上传人物照片'}
          </p>
          <p className="text-sm text-muted-foreground">
            支持 JPG、PNG 格式，建议正面清晰人像
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="px-2 py-1 rounded-full bg-muted">最大 10MB</span>
          <span className="px-2 py-1 rounded-full bg-muted">建议 3:4 比例</span>
        </div>
      </div>
    </label>
  );
}

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ClothingItem } from '@/types';

interface ClothingCardProps {
  item: ClothingItem;
  isSelected: boolean;
  onSelect: (item: ClothingItem) => void;
  disabled?: boolean;
}

export function ClothingCard({
  item,
  isSelected,
  onSelect,
  disabled = false,
}: ClothingCardProps) {
  return (
    <button
      onClick={() => !disabled && onSelect(item)}
      disabled={disabled}
      className={cn(
        'clothing-card group w-full text-left',
        isSelected && 'selected',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-card-foreground truncate">
          {item.name}
        </p>
      </div>

      {/* 选中指示器 */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-scale-in">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </button>
  );
}

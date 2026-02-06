import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ClothingCard } from './ClothingCard';
import { categoryLabels, getClothingByCategory } from '@/data/clothingData';
import type { ClothingCategory, ClothingItem } from '@/types';

interface ClothingSelectorProps {
  selectedItem: ClothingItem | null;
  onSelect: (item: ClothingItem) => void;
  disabled?: boolean;
}

const categories: ClothingCategory[] = ['all', 'tops', 'bottoms', 'dresses'];

export function ClothingSelector({
  selectedItem,
  onSelect,
  disabled = false,
}: ClothingSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<ClothingCategory>('all');
  const items = getClothingByCategory(activeCategory);

  return (
    <div className="flex flex-col h-full">
      {/* 分类标签 */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            disabled={disabled}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200',
              activeCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* 服装网格 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((item) => (
            <ClothingCard
              key={item.id}
              item={item}
              isSelected={selectedItem?.id === item.id}
              onSelect={onSelect}
              disabled={disabled}
            />
          ))}
        </div>
      </div>

      {/* 选中提示 */}
      {selectedItem && (
        <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20 animate-fade-in">
          <p className="text-sm text-foreground">
            已选择：<span className="font-medium">{selectedItem.name}</span>
          </p>
        </div>
      )}
    </div>
  );
}

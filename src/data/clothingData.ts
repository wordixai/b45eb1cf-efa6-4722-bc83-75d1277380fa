import type { ClothingItem, ClothingCategory } from '@/types';

// 预设服装数据 - 使用Unsplash图片
export const clothingItems: ClothingItem[] = [
  // 上装
  {
    id: 'top-1',
    name: '白色T恤',
    category: 'tops',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  },
  {
    id: 'top-2',
    name: '蓝色衬衫',
    category: 'tops',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
  },
  {
    id: 'top-3',
    name: '黑色卫衣',
    category: 'tops',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
  },
  {
    id: 'top-4',
    name: '条纹针织衫',
    category: 'tops',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
  },
  {
    id: 'top-5',
    name: '灰色毛衣',
    category: 'tops',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
  },
  {
    id: 'top-6',
    name: '米色外套',
    category: 'tops',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
  },

  // 下装
  {
    id: 'bottom-1',
    name: '蓝色牛仔裤',
    category: 'bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
  },
  {
    id: 'bottom-2',
    name: '黑色西裤',
    category: 'bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  },
  {
    id: 'bottom-3',
    name: '卡其色休闲裤',
    category: 'bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400',
  },
  {
    id: 'bottom-4',
    name: '白色短裤',
    category: 'bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400',
  },

  // 连衣裙
  {
    id: 'dress-1',
    name: '白色连衣裙',
    category: 'dresses',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
  },
  {
    id: 'dress-2',
    name: '碎花连衣裙',
    category: 'dresses',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
  },
  {
    id: 'dress-3',
    name: '黑色礼服裙',
    category: 'dresses',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400',
  },
  {
    id: 'dress-4',
    name: '红色晚礼服',
    category: 'dresses',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
  },
];

// 分类标签
export const categoryLabels: Record<ClothingCategory, string> = {
  all: '全部',
  tops: '上装',
  bottoms: '下装',
  dresses: '连衣裙',
};

// 根据分类筛选
export function getClothingByCategory(category: ClothingCategory): ClothingItem[] {
  if (category === 'all') {
    return clothingItems;
  }
  return clothingItems.filter(item => item.category === category);
}

// 根据ID获取服装
export function getClothingById(id: string): ClothingItem | undefined {
  return clothingItems.find(item => item.id === id);
}

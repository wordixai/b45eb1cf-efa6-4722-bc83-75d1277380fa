import { create } from 'zustand';
import type {
  AppStep,
  ClothingItem,
  PersonImageState,
  ProcessingStage,
  TryOnResult
} from '@/types';

interface TryOnState {
  // 当前步骤
  currentStep: AppStep;

  // 人物图片
  personImage: PersonImageState;

  // 选中的服装
  selectedClothing: ClothingItem | null;

  // 处理状态
  processing: {
    isProcessing: boolean;
    progress: number;
    stage: ProcessingStage;
    message: string;
  };

  // 结果
  result: TryOnResult | null;

  // Actions
  setStep: (step: AppStep) => void;
  setPersonImage: (image: Partial<PersonImageState>) => void;
  selectClothing: (clothing: ClothingItem | null) => void;
  startProcessing: () => void;
  updateProgress: (progress: number, stage: ProcessingStage, message: string) => void;
  setResult: (result: TryOnResult | null) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 'upload' as AppStep,
  personImage: {
    file: null,
    previewUrl: null,
    status: 'idle' as const,
  },
  selectedClothing: null,
  processing: {
    isProcessing: false,
    progress: 0,
    stage: 'detecting' as ProcessingStage,
    message: '',
  },
  result: null,
};

export const useTryOnStore = create<TryOnState>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  setPersonImage: (image) => set((state) => ({
    personImage: { ...state.personImage, ...image },
  })),

  selectClothing: (clothing) => set({ selectedClothing: clothing }),

  startProcessing: () => set({
    currentStep: 'processing',
    processing: {
      isProcessing: true,
      progress: 0,
      stage: 'detecting',
      message: '正在检测人物...',
    },
  }),

  updateProgress: (progress, stage, message) => set((state) => ({
    processing: {
      ...state.processing,
      progress,
      stage,
      message,
    },
  })),

  setResult: (result) => set({
    currentStep: result ? 'result' : 'select',
    processing: {
      isProcessing: false,
      progress: 100,
      stage: 'refining',
      message: '处理完成',
    },
    result,
  }),

  reset: () => set(initialState),
}));

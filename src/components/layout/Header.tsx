import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">AI 换衣</h1>
            <p className="text-xs text-muted-foreground">智能虚拟试衣</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            上传照片，选择服装，一键换装
          </span>
        </nav>
      </div>
    </header>
  );
}

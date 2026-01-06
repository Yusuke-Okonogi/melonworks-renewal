import Link from 'next/link';

type Props = {
  title: string;
  category?: { name: string; id?: string };
};

export default function StickyBottomNav({ title, category }: Props) {
  return (
    // ★修正: z-50 -> z-30 (ヘッダーやメニューより下になるように調整)
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 py-3 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <nav className="flex items-center text-[10px] text-gray-500 font-en gap-2 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-melon-dark transition-colors flex-shrink-0 flex items-center gap-1">
                <i className="fas fa-home"></i>
            </Link>
            
            <span className="text-gray-300 flex-shrink-0"><i className="fas fa-chevron-right"></i></span>
            
            {category ? (
                <>
                    <Link href="/articles" className="hover:text-melon-dark transition-colors flex-shrink-0">ARTICLES</Link>
                    <span className="text-gray-300 flex-shrink-0"><i className="fas fa-chevron-right"></i></span>
                    <span className="text-melon-dark font-bold truncate">{title}</span>
                </>
            ) : (
                <span className="text-melon-dark font-bold truncate">{title}</span>
            )}
        </nav>
      </div>
    </div>
  );
}
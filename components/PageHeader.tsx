import Link from "next/link";

type Breadcrumb = {
  name: string;
  path?: string;
};

type Props = {
  titleEn: string;
  titleJp: string;
  breadcrumbs: Breadcrumb[];
};

export default function PageHeader({ titleEn, titleJp, breadcrumbs }: Props) {
  return (
    <section className="relative bg-white border-b border-gray-100 py-10 lg:py-14 overflow-hidden">
      {/* 背景の幾何学模様 (Tailwindで再現) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50" 
        style={{ 
            backgroundImage: 'linear-gradient(rgba(38, 70, 83, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(38, 70, 83, 0.05) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }}
      ></div>
      {/* 右上のぼかし光 */}
      <div className="absolute right-[-5%] top-[-50%] w-[300px] h-[300px] bg-melon-light/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-3">
            <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-1 block">
              {titleEn}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#264653]">
              {titleJp}
            </h1>
          </div>
          
          {/* パンくずリスト */}
          <nav className="flex items-center text-xs text-gray-400 font-en gap-2" aria-label="Breadcrumb">
            {/* ★修正: HOMEテキストを削除してアイコンのみに変更 */}
            <Link href="/" className="hover:text-melon-dark transition-colors flex items-center justify-center w-6 h-6">
              <i className="fas fa-home text-sm"></i>
            </Link>
            
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-gray-300 text-[10px]">
                  <i className="fas fa-chevron-right"></i>
                </span>
                {crumb.path ? (
                  <Link href={crumb.path} className="hover:text-melon-dark transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-melon-dark font-bold">{crumb.name}</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
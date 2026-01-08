import Link from 'next/link';
import { client } from "@/libs/client";

// --- データ取得関数 ---
async function getTags() {
    try {
        const data = await client.get({ 
            endpoint: "tags", 
            queries: { limit: 100 } 
        });
        return data.contents;
    } catch (e) {
        return [];
    }
}

// サービス定義
const services = [
    { name: "業務設計・DX支援", path: "/service/dx" },
    { name: "Webサイト制作", path: "/service/web" },
    { name: "ECサイト構築・運用", path: "/service/ec" },
    { name: "デザイン制作", path: "/service/design" },
];

export default async function Footer() {
  // タグデータを取得
  const allTags = await getTags();

  // タグを分類
  const problemTags = allTags
      .filter((t: any) => t.type?.includes("problem"))
      .map((t: any) => t.name)
      .slice(0, 8);

  const solutionTags = allTags
      .filter((t: any) => t.type?.includes("solution"))
      .map((t: any) => t.name)
      .slice(0, 8);

  return (
    <div className="bg-[#F9FAFB] pt-10">
        
        {/* ★修正: スマホ時のみ下部余白を大きく確保 (pb-32 md:pb-12) */}
        <footer className="bg-white rounded-t-[40px] md:rounded-t-[60px] shadow-[0_-10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden pb-32 md:pb-12">
            
            {/* 背景装飾 */}
            <div className="absolute right-[-5%] bottom-[-20%] text-[200px] md:text-[300px] text-melon-light opacity-10 pointer-events-none rotate-12 z-0">
                <i className="fas fa-shapes"></i>
            </div>

            <div className="container mx-auto px-6 md:px-10 max-w-6xl relative z-10 pt-16 md:pt-20">
                
                <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start">
                    
                    {/* 左側：ブランド & 会社情報 */}
                    <div className="lg:w-1/4 flex-shrink-0">
                        <Link href="/" className="inline-block mb-8 group shrink-0">
                            <img 
                                src="/logo-gr.png" 
                                alt="Melon Works" 
                                className="h-7 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 grayscale opacity-80 hover:grayscale-0 hover:opacity-100" 
                            />
                        </Link>
                        
                        <div className="text-xs text-gray-500 leading-loose font-medium space-y-6">
                            <div>
                                <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded mb-1">本社</span>
                                <p>
                                    〒371-0831<br />
                                    群馬県前橋市小相木町327<br />
                                    タカゼンビル203
                                </p>
                            </div>
                            <div>
                                <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded mb-1">東京拠点</span>
                                <p>
                                    〒106-0032<br />
                                    東京都港区六本木6-8-23
                                </p>
                            </div>
                            
                            <Link href="/contact" className="inline-flex items-center gap-2 text-melon-dark hover:underline font-bold pt-2">
                                <i className="far fa-envelope"></i> お問い合わせはこちら
                            </Link>
                        </div>
                    </div>

                    {/* 右側：ナビゲーションリンク */}
                    <div className="lg:w-3/4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                        
                        {/* TAGS (Issues & Solutions) */}
                        <div className="lg:col-span-2">
                            <h4 className="font-bold mb-5 text-xs font-en tracking-widest text-[#264653] flex items-center gap-2">
                                <span className="w-2 h-2 bg-melon-dark rounded-full"></span> TAGS
                            </h4>
                            
                            <div className="space-y-6">
                                {/* 課題タグ */}
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 mb-2 pl-1">ISSUES</p>
                                    <div className="flex flex-wrap gap-2">
                                        {problemTags.map((tag: string, i: number) => (
                                            <Link key={i} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-white text-[#E76F51] text-[10px] font-bold px-2.5 py-1.5 rounded shadow-sm border border-red-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* 解決策タグ */}
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 mb-2 pl-1">SOLUTIONS</p>
                                    <div className="flex flex-wrap gap-2">
                                        {solutionTags.map((tag: string, i: number) => (
                                            <Link key={i} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-white text-melon-dark text-[10px] font-bold px-2.5 py-1.5 rounded shadow-sm border border-melon/20 hover:shadow-md hover:-translate-y-0.5 transition-all">
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SERVICE */}
                        <div>
                            <h4 className="font-bold mb-5 text-xs font-en tracking-widest text-[#264653] flex items-center gap-2">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span> SERVICE
                            </h4>
                            <ul className="space-y-3">
                                {services.map((item, i) => (
                                    <li key={i}>
                                        <Link href={item.path} className="text-xs text-gray-500 hover:text-melon-dark transition-all flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-melon-dark group-hover:w-2 transition-all"></span>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* COMPANY */}
                        <div>
                            <h4 className="font-bold mb-5 text-xs font-en tracking-widest text-[#264653] flex items-center gap-2">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span> COMPANY
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { name: "会社概要", path: "/about" },
                                    { name: "お問い合わせ", path: "/contact" },
                                    { name: "利用規約", path: "/terms" },
                                    { name: "プライバシーポリシー", path: "/privacy" },
                                    { name: "反社基本方針", path: "/antisocial" }
                                ].map((item, i) => (
                                    <li key={i}>
                                        <Link href={item.path} className="text-xs text-gray-500 hover:text-melon-dark transition-all flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-melon-dark group-hover:w-2 transition-all"></span>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] text-gray-400 font-en tracking-wider">
                        &copy; 2025 Melon Works LLC. All Rights Reserved.
                    </p>
                    <p className="text-[10px] text-gray-300 font-en hidden md:block">
                        Less is more.
                    </p>
                </div>
            </div>
        </footer>
    </div>
  );
}
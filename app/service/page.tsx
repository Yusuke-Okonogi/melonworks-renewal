import Link from "next/link";
import StickyBottomNav from "@/components/StickyBottomNav";
import PageHeader from "@/components/PageHeader"; // ★追加

export default function ServiceIndexPage() {
  
  // サービスデータ
  const serviceItems = [
    { 
        id: "01",
        icon: "shapes", 
        title: "業務設計・DX支援", 
        desc: "業務の流れや情報の分断を整理し、\n現場に無理のない仕組みを設計します。\nツール選定から運用定着まで、一緒に支援します。",
        pTags: ["アナログ管理をやめたい", "人手不足"],
        sTags: ["AI・自動化", "補助金活用"],
        href: "/service/dx"
    },
    { 
        id: "02",
        icon: "laptop-code", 
        title: "Webサイト制作", 
        desc: "コーポレートサイトやLPを、\n更新・運用しやすい形で設計・制作。\n使われ続けるWebを前提に考えます。",
        pTags: ["集客できない", "売上が伸び悩んでいる"],
        sTags: ["Web制作", "SNS運用"],
        href: "/service/web"
    },
    { 
        id: "03",
        icon: "store", 
        title: "ECサイト構築・運用", 
        desc: "ECサイトの構築から、\n在庫や業務との連動、日々の運用まで。\n現場とつながる「売る仕組み」をつくります。",
        pTags: ["在庫が合わない", "売上が伸び悩んでいる"],
        sTags: ["ECサイト構築", "在庫管理システム"],
        href: "/service/ec"
    },
    { 
        id: "04",
        icon: "palette", 
        title: "デザイン制作", 
        desc: "紙・Webを問わず、\n運用や更新を前提にしたデザインを制作。\n現場で使われることを大切にしています。",
        pTags: ["集客できない"],
        sTags: ["SNS運用"],
        href: "/service/design"
    }
  ];

  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
        
        {/* ★共通ヘッダーを使用 */}
        <PageHeader 
            titleEn="SERVICE"
            titleJp="提供サービス"
            breadcrumbs={[
                { name: "SERVICE" } // 現在地のみ
            ]}
        />

        {/* サービスグリッドエリア */}
        <section className="py-16 md:py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                {/* 導入文 */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <p className="text-gray-500 text-sm md:text-base leading-loose">
                        私たちは「つくる」こと自体を目的とはしません。<br />
                        お客様のビジネスが「動く（成果が出る・現場が回る）」ことをゴールに、<br className="hidden md:inline" />
                        クリエイティブとテクノロジーの両面からサポートします。
                    </p>
                </div>
                
                {/* サービスグリッド */}
                <div className="overflow-hidden bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-px shadow-sm rounded-2xl relative z-10">
                    {serviceItems.map((s, i) => (
                        <Link key={i} href={s.href} className="group bg-white p-6 md:p-8 flex flex-col items-start hover:bg-melon-light/5 transition-colors duration-500 relative overflow-hidden">
                            
                            {/* 背景アイコン透かし */}
                            <div className="absolute -bottom-6 -right-6 text-[120px] text-gray-50 group-hover:text-melon-light/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 z-0 pointer-events-none">
                                <i className={`fas fa-${s.icon}`}></i>
                            </div>

                            {/* ヘッダー */}
                            <div className="w-full flex items-center justify-between mb-4 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl text-melon-dark group-hover:scale-110 transition-transform duration-300">
                                        <i className={`fas fa-${s.icon}`}></i>
                                    </div>
                                    <h3 className="font-bold text-lg md:text-xl text-[#264653] leading-tight">
                                        {s.title}
                                    </h3>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-melon-dark group-hover:text-white group-hover:border-melon-dark transition-all duration-300 bg-white">
                                    <i className="fas fa-arrow-right text-xs group-hover:-rotate-45 transition-transform duration-300"></i>
                                </div>
                            </div>
                            
                            {/* 本文 */}
                            <div className="mb-4 relative z-10">
                                <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed whitespace-pre-wrap">
                                    {s.desc}
                                </p>
                            </div>
                            
                            {/* 関連タグ */}
                            <div className="pt-3 border-t border-gray-50 w-full relative z-10">
                                <p className="text-[9px] text-gray-400 font-bold mb-2">関連タグ</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {s.pTags.map((tag, idx) => (
                                        <span key={`p-${idx}`} className="text-[#E76F51] border border-red-50 bg-red-50/50 text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                                            {tag}
                                        </span>
                                    ))}
                                    {s.sTags.map((tag, idx) => (
                                        <span key={`s-${idx}`} className="text-melon-dark border border-melon/10 bg-melon-light/20 text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* アクセントバー */}
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-melon-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20"></div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        <StickyBottomNav title="提供サービス" />
    </main>
  );
}
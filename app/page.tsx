import { client } from "@/libs/client";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メロンワークス合同会社 | 群馬・東京のDX支援・Web制作",
  // description等はlayout.tsxのものが使われますが、上書きも可能です
};

// 1. 通常の新着記事を取得
async function getNews() {
  const data = await client.get({ 
    endpoint: "article",
    queries: { limit: 6, orders: "-publishedAt" }
  });
  return data.contents;
}

// 2. ピックアップ記事のみを取得
async function getPickupArticles() {
  const data = await client.get({
    endpoint: "article",
    queries: { 
      filters: "pickup[equals]true",
      limit: 5,
      orders: "-publishedAt"
    }
  });
  return data.contents;
}

// --- ヘルパー関数 ---
const getTagName = (tag: any) => {
  if (!tag) return "";
  if (typeof tag === "string") return tag;
  return tag.name || tag.tag || tag.label || "";
};

const getCategoryName = (cat: any) => {
    if (!cat) return "お知らせ";
    if (Array.isArray(cat)) return cat[0] ? (cat[0].name || cat[0]) : "お知らせ";
    if (typeof cat === 'object') return cat.name || "お知らせ";
    return cat;
};

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};

export default async function Home() {
  const [news, pickups] = await Promise.all([getNews(), getPickupArticles()]);

  // HOW WE DO のデータ定義
  const howWeDoItems = [
    {
      title: "現場から考える",
      text: "机上の理屈ではなく、現場の流れ・負荷・クセを理解して改善します。",
      icon: "store"
    },
    {
      title: "続く仕組みづくり",
      text: "設計・制作・運用まで、現場に根づく形を一緒につくります。",
      icon: "sync-alt"
    },
    {
      title: "人に合わせた設計",
      text: "使い方を覚えさせるのではなく、自然に使える形を設計します。",
      icon: "heart"
    }
  ];

  // サービスデータ (リンク先を更新)
  const serviceItems = [
    { 
        id: "01",
        icon: "shapes", 
        title: "業務設計・DX支援", 
        desc: "業務の流れや情報の分断を整理し、\n現場に無理のない仕組みを設計します。\nツール選定から運用定着まで、一緒に支援します。",
        pTags: ["アナログ管理をやめたい", "人手不足"],
        sTags: ["AI・自動化", "補助金活用"],
        href: "/service/dx" // ★リンク修正
    },
    { 
        id: "02",
        icon: "laptop-code", 
        title: "Webサイト制作", 
        desc: "コーポレートサイトやLPを、\n更新・運用しやすい形で設計・制作。\n使われ続けるWebを前提に考えます。",
        pTags: ["集客できない", "売上が伸び悩んでいる"],
        sTags: ["Web制作", "SNS運用"],
        href: "/service/web" // ★リンク修正
    },
    { 
        id: "03",
        icon: "store", 
        title: "ECサイト構築・運用", 
        desc: "ECサイトの構築から、\n在庫や業務との連動、日々の運用まで。\n現場とつながる「売る仕組み」をつくります。",
        pTags: ["在庫が合わない", "売上が伸び悩んでいる"],
        sTags: ["ECサイト構築", "在庫管理システム"],
        href: "/service/ec" // ★リンク修正
    },
    { 
        id: "04",
        icon: "palette", 
        title: "デザイン制作", 
        desc: "紙・Webを問わず、\n運用や更新を前提にしたデザインを制作。\n現場で使われることを大切にしています。",
        pTags: ["集客できない"],
        sTags: ["SNS運用"],
        href: "/service/design" // ★リンク修正
    }
  ];

  return (
    <main className="bg-[#F9FAFB] min-h-screen pt-14 md:pt-16 overflow-hidden">
      
      {/* FV Section */}
      <section className="bg-[#FAFAFA] relative lg:h-[calc(100vh-64px)] min-h-[600px] flex flex-col justify-center py-10 lg:py-0">
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(38, 70, 83, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(38, 70, 83, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute right-[-10%] top-10 lg:top-[10%] w-[90%] lg:w-[50%] h-[50%] lg:h-[80%] z-0 pointer-events-none">
              <img src="/fv-illustration.png" alt="DX Illustration" className="w-full h-full object-contain object-right-top opacity-30 lg:opacity-90" />
          </div>
          <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-melon-light/30 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3 z-0"></div>

          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10 h-full flex flex-col justify-center">
              <div className="w-full lg:w-6/12 text-left mb-8 lg:mb-12 relative z-20 pt-4 lg:pt-0">
                  <div className="flex items-center gap-3 mb-4 lg:mb-6">
                      <span className="w-8 lg:w-12 h-[2px] bg-melon-dark"></span>
                      <p className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase">DX & Creative Partner</p>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-en leading-tight mb-4 lg:mb-6 text-[#264653] tracking-tight">Less is more</h1>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-medium max-w-lg">ありふれた情報・モノの中でシンプルに考え、<br />シンプルに行動。そして豊かに。</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                      <span className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1"><i className="fas fa-palette text-melon-dark/50"></i> デザイン</span>
                      <span className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1"><i className="fas fa-laptop-code text-melon-dark/50"></i> Web制作</span>
                      <span className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1"><i className="fas fa-store text-melon-dark/50"></i> EC構築</span>
                      <span className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1"><i className="fas fa-rocket text-melon-dark/50"></i> SaaS導入</span>
                  </div>
                  <div className="flex gap-3">
                      <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-melon-dark hover:text-melon-dark transition-all shadow-sm"><i className="fas fa-chevron-left text-sm lg:text-base"></i></button>
                      <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-melon-dark hover:text-melon-dark transition-all shadow-sm"><i className="fas fa-chevron-right text-sm lg:text-base"></i></button>
                  </div>
              </div>

              {/* スライダー (Pickup記事) */}
              <div className="w-full z-20">
                  <div className="flex gap-4 lg:gap-6 overflow-x-auto snap-x-mandatory scrollbar-hide py-2 px-1 pb-4">
                      {pickups.map((article: any) => {
                           const pTags = article.problem_tags ? (Array.isArray(article.problem_tags) ? article.problem_tags : [article.problem_tags]) : [];
                           const sTags = article.solution_tags ? (Array.isArray(article.solution_tags) ? article.solution_tags : [article.solution_tags]) : [];
                           const categoryName = getCategoryName(article.category);
                           return (
                              <div key={article.id} className="min-w-[260px] md:min-w-[320px] snap-center group relative overflow-hidden rounded-2xl shadow-md h-[260px] md:h-[300px] hover:-translate-y-1 transition-transform duration-300 bg-white flex-shrink-0">
                                  <Link href={`/article/${article.id}`} className="absolute inset-0 z-0 block" />
                                  <div className="absolute inset-0 pointer-events-none">
                                      <img src={article.thumnail?.url || article.thumbnail?.url || article.image?.url || article.eyecatch?.url || "https://placehold.jp/eeeeee/999999/600x400.png?text=No+Image"} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-[#264653] via-[#264653]/40 to-transparent"></div>
                                  </div>
                                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                                      <span className="bg-white text-[#264653] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                                        {categoryName}
                                      </span>
                                  </div>
                                  <div className="absolute bottom-0 p-5 z-10 w-full pointer-events-none">
                                      <time className="text-white text-xs font-en block mb-2 font-medium opacity-90 drop-shadow-sm">{formatDate(article.publishedAt || article.createdAt)}</time>
                                      <h3 className="font-bold text-lg md:text-xl leading-snug mb-3 text-white drop-shadow-md line-clamp-2">{article.title}</h3>
                                      <div className="flex flex-wrap gap-2">
                                        {[...pTags, ...sTags].slice(0, 3).map((tag: any, i: number) => (
                                            <span key={i} className={`bg-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm relative z-20 ${pTags.includes(tag) ? 'text-[#E76F51]' : 'text-melon-dark'}`}>
                                                {getTagName(tag)}
                                            </span>
                                        ))}
                                      </div>
                                  </div>
                              </div>
                           );
                      })}
                  </div>
              </div>
          </div>
      </section>

      {/* HOW WE DO */}
      <section className="py-16 lg:py-20 bg-[#264653] text-white relative">
           <div className="absolute -left-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
           <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-melon/20 rounded-full blur-3xl pointer-events-none"></div>
           <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
                  <div className="lg:w-5/12">
                      <span className="text-melon-light font-bold tracking-widest font-en text-xs uppercase mb-4 block">HOW WE DO</span>
                      <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6">一緒につくって、一緒に回す。<br />現場が止まらないDXを。</h2>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">つくる人、つかう人、対話を重ねて良いものを。<br />システムに使われるのではなく、人が使いこなせる「あたたかみのある」DXを実現します。</p>
                      <Link href="/about" className="inline-flex items-center gap-3 text-white font-bold border-b border-melon-light pb-1 hover:text-melon-light transition-colors group">メロンワークスのMVVはこちら<i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i></Link>
                  </div>
                  <div className="lg:w-7/12 w-full">
                      <div className="space-y-5">
                          {howWeDoItems.map((item, i) => (
                             <div key={i} className="group border-b border-white/20 pb-5 hover:border-melon-light/50 transition-colors">
                                  <div className="flex items-start gap-6">
                                      <div className="text-melon-light font-en font-bold text-4xl leading-none mt-1 opacity-80 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                                      <div>
                                          <div className="flex items-center gap-3 mb-2">
                                              <i className={`fas fa-${item.icon} text-xl text-melon-light`}></i>
                                              <h3 className="font-bold text-xl">{item.title}</h3>
                                          </div>
                                          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                                              {item.text}
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
           </div>
      </section>
      
      {/* SERVICE */}
      <section className="py-24 bg-white relative">
          <div className="absolute -left-20 top-0 w-[500px] h-[500px] bg-gray-50/50 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] blur-2xl pointer-events-none -rotate-12 z-0"></div>
          <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-melon-light/20 rounded-[63%_37%_37%_63%_/_63%_63%_37%_37%] blur-3xl pointer-events-none translate-x-1/4 translate-y-1/4 z-0"></div>

          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
              <div className="text-center mb-16">
                  <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">SERVICE</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">提供サービス</h2>
                  <p className="text-gray-500 mt-4 text-sm max-w-2xl mx-auto">
                      「つくる」だけでなく「動かす」まで。<br className="hidden md:inline" />
                      現場目線で、ビジネスを加速させる4つのアプローチ。
                  </p>
              </div>
              
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

      {/* SEARCH (変更なし) */}
      <section className="bg-white py-24 border-y border-gray-100 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-[25%] z-0 pointer-events-none opacity-20 hidden lg:block"><img src="/light.png" alt="Solution Idea" className="w-full h-auto object-contain" /></div>
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
              <div className="text-center mb-10">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-2 block">FIND YOUR SOLUTION</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">記事検索</h2>
                  <p className="text-gray-500 mt-3 text-sm">あなたの現在の状況に合わせて、最適な解決策を探せます。</p>
              </div>
              <div className="bg-[#FAFAFA]/95 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-100 hover:shadow-md transition-shadow relative">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-full md:w-48 flex-shrink-0 flex items-center justify-between md:justify-start gap-3">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent-red flex items-center justify-center text-accent-redText text-lg"><i className="fas fa-exclamation-triangle"></i></div>
                              <h3 className="font-bold text-[#264653] text-base">課題から探す</h3>
                          </div>
                      </div>
                      <div className="flex-grow flex flex-wrap gap-2">
                          {["在庫が合わない", "IT担当がいない", "アナログ管理をやめたい", "売上が伸び悩んでいる", "人手不足", "コスト削減"].map((t, i) => (
                              <Link key={i} href={`/search?tag=${encodeURIComponent(t)}`} className="tag-hover px-3 py-1.5 bg-white border border-red-100 text-accent-redText rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">{t}</Link>
                          ))}
                      </div>
                  </div>
              </div>
              <div className="bg-melon-light/95 backdrop-blur-sm rounded-xl p-6 border border-melon/20 hover:shadow-md transition-shadow relative">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-full md:w-48 flex-shrink-0 flex items-center justify-between md:justify-start gap-3">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-melon-dark text-lg shadow-sm"><i className="fas fa-lightbulb"></i></div>
                              <h3 className="font-bold text-[#264653] text-base">解決策から探す</h3>
                          </div>
                      </div>
                      <div className="flex-grow flex flex-wrap gap-2">
                          {["在庫管理システム", "ECサイト構築", "Web制作", "AI・自動化", "POSレジ", "補助金活用"].map((t, i) => (
                              <Link key={i} href={`/search?tag=${encodeURIComponent(t)}`} className="tag-hover px-3 py-1.5 bg-white border border-melon/20 text-melon-dark rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">{t}</Link>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* News Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-6xl py-24 relative">
          <div className="absolute left-0 top-20 w-24 h-24 bg-melon-light/40 rounded-full blur-2xl pointer-events-none -translate-x-1/2 z-0"></div>

          <div className="flex flex-col lg:flex-row gap-16 relative z-10">
              <div className="lg:w-3/4">
                  <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-4 relative">
                      <h2 className="text-xl md:text-2xl font-bold text-[#264653] relative z-10">新着記事</h2>
                      <Link href="/articles" className="text-sm font-bold text-gray-500 hover:text-melon-dark transition-colors flex items-center gap-1 group relative z-10">View All <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i></Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {news.map((article: any) => {
                          const pTags = article.problem_tags ? (Array.isArray(article.problem_tags) ? article.problem_tags : [article.problem_tags]) : [];
                          const sTags = article.solution_tags ? (Array.isArray(article.solution_tags) ? article.solution_tags : [article.solution_tags]) : [];
                          const categoryName = getCategoryName(article.category);
                          const categoryId = typeof article.category === 'object' ? article.category.id : null;
                          return (
                              <div key={article.id} className="group relative overflow-hidden rounded-2xl shadow-soft h-[320px] hover-lift block bg-white">
                                  <Link href={`/article/${article.id}`} className="absolute inset-0 z-0 block" />
                                  <div className="absolute inset-0 pointer-events-none">
                                      <img src={article.thumnail?.url || article.thumbnail?.url || article.image?.url || article.eyecatch?.url || "https://placehold.jp/eeeeee/999999/600x375.png?text=No+Image"} alt={article.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-[#264653] via-[#264653]/40 to-transparent"></div>
                                  </div>
                                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                                      {categoryId ? (
                                        <Link href={`/search?categoryId=${categoryId}&categoryName=${categoryName}`} className="bg-white text-[#264653] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm hover:bg-melon-light transition-colors relative z-20 pointer-events-auto">{categoryName}</Link>
                                      ) : (
                                        <span className="bg-white text-[#264653] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">{categoryName}</span>
                                      )}
                                  </div>
                                  <div className="absolute bottom-0 p-6 z-10 w-full pointer-events-none">
                                      <time className="text-white text-xs font-en block mb-2 font-medium opacity-90 drop-shadow-sm">{formatDate(article.publishedAt || article.createdAt)}</time>
                                      <h3 className="font-bold text-lg leading-snug mb-3 text-white drop-shadow-md line-clamp-2">{article.title}</h3>
                                      <div className="flex flex-wrap gap-2 pointer-events-auto">
                                          {pTags.map((tag: any, i: number) => (
                                              <Link key={`p-${i}`} href={`/search?tag=${encodeURIComponent(getTagName(tag))}`} className="bg-white text-[#E76F51] text-[9px] font-bold px-2.5 py-1 rounded shadow-sm border border-red-100 hover:shadow-md transition-all relative z-20">
                                                  {getTagName(tag)}
                                              </Link>
                                          ))}
                                          {sTags.map((tag: any, i: number) => (
                                              <Link key={`s-${i}`} href={`/search?tag=${encodeURIComponent(getTagName(tag))}`} className="bg-white text-melon-dark text-[9px] font-bold px-2.5 py-1 rounded shadow-sm border border-melon/20 hover:shadow-md transition-all relative z-20">
                                                  {getTagName(tag)}
                                              </Link>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
              <aside className="lg:w-1/4">
                  <div className="sticky top-24">
                      <h3 className="font-bold text-[#264653] border-b border-gray-200 pb-2 mb-6 text-lg">人気の記事</h3>
                      <div className="space-y-6">
                           {[1,2,3].map(n => (
                               <Link key={n} href="#" className="group flex gap-4 items-start">
                                   <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#264653] text-white font-en font-bold text-sm rounded-lg shadow-md group-hover:bg-melon-dark transition-colors">{n}</div>
                                   <div><h4 className="text-sm font-bold leading-relaxed text-gray-800 group-hover:text-melon-dark transition-colors">ダミー記事タイトル：ECサイトのリニューアル時期について{n}</h4><span className="text-[10px] text-gray-400 font-en mt-1 block"><i className="far fa-eye mr-1"></i> {1234-n*100} views</span></div>
                               </Link>
                           ))}
                      </div>
                  </div>
              </aside>
          </div>
      </section>

      {/* CTA (変更なし) */}
      <section className="bg-gradient-to-br from-[#264653] to-[#2A9D8F] text-white py-24 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-4 md:px-6 max-w-6xl text-center relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">あなたのビジネスの「現場」を整えます。</h2>
              <p className="text-white/80 mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed">まずは無料相談からお気軽にお問い合わせください。</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <Link href="#" className="bg-white text-melon-dark font-bold py-4 px-10 rounded-full hover:bg-melon-dark hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"><i className="far fa-envelope group-hover:rotate-12 transition-transform"></i> お問い合わせ</Link>
                  <Link href="#" className="bg-transparent border border-white/50 text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-melon-dark hover:border-white transition-all flex items-center justify-center gap-2"><i className="fas fa-download"></i> 資料ダウンロード</Link>
              </div>
          </div>
      </section>
    </main>
  );
}
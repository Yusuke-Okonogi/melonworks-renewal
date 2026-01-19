import { client } from "@/libs/client";
import Link from "next/link";
import StickyBottomNav from "@/components/StickyBottomNav";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "デザイン制作",
  description: "紙・Web問わず、運用や更新を前提にしたデザイン制作。現場で使われることを大切にしています。",
  openGraph: {
    title: "デザイン制作 | Melon Works",
    description: "紙・Web問わず、運用や更新を前提にしたデザイン制作。現場で使われることを大切にしています。",
  },
};

// --- データ取得関数 ---

// 1. デザイン関連の記事を取得
async function getDesignArticles() {
  try {
    const data = await client.get({
      endpoint: "article",
      queries: {
        // デザイン、ロゴ、パンフレット、UI/UX、バナーなどのタグを含む記事を取得
        filters: "solution_tags[contains]デザイン[or]solution_tags[contains]ロゴ[or]solution_tags[contains]パンフレット[or]solution_tags[contains]UI/UX[or]problem_tags[contains]デザインが古い",
        limit: 3, 
        orders: "-publishedAt",
      },
      customRequestInit: { cache: "no-store" },
    });
    return data.contents;
  } catch (error) {
    return [];
  }
}

// 2. 全タグ情報を取得
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
    if(!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};

export default async function DesignServicePage() {
  const [designArticles, allTags] = await Promise.all([
      getDesignArticles(),
      getTags()
  ]);

  // "design" サービスに関連するタグを抽出
  const relatedProblemTags = allTags
      .filter((t: any) => t.type?.includes("problem") && t.related_services?.includes("design"))
      .map((t: any) => t.name);

  const relatedSolutionTags = allTags
      .filter((t: any) => t.type?.includes("solution") && t.related_services?.includes("design"))
      .map((t: any) => t.name);

  // サービス詳細データ
  const serviceDetails = [
      { title: "ロゴ・VI制作", icon: "fas fa-signature", desc: "企業の理念や想いを形にするロゴデザイン。名刺や封筒への展開ルール（VI）も策定し、ブランドイメージを統一します。", note: "会社の顔を作ります。" },
      { title: "名刺・ショップカード", icon: "far fa-id-card", desc: "渡した相手の手元に残る大切なツール。紙質や加工にもこだわり、印象に残るデザインをご提案します。", note: "営業・集客ツールとして。" },
      { title: "パンフレット・カタログ", icon: "fas fa-book-open", desc: "会社案内や商品カタログの制作。読みやすさと情報の整理を重視し、営業現場で「使える」資料にします。", note: "営業活動をサポート。" },
      { title: "チラシ・フライヤー", icon: "far fa-newspaper", desc: "イベント告知や店舗集客のためのチラシ制作。新聞折込やポスティングなど、配布方法に合わせたデザインを設計。", note: "地域集客に効果的。" },
      { title: "バナー・Web素材", icon: "far fa-image", desc: "Web広告用バナー、SNS投稿画像、ブログのアイキャッチなど。クリック率や視認性を意識したWeb特化のデザイン。", note: "1点から制作可能。" },
      { title: "UI/UXデザイン", icon: "fas fa-layer-group", desc: "アプリやWebサービスの画面設計。見た目の美しさだけでなく、「使いやすさ」「迷わせない導線」を設計します。", note: "システムの使い勝手向上。" },
      { title: "営業資料・スライド", icon: "fas fa-presentation", desc: "PowerPoint等の営業資料をブラッシュアップ。情報を視覚的に整理し、商談の成約率を高めるデザインにします。", note: "編集可能なデータで納品。" },
      { title: "イラスト・アイコン", icon: "fas fa-pen-fancy", desc: "オリジナルのイラストやアイコン制作。フリー素材では出せない独自の世界観や、親しみやすさを演出します。", note: "他社と差別化できます。" },
  ];

  // フローデータ
  const flows = [
      { step: "01", duration: "3日〜1週間", title: "ヒアリング・お見積り", text: "制作の目的、ターゲット、伝えたいイメージ、納期や予算をお伺いします。" },
      { step: "02", duration: "1週間〜2週間", title: "ラフデザイン提案", text: "ヒアリング内容をもとに、デザインの方向性（ラフ案）を数パターンご提案します。" },
      { step: "03", duration: "1週間〜", title: "修正・ブラッシュアップ", text: "選んでいただいた案をもとに詳細を作り込みます。修正は納得いくまで対応します。" },
  ];

  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
      <PageHeader 
        titleEn="DESIGN CREATIVE"
        titleJp="デザイン制作"
        breadcrumbs={[
            { name: "SERVICE", path: "/service" },
            { name: "デザイン制作" }
        ]}
      />

      {/* FV Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#FAFAFA]">
          <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-melon-light/10 to-transparent pointer-events-none"></div>
          <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-melon-light/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
          
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                  <div className="w-full md:w-1/2">
                      <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-4 block">DESIGN CREATIVE</span>
                      <h1 className="text-3xl md:text-5xl font-bold text-[#264653] leading-tight mb-6">
                          想いを翻訳し、<br />
                          <span className="relative inline-block">
                            価値を届ける
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-melon-light/40 -z-10"></span>
                          </span>
                          デザインを。
                      </h1>
                      <p className="text-gray-600 text-sm md:text-base leading-loose mb-8 font-medium">
                          紙・Webを問わず、目的に合わせたデザインを制作。<br />
                          ただ美しく飾るのではなく、<br />
                          <strong>「誰に、何を、どう伝えたいか」</strong>を整理し、伝わる形にします。
                      </p>
                  </div>
                  <div className="w-full md:w-1/2 relative">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                          <img src="../img_design.png" alt="デザイン制作イメージ" className="w-full h-full object-cover" />
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ISSUES (シンプル版) */}
      <section className="py-16 md:py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
              <div className="text-center mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#264653] mb-4">こんな課題はありませんか？</h2>
              </div>
              
              <div className="w-full max-w-3xl mx-auto">
                  <ul className="grid grid-cols-2 md:grid-cols-2 gap-x-4 md:gap-x-12 gap-y-4 md:gap-y-6">
                      {[
                          "自分たちで作った資料やチラシが素人っぽい",
                          "Webサイトとパンフレットのデザインがバラバラ",
                          "ロゴマークがなく、会社の信頼感が薄い",
                          "サービスの魅力がうまく伝わっていない気がする",
                          "営業資料が見にくく、商談で説明しづらい",
                          "外注先のデザインが現場の感覚とズレている",
                          "印刷の入稿データを作るのが大変",
                          "ちょっとした修正を頼める相手がいない"
                      ].map((text, i) => (
                          <li key={i} className="flex items-start gap-2 md:gap-4 text-xs md:text-base text-gray-700 font-bold bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none">
                              <i className="fas fa-check text-melon-dark mt-0.5 md:mt-1 text-sm md:text-lg flex-shrink-0"></i> 
                              <span>{text}</span>
                          </li>
                      ))}
                  </ul>
                  <div className="mt-8 md:mt-12 text-center">
                      <p className="text-[#264653] font-bold text-xs md:text-base bg-melon-light/10 inline-block px-4 py-3 md:px-6 md:py-3 rounded-full border border-melon/20">
                          ひとつでも当てはまれば、デザインの力で解決できるかもしれません。
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* PHILOSOPHY (考え方) */}
      <section className="py-24 bg-[#264653] text-white relative overflow-hidden">
           <div className="absolute -left-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
           <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
               <div className="text-center mb-16">
                   <h2 className="text-2xl md:text-3xl font-bold mb-4">メロンワークスのデザインの考え方</h2>
                   <div className="w-16 h-1 bg-melon mx-auto rounded-full"></div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                       <div className="text-melon-light text-4xl mb-4"><i className="fas fa-bullseye"></i></div>
                       <h3 className="text-xl font-bold mb-4 text-white">目的を外さない</h3>
                       <p className="text-gray-300 text-sm leading-relaxed">
                           「かっこいい」が正解とは限りません。<br />
                           信頼を得たいのか、親しみを持たれたいのか、目的に合ったトーンを作ります。
                       </p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                       <div className="text-melon-light text-4xl mb-4"><i className="fas fa-swatchbook"></i></div>
                       <h3 className="text-xl font-bold mb-4 text-white">統一感を大切に</h3>
                       <p className="text-gray-300 text-sm leading-relaxed">
                           名刺、Web、パンフレット。<br />
                           媒体が違ってもブランドイメージがブレないよう、統一された世界観を構築します。
                       </p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                       <div className="text-melon-light text-4xl mb-4"><i className="fas fa-print"></i></div>
                       {/* ★修正: 印刷・配布までサポート */}
                       <h3 className="text-xl font-bold mb-4 text-white">印刷・配布までサポート</h3>
                       <p className="text-gray-300 text-sm leading-relaxed">
                           印刷の手配や入稿代行に加え、ポスティングや新聞折込などの配布まで対応。<br />
                           作ったものを「届ける」ところまでサポートします。
                       </p>
                   </div>
               </div>
           </div>
      </section>

      {/* SERVICE DETAILS */}
      <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
               <div className="text-center mb-16">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">SERVICE MENU</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">サービス内容</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {serviceDetails.map((s, i) => (
                       <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-melon/30 transition-colors group">
                           <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-melon-dark text-xl mb-4 group-hover:bg-melon-dark group-hover:text-white transition-colors">
                               <i className={s.icon}></i>
                           </div>
                           <h3 className="font-bold text-[#264653] mb-3">{s.title}</h3>
                           <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-[4.5em]">{s.desc}</p>
                           <p className="text-[10px] text-melon-dark font-bold bg-melon-light/10 p-2 rounded block">
                               👉 {s.note}
                           </p>
                       </div>
                   ))}
               </div>
          </div>
      </section>

      {/* FLOW (左右統一レイアウト) */}
      <section className="py-24 bg-[#FAFAFA] relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
               <div className="text-center mb-16">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">FLOW</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">制作の流れ</h2>
                   <p className="text-gray-500 text-sm mt-3">標準的なデザイン制作のステップです。</p>
               </div>
               
               <div className="relative">
                   {/* 中央の線 (PCのみ) */}
                   <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block"></div>
                   
                   <div className="space-y-8 md:space-y-12">
                       {flows.map((flow, i) => (
                           <div key={i} className="flex flex-col md:flex-row items-center gap-6 md:gap-0 relative">
                               
                               {/* 左側：期間 (PCのみ表示、右寄せ) */}
                               <div className="w-full md:w-1/2 md:pr-12 hidden md:flex justify-end items-center order-2 md:order-1">
                                   <div className="flex items-center gap-3 text-melon-dark font-bold bg-white/50 px-5 py-2 rounded-full border border-gray-200">
                                       <i className="far fa-clock"></i>
                                       <span>{flow.duration}</span>
                                   </div>
                               </div>

                               {/* 中央：番号サークル */}
                               <div className="w-12 h-12 bg-melon-dark text-white rounded-full flex items-center justify-center font-bold font-en relative z-10 shadow-md shrink-0 order-1 md:order-2 border-4 border-[#FAFAFA]">
                                   {flow.step}
                               </div>

                               {/* 右側：内容カード (PC & SP) */}
                               <div className="w-full md:w-1/2 md:pl-12 order-3 md:order-3">
                                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative text-left">
                                        {/* SP用の矢印装飾 */}
                                        <div className="md:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                                        {/* PC用の矢印装飾 (左向き) */}
                                        <div className="hidden md:block absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-b border-l border-gray-100"></div>

                                        <h3 className="text-lg font-bold text-[#264653] mb-2">{flow.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{flow.text}</p>
                                        
                                        {/* SPのみここに期間を表示 */}
                                        <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-melon-dark font-bold text-xs">
                                            <i className="far fa-clock"></i> {flow.duration}
                                        </div>
                                   </div>
                               </div>

                           </div>
                       ))}
                   </div>

                   {/* 別途契約の注釈 */}
                   <div className="mt-12 md:mt-16 text-center relative z-10">
                        <p className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm text-xs md:text-sm font-bold text-gray-500">
                            <i className="fas fa-info-circle text-melon-dark"></i>
                            印刷費は別途実費となります。印刷会社への入稿代行も承ります。
                        </p>
                   </div>
               </div>
          </div>
      </section>

      {/* CASE STUDY */}
      <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
               <div className="text-center mb-16">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">CASE STUDY</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">関連する実績・記事</h2>
               </div>

               {designArticles.length > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {designArticles.map((article: any) => {
                           const pTags = article.problem_tags ? (Array.isArray(article.problem_tags) ? article.problem_tags : [article.problem_tags]) : [];
                           const sTags = article.solution_tags ? (Array.isArray(article.solution_tags) ? article.solution_tags : [article.solution_tags]) : [];
                           const categoryName = getCategoryName(article.category);

                           return (
                               <Link key={article.id} href={`/article/${article.id}`} className="group relative overflow-hidden rounded-2xl shadow-soft h-[320px] hover-lift block bg-white border border-gray-100">
                                   <div className="absolute inset-0 pointer-events-none">
                                       <img 
                                         src={article.thumnail?.url || article.thumbnail?.url || article.image?.url || article.eyecatch?.url || "https://placehold.jp/eeeeee/999999/600x400.png?text=No+Image"} 
                                         alt={article.title} 
                                         className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
                                       />
                                       <div className="absolute inset-0 bg-gradient-to-t from-[#264653] via-[#264653]/40 to-transparent"></div>
                                   </div>
                                   
                                   <div className="absolute top-4 left-4 z-20">
                                       <span className="bg-white text-[#264653] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                                           {categoryName}
                                       </span>
                                   </div>

                                   <div className="absolute bottom-0 p-6 z-10 w-full pointer-events-none">
                                       <time className="text-white text-xs font-en block mb-2 font-medium opacity-90 drop-shadow-sm">
                                           {formatDate(article.publishedAt || article.createdAt)}
                                       </time>
                                       <h3 className="font-bold text-lg leading-snug mb-3 text-white drop-shadow-md line-clamp-2">
                                           {article.title}
                                       </h3>
                                       
                                       <div className="flex flex-wrap gap-1.5">
                                           {pTags.slice(0, 2).map((tag: any, i: number) => (
                                               <span key={`p-${i}`} className="bg-white text-[#E76F51] text-[9px] font-bold px-2 py-0.5 rounded shadow-sm border border-red-100">
                                                   {getTagName(tag)}
                                               </span>
                                           ))}
                                           {sTags.slice(0, 2).map((tag: any, i: number) => (
                                               <span key={`s-${i}`} className="bg-white text-melon-dark text-[9px] font-bold px-2 py-0.5 rounded shadow-sm border border-melon/20">
                                                   {getTagName(tag)}
                                               </span>
                                           ))}
                                       </div>
                                   </div>
                               </Link>
                           );
                       })}
                   </div>
               ) : (
                   <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 text-gray-400 text-sm">
                       <p>現在、関連する記事を準備中です。</p>
                   </div>
               )}
               
               <div className="text-center mt-10">
                   <Link href="/search?tag=デザイン制作" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-600 px-8 py-3 rounded-full hover:border-melon-dark hover:text-melon-dark transition-all font-bold text-sm">
                       もっと見る <i className="fas fa-arrow-right"></i>
                   </Link>
               </div>
          </div>
      </section>

      {/* TAGS (フッター直前 & 統合デザイン) */}
      <section className="py-20 bg-[#FAFAFA] border-t border-gray-100">
           <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
               <div className="text-center mb-10">
                   <h2 className="text-xl font-bold text-[#264653]">関連するタグから探す</h2>
                   <p className="text-gray-500 text-sm mt-2">具体的な課題や解決策から事例を検索できます。</p>
               </div>

               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                   <div className="flex flex-wrap gap-2 justify-center">
                       {/* 課題タグ (赤系) */}
                       {relatedProblemTags.map((tag: string, i: number) => (
                           <Link key={`p-${i}`} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-white border border-red-100 text-[#E76F51] hover:bg-red-50 text-xs font-bold px-3 py-2 rounded-full transition-colors shadow-sm">
                               {tag}
                           </Link>
                       ))}
                       {/* 解決策タグ (緑系) */}
                       {relatedSolutionTags.map((tag: string, i: number) => (
                           <Link key={`s-${i}`} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-white border border-melon/20 text-melon-dark hover:bg-melon-light/10 text-xs font-bold px-3 py-2 rounded-full transition-colors shadow-sm">
                               {tag}
                           </Link>
                       ))}
                   </div>
               </div>
           </div>
      </section>

      <StickyBottomNav title="デザイン制作" />
    </main>
  );
}
import { client } from "@/libs/client";
import Link from "next/link";
import StickyBottomNav from "@/components/StickyBottomNav";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webサイト制作",
  description: "コーポレートサイトやLPを、更新・運用しやすい形で設計・制作。使われ続けるWebを前提に考えます。",
  openGraph: {
    title: "Webサイト制作 | Melon Works",
    description: "コーポレートサイトやLPを、更新・運用しやすい形で設計・制作。使われ続けるWebを前提に考えます。",
  },
};

// --- データ取得関数 ---

// 1. Web関連の記事を取得
async function getWebArticles() {
  try {
    const data = await client.get({
      endpoint: "article",
      queries: {
        filters: "solution_tags[contains]Web制作[or]solution_tags[contains]コーディング[or]solution_tags[contains]CMS[or]problem_tags[contains]集客できない",
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

export default async function WebServicePage() {
  const [webArticles, allTags] = await Promise.all([
      getWebArticles(),
      getTags()
  ]);

  const relatedProblemTags = allTags
      .filter((t: any) => t.type?.includes("problem") && t.related_services?.includes("web"))
      .map((t: any) => t.name);

  const relatedSolutionTags = allTags
      .filter((t: any) => t.type?.includes("solution") && t.related_services?.includes("web"))
      .map((t: any) => t.name);

  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
      <PageHeader 
        titleEn="BUSINESS DESIGN & DX"
        titleJp="Webサイト制作"
        breadcrumbs={[
            { name: "SERVICE", path: "/service" },
            { name: "Webサイト制作" }
        ]}
      />

      {/* FV Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#FAFAFA]">
          <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-melon-light/10 to-transparent pointer-events-none"></div>
          <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-melon-light/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
          
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                  <div className="w-full md:w-1/2">
                      <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-4 block">WEB PRODUCTION</span>
                      <h1 className="text-3xl md:text-5xl font-bold text-[#264653] leading-tight mb-6">
                          更新しやすく、<br />
                          <span className="relative inline-block">
                            成果が出る
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-melon-light/40 -z-10"></span>
                          </span>
                          Webサイトを。
                      </h1>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
                          コーポレートサイトやLPを、更新・運用しやすい形で設計・制作。<br />
                          ただ作るだけでなく、公開後の更新頻度や運用体制まで見据え、<br />
                          「使われ続けるWeb」を前提に考えます。
                      </p>
                  </div>
                  <div className="w-full md:w-1/2 relative">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                          <img src="../img_web.png" alt="Web制作イメージ" className="w-full h-full object-cover" />
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#264653] mb-8 leading-snug">
                      「作ったはいいけど、<br className="md:hidden"/>更新されずに放置されている」<br />
                      そんなサイトになっていませんか？
                  </h2>
                  <p className="text-gray-500 leading-loose text-sm md:text-base">
                      Webサイトは企業の「顔」ですが、情報が古いままだと信頼を損ないます。<br />
                      しかし、更新作業が複雑だと、どうしても後回しになりがちです。<br /><br />
                      私たちは、専門知識がなくても簡単に更新できるCMS（管理画面）の導入や、<br />
                      <strong>「運用負荷を最小限にする設計」</strong>をご提案します。
                  </p>
              </div>
          </div>
      </section>

      {/* ISSUES & SOLUTIONS (Top Page Style) */}
      <section className="py-24 bg-white relative overflow-hidden border-y border-gray-50">
           <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-melon-light/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"></div>

           <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
               <div className="text-center mb-12">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">ISSUES & SOLUTIONS</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653] mb-4">課題と解決策</h2>
                   <p className="text-gray-500 text-sm">Web活用に関するあらゆる課題に対応可能です。</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                   {/* 課題エリア (Top Page Style) */}
                   <div className="bg-[#FAFAFA]/95 backdrop-blur-sm border border-gray-100 p-8 rounded-2xl shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                       <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#E76F51] text-xl shrink-0">
                               <i className="fas fa-exclamation-triangle"></i>
                           </div>
                           <h3 className="font-bold text-lg text-[#264653]">抱えている課題</h3>
                       </div>
                       <div className="flex flex-wrap gap-2 relative z-10">
                           {relatedProblemTags.map((tag: string, i: number) => (
                               <Link key={i} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-white hover:bg-red-50 border border-red-100 text-[#E76F51] text-xs font-bold px-3 py-2 rounded-full transition-colors flex items-center gap-2 shadow-sm">
                                   {tag}
                                   <i className="fas fa-chevron-right text-[10px] opacity-50"></i>
                               </Link>
                           ))}
                       </div>
                   </div>

                   {/* 解決策エリア (Top Page Style) */}
                   <div className="bg-melon-light/95 backdrop-blur-sm border border-melon/20 p-8 rounded-2xl shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                       <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-melon-dark text-xl shadow-sm shrink-0">
                               <i className="fas fa-lightbulb"></i>
                           </div>
                           <h3 className="font-bold text-lg text-[#264653]">提供する解決策</h3>
                       </div>
                       <div className="flex flex-wrap gap-2 relative z-10">
                           {relatedSolutionTags.map((tag: string, i: number) => (
                               <Link key={i} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-white hover:bg-melon-light/40 border border-melon/20 text-melon-dark text-xs font-bold px-3 py-2 rounded-full transition-colors flex items-center gap-2 shadow-sm">
                                   {tag}
                                   <i className="fas fa-chevron-right text-[10px] opacity-50"></i>
                               </Link>
                           ))}
                       </div>
                   </div>
               </div>
           </div>
      </section>

      {/* CASE STUDY (デザイン統一) */}
      <section className="py-24 bg-[#FAFAFA] relative">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
               <div className="text-center mb-16">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">CASE STUDY</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">関連する実績・記事</h2>
               </div>

               {webArticles.length > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {webArticles.map((article: any) => {
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
                                           {pTags.slice(0, 1).map((tag: any, i: number) => (
                                               <span key={`p-${i}`} className="bg-white text-[#E76F51] text-[9px] font-bold px-2 py-0.5 rounded shadow-sm border border-red-100">
                                                   {getTagName(tag)}
                                               </span>
                                           ))}
                                           {sTags.slice(0, 1).map((tag: any, i: number) => (
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
                   <Link href="/search?tag=Web制作" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-600 px-8 py-3 rounded-full hover:border-melon-dark hover:text-melon-dark transition-all font-bold text-sm">
                       もっと見る <i className="fas fa-arrow-right"></i>
                   </Link>
               </div>
          </div>
      </section>

      {/* Flow (変更なし) */}
      <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
               <div className="text-center mb-16">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">FLOW</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">制作の流れ</h2>
               </div>
               <div className="relative">
                   <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block"></div>
                   <div className="space-y-12">
                       {[
                           { step: "01", title: "ヒアリング・要件定義", text: "サイトの目的、ターゲット、必要な機能やページ構成を整理します。", time: "1〜2週間" },
                           { step: "02", title: "構成案・デザイン", text: "ワイヤーフレーム（設計図）で構成を固めた後、デザイン制作に進みます。", time: "2週間〜" },
                           { step: "03", title: "構築（コーディング）", text: "デザインをもとにWebページとして構築し、CMS（更新システム）の実装も行います。", time: "3週間〜" },
                           { step: "04", title: "公開・運用サポート", text: "テスト検証後に公開します。公開後の更新作業や保守管理も承ります。", time: "継続支援" }
                       ].map((flow, i) => (
                           <div key={i} className="flex flex-col md:flex-row items-center gap-6 md:gap-0 relative">
                               <div className="w-full md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                                   <h3 className="text-lg font-bold text-[#264653] mb-2">{flow.title}</h3>
                                   <p className="text-sm text-gray-500">{flow.text}</p>
                               </div>
                               <div className="w-12 h-12 bg-white border-2 border-melon text-melon-dark rounded-full flex items-center justify-center font-bold relative z-10 shadow-md shrink-0 order-1 md:order-2">{flow.step}</div>
                               <div className="w-full md:w-1/2 md:pl-12 order-3 md:order-3">
                                   <span className="text-xs font-bold text-melon-dark bg-melon-light/20 px-2 py-1 rounded">{flow.time}</span>
                               </div>
                           </div>
                       ))}
                   </div>
               </div>
          </div>
      </section>

      {/* CTA (変更なし) */}
      <section className="bg-gradient-to-br from-[#264653] to-[#2A9D8F] text-white py-24 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">「使い続けられる」Webサイトをつくりませんか？</h2>
              <p className="text-white/80 mb-10 text-base md:text-lg leading-relaxed">
                  新規制作からリニューアル、部分的な改修まで。<br />
                  御社の運用体制に合わせた最適なプランをご提案します。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <Link href="/contact" className="bg-white text-melon-dark font-bold py-4 px-10 rounded-full hover:bg-melon-dark hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                      <i className="far fa-envelope group-hover:rotate-12 transition-transform"></i> 無料相談・お問い合わせ
                  </Link>
              </div>
          </div>
      </section>

      <StickyBottomNav title="Webサイト制作" />
    </main>
  );
}
import { client } from "@/libs/client";
import Link from "next/link";
import StickyBottomNav from "@/components/StickyBottomNav";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "業務設計・DX支援",
  description: "業務フローの可視化からツール選定、定着支援まで。現場の負荷を減らすDXを実現します。",
  openGraph: {
    title: "業務設計・DX支援 | Melon Works",
    description: "業務フローの可視化からツール選定、定着支援まで。現場の負荷を減らすDXを実現します。",
  },
};

// --- データ取得関数 ---

// 1. DX関連の記事を取得
async function getDxArticles() {
  try {
    const data = await client.get({
      endpoint: "article",
      queries: {
        // DX、業務効率化、アナログ管理などに関連する記事を取得
        filters: "problem_tags[contains]アナログ管理[or]solution_tags[contains]DX[or]solution_tags[contains]業務効率化",
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

// 2. 全タグ情報を取得 (★追加)
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

export default async function DxServicePage() {
  // 記事とタグを並行取得 (★修正)
  const [dxArticles, allTags] = await Promise.all([
      getDxArticles(),
      getTags()
  ]);

  // ★タグの自動抽出ロジック
  // related_services に "dx" が含まれるタグのみを抽出
  const relatedProblemTags = allTags
      .filter((t: any) => t.type?.includes("problem") && t.related_services?.includes("dx"))
      .map((t: any) => t.name);

  const relatedSolutionTags = allTags
      .filter((t: any) => t.type?.includes("solution") && t.related_services?.includes("dx"))
      .map((t: any) => t.name);

  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
    {/* ★共通ヘッダーを使用 */}
      <PageHeader 
        titleEn="BUSINESS DESIGN & DX"
        titleJp="業務設計・DX支援"
        breadcrumbs={[
            { name: "SERVICE", path: "/service" },
            { name: "業務設計・DX支援" }
        ]}
      />

      {/* FV Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#FAFAFA]">
          <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-melon-light/10 to-transparent pointer-events-none"></div>
          <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-melon-light/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                  <div className="w-full md:w-1/2">
                      <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-4 block">BUSINESS DESIGN & DX</span>
                      <h1 className="text-3xl md:text-5xl font-bold text-[#264653] leading-tight mb-6">
                          現場の負荷を減らし、<br />
                          <span className="relative inline-block">
                            本来の仕事
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-melon-light/40 -z-10"></span>
                          </span>
                          に集中できる仕組みをつくる。
                      </h1>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
                          業務の流れや情報の分断を整理し、現場に無理のない仕組みを設計します。<br />
                          特定のツールありきではなく、「現場が使いこなせるか」を最優先に、<br />
                          選定から定着まで伴走します。
                      </p>
                  </div>
                  <div className="w-full md:w-1/2 relative">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                          <img src="../img_dx.png" alt="DX支援のイメージ" className="w-full h-full object-cover" />
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
                      「ツールを導入したけれど、<br className="md:hidden"/>結局使われていない」<br />
                      そんな経験はありませんか？
                  </h2>
                  <p className="text-gray-500 leading-loose text-sm md:text-base">
                      DXという言葉が先行し、「とにかく何かシステムを入れなければ」と焦ってしまう企業様が増えています。<br /><br />
                      しかし、現場の実態とかけ離れた高機能なツールは、かえって業務を複雑にします。<br />
                      大切なのは、ツールそのものではなく、<br />
                      <strong>「誰が、いつ、どのように使うか」という業務設計</strong>です。
                  </p>
              </div>
          </div>
      </section>

      {/* ISSUES & SOLUTIONS (★修正: 自動取得タグを表示) */}
      <section className="py-24 bg-white relative overflow-hidden border-y border-gray-50">
           <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-melon-light/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"></div>

           <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
               <div className="text-center mb-12">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">ISSUES & SOLUTIONS</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653] mb-4">課題と解決策</h2>
                   <p className="text-gray-500 text-sm">御社の状況に当てはまるものはありますか？</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                   {/* 課題エリア */}
                   <div className="bg-[#FAFAFA]/95 border border-gray-100 p-8 rounded-2xl shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
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

                   {/* 解決策エリア */}
                   <div className="bg-melon-light/10 border border-melon/20 p-8 rounded-2xl shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
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

      {/* CASE STUDY */}
      <section className="py-24 bg-[#FAFAFA] relative">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
               <div className="text-center mb-16">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">CASE STUDY</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">関連する実績・記事</h2>
               </div>

               {dxArticles.length > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {dxArticles.map((article: any) => {
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
                   <Link href="/search?tag=DX支援" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-600 px-8 py-3 rounded-full hover:border-melon-dark hover:text-melon-dark transition-all font-bold text-sm">
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
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">導入までの流れ</h2>
               </div>
               <div className="relative">
                   <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block"></div>
                   <div className="space-y-12">
                       {[
                           { step: "01", title: "ヒアリング・現状分析", text: "現状の業務フローや課題感、使用しているツールなどを詳細にお伺いします。", time: "約2週間〜" },
                           { step: "02", title: "設計・ツール選定", text: "課題解決に最適なフローとツールをご提案します。デモ画面などをお見せしながらイメージを共有します。", time: "約1ヶ月〜" },
                           { step: "03", title: "構築・導入", text: "ツールの初期設定やデータ移行、連携開発などを行います。", time: "1〜3ヶ月" },
                           { step: "04", title: "定着・運用サポート", text: "マニュアル作成、操作説明会の実施、運用開始後のQA対応などを行います。", time: "継続支援" }
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
              <h2 className="text-2xl md:text-4xl font-bold mb-6">まずは「現状の悩み」をお聞かせください。</h2>
              <p className="text-white/80 mb-10 text-base md:text-lg leading-relaxed">
                  「何から手をつければいいか分からない」という段階からのご相談も大歓迎です。<br />
                  御社の課題に合わせた最適なDXプランをご提案します。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <Link href="/contact" className="bg-white text-melon-dark font-bold py-4 px-10 rounded-full hover:bg-melon-dark hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                      <i className="far fa-envelope group-hover:rotate-12 transition-transform"></i> 無料相談・お問い合わせ
                  </Link>
              </div>
          </div>
      </section>

      <StickyBottomNav title="業務設計・DX支援" />
    </main>
  );
}
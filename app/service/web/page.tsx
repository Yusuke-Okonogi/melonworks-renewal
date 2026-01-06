import { client } from "@/libs/client";
import Link from "next/link";
import StickyBottomNav from "@/components/StickyBottomNav";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webサイト制作",
  description: "「更新しやすさ」と「成果」を両立するWebサイト制作。デザインの美しさだけでなく、運用の手間を最小限に抑え、ビジネスの成長を後押しするサイトを構築します。",
  openGraph: {
    title: "Webサイト制作 | Melon Works",
    description: "「更新しやすさ」と「成果」を両立するWebサイト制作。デザインの美しさだけでなく、運用の手間を最小限に抑え、ビジネスの成長を後押しするサイトを構築します。",
  },
};

// --- データ取得: Web制作関連の記事を取得 ---
async function getWebArticles() {
  try {
    const data = await client.get({
      endpoint: "article",
      queries: {
        // タグに「Web制作」「デザイン」「集客」「SEO」などを含む記事を取得
        filters: "solution_tags[contains]Web制作[or]solution_tags[contains]ECサイト構築[or]solution_tags[contains]SNS運用[or]problem_tags[contains]集客",
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
  const webArticles = await getWebArticles();

  // Web制作に関連するタグ定義
  const relatedProblemTags = [
      "集客できない", "売上が伸び悩んでいる", "デザインが古い", 
      "スマホ対応していない", "更新が面倒・できない", "採用応募が来ない"
  ];
  const relatedSolutionTags = [
      "Webサイト制作", "SEO対策", "UI/UXデザイン", 
      "CMS導入(WordPress等)", "レスポンシブ対応", "採用サイト制作"
  ];

  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
    {/* ★共通ヘッダーを使用 */}
      <PageHeader 
        titleEn="BUSINESS DESIGN & DX"
        titleJp="WEBサイト制作"
        breadcrumbs={[
            { name: "SERVICE", path: "/service" },
            { name: "WEBサイト制作" }
        ]}
      />

      {/* FV Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#FAFAFA]">
          <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-melon-light/10 to-transparent pointer-events-none"></div>
          <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-melon-light/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
          
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                  <div className="w-full md:w-1/2">
                      <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-4 block">WEB CREATIVE</span>
                      <h1 className="text-3xl md:text-5xl font-bold text-[#264653] leading-tight mb-6">
                          ただ作るだけじゃない。<br />
                          <span className="relative inline-block">
                            成果を生み出し、
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-melon-light/40 -z-10"></span>
                          </span>
                          <br />
                          運用しやすいWebを。
                      </h1>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
                          コーポレートサイト、採用サイト、LPなど。<br />
                          デザインの美しさはもちろん、「更新のしやすさ」や「SEO（検索対策）」<br />
                          まで考慮した、ビジネスの成長につながるWebサイトを構築します。
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
                      Webサイトは<br className="md:hidden"/>「作って終わり」ではありません。<br />
                      公開してからがスタートです。
                  </h2>
                  <p className="text-gray-500 leading-loose text-sm md:text-base">
                      「おしゃれなサイトを作ったけれど、誰も見てくれない」<br />
                      「ちょっとした修正も制作会社に頼まないといけない」<br /><br />
                      そんなお悩みをよく耳にします。<br />
                      私たちは、公開後の運用フローまで見据え、お客様自身で簡単に更新できる仕組み（CMS）や、<br />
                      <strong>ユーザーが迷わず目的を達成できる設計（UI/UX）</strong>を大切にしています。
                  </p>
              </div>
          </div>
      </section>

      {/* ISSUES & SOLUTIONS */}
      <section className="py-24 bg-white relative overflow-hidden border-y border-gray-50">
           <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-melon-light/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"></div>

           <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
               <div className="text-center mb-12">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">ISSUES & SOLUTIONS</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653] mb-4">課題と解決策</h2>
                   <p className="text-gray-500 text-sm">Webサイトに関するこんなお悩み、解決します。</p>
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
                           {relatedProblemTags.map((tag, i) => (
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
                           {relatedSolutionTags.map((tag, i) => (
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
                   <Link href="/search?tag=Web制作" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-600 px-8 py-3 rounded-full hover:border-melon-dark hover:text-melon-dark transition-all font-bold text-sm">
                       もっと見る <i className="fas fa-arrow-right"></i>
                   </Link>
               </div>
          </div>
      </section>

      {/* Flow */}
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
                           { step: "01", title: "ヒアリング・要件定義", text: "サイトの目的、ターゲット、競合、必要な機能などを整理し、サイトマップを作成します。", time: "1〜2週間" },
                           { step: "02", title: "構成・デザイン", text: "ワイヤーフレーム（設計図）で骨組みを固めてから、具体的なデザインカンプを作成します。", time: "2〜4週間" },
                           { step: "03", title: "構築（コーディング）", text: "デザインを元にWebブラウザで見られるようにプログラミングします。CMSの実装も行います。", time: "3〜6週間" },
                           { step: "04", title: "公開・運用レクチャー", text: "サーバーへアップロードして公開。記事の更新方法などのレクチャーも実施します。", time: "1週間〜" }
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

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#264653] to-[#2A9D8F] text-white py-24 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">Webサイトでビジネスを加速させませんか？</h2>
              <p className="text-white/80 mb-10 text-base md:text-lg leading-relaxed">
                  新規制作はもちろん、リニューアルや部分的な改修も承っております。<br />
                  「今のサイトの課題を知りたい」といった診断依頼もお気軽にどうぞ。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <Link href="#" className="bg-white text-melon-dark font-bold py-4 px-10 rounded-full hover:bg-melon-dark hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                      <i className="far fa-envelope group-hover:rotate-12 transition-transform"></i> 無料相談・お問い合わせ
                  </Link>
              </div>
          </div>
      </section>

      <StickyBottomNav title="Webサイト制作" />
    </main>
  );
}
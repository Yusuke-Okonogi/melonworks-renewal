import { client } from "@/libs/client";
import Link from "next/link";
import StickyBottomNav from "@/components/StickyBottomNav";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "業務設計・DX支援",
  description: "ツールを入れる前に、業務を整える。IT担当がいない現場向けの業務設計・DX支援。Excel改善からSaaS導入、定着支援まで伴走します。",
  openGraph: {
    title: "業務設計・DX支援 | Melon Works",
    description: "ツールを入れる前に、業務を整える。IT担当がいない現場向けの業務設計・DX支援。Excel改善からSaaS導入、定着支援まで伴走します。",
  },
};

// --- データ取得関数 ---

// 1. DX関連の記事を取得
async function getDxArticles() {
  try {
    const data = await client.get({
      endpoint: "article",
      queries: {
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

export default async function DxServicePage() {
  // 記事とタグを並行取得
  const [dxArticles, allTags] = await Promise.all([
      getDxArticles(),
      getTags()
  ]);

  // タグの自動抽出ロジック
  const relatedProblemTags = allTags
      .filter((t: any) => t.type?.includes("problem") && t.related_services?.includes("dx"))
      .map((t: any) => t.name);

  const relatedSolutionTags = allTags
      .filter((t: any) => t.type?.includes("solution") && t.related_services?.includes("dx"))
      .map((t: any) => t.name);

  // サービス詳細データ
  const serviceDetails = [
      { title: "業務整理・業務設計", icon: "fas fa-tasks", desc: "業務フローの可視化／無駄・重複・属人化ポイントの洗い出し／「誰でも回せる」業務構造に再設計", note: "DXの土台づくり。ここをやらないと全部失敗します。" },
      { title: "データ一元管理", icon: "fas fa-database", desc: "Excel・紙・複数ツールに散らばったデータの統合／「どれが正？」をなくす管理設計／在庫・顧客・注文データの整理", note: "確認作業・転記作業を減らします。" },
      { title: "Excel / スプレッドシート改善", icon: "fas fa-file-excel", desc: "属人化したExcelの整理・再設計／PowerQueryなどを使った自動化／「壊れない・引き継げる」構成に改善", note: "いきなりシステム化しなくても、ここで大きく楽になります。" },
      { title: "SaaS導入支援", icon: "fas fa-cloud-upload-alt", desc: "業務に合うツールの選定／導入設計・初期設定／現場向け運用ルール整備", note: "ツール選定ミスを防ぎます。" },
      { title: "RPA（自動化・効率化）", icon: "fas fa-robot", desc: "定型作業・転記作業の自動化／人がやらなくていい作業を削減／小さく始めて、効果を見ながら拡張", note: "人手不足対策として現実的。" },
      { title: "POS・店舗連携", icon: "fas fa-cash-register", desc: "POSと在庫・受注データの連携／店舗とECのデータ統合／二重入力・手作業を排除", note: "店舗×EC運営の負担を減らします。" },
      { title: "在庫管理システム", icon: "fas fa-boxes", desc: "在庫数が合わない原因の整理／現場運用に合った在庫管理設計／Excel・システムどちらも対応可", note: "「高いシステム」より「合う仕組み」。" },
      { title: "BPO / 伴走型サポート", icon: "fas fa-hands-helping", desc: "IT担当代行・相談役として継続支援／改善途中で止まらせない体制／運用しながらの微調整", note: "社内にIT担当がいなくても問題ありません。" },
  ];

  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
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
                          現場に合わないDXは、<br />
                          <span className="relative inline-block">
                            もうやめましょう。
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-melon-light/40 -z-10"></span>
                          </span>
                      </h1>
                      <p className="text-gray-600 text-sm md:text-base leading-loose mb-8 font-medium">
                          Excel・紙・属人化した業務を無理なく回る形に整理し、<br />
                          定着する仕組みまで一緒につくります。<br />
                          ツールを売るのではなく、<strong>「現場で使われ続ける業務」</strong>を設計します。
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

      {/* ISSUES (こんな課題はありませんか？) */}
      <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
              <div className="text-center mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#264653] mb-6">こんな課題はありませんか？</h2>
                  <div className="inline-block bg-red-50 border border-red-100 rounded-2xl p-8 text-left w-full">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                          {[
                              "現場のやり方と、導入したシステムが噛み合っていない",
                              "IT担当がいないので、ツール導入後に誰も面倒を見られない",
                              "人手不足で、改善に手を付ける余裕がない",
                              "新しいツールを入れても、結局使われなくなる",
                              "Excelでの管理が限界だと感じている",
                              "紙・手作業・口頭連絡をそろそろやめたい",
                              "業務が特定の人に依存していて不安",
                              "在庫数が合わない、確認に時間がかかる"
                          ].map((text, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-bold">
                                  <i className="fas fa-check text-melon-dark mt-1"></i> {text}
                              </li>
                          ))}
                      </ul>
                  </div>
                  <p className="mt-8 text-[#264653] font-bold">ひとつでも当てはまれば、業務設計から見直すべきタイミングです。</p>
              </div>
          </div>
      </section>

      {/* PHILOSOPHY (考え方) */}
      <section className="py-24 bg-[#264653] text-white relative overflow-hidden">
           <div className="absolute -left-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
           <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
               <div className="text-center mb-16">
                   <h2 className="text-2xl md:text-3xl font-bold mb-4">メロンワークスの業務設計・DX支援の考え方</h2>
                   <div className="w-16 h-1 bg-melon mx-auto rounded-full"></div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                       <div className="text-melon-light text-4xl mb-4"><i className="fas fa-tools"></i></div>
                       <h3 className="text-xl font-bold mb-4 text-white">ツールありきにしません</h3>
                       <p className="text-gray-300 text-sm leading-relaxed">
                           いきなりSaaS導入はしません。<br />
                           まずやるのは業務の棚卸しと整理です。
                       </p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                       <div className="text-melon-light text-4xl mb-4"><i className="fas fa-hand-holding-heart"></i></div>
                       <h3 className="text-xl font-bold mb-4 text-white">現場の運用を壊しません</h3>
                       <p className="text-gray-300 text-sm leading-relaxed">
                           「理想論」ではなく、今の人員・スキルで回る形を前提に設計します。
                       </p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                       <div className="text-melon-light text-4xl mb-4"><i className="fas fa-running"></i></div>
                       <h3 className="text-xl font-bold mb-4 text-white">定着までやります</h3>
                       <p className="text-gray-300 text-sm leading-relaxed">
                           設計して終わりではなく、使われるまで・回るまで伴走します。
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

      {/* TAGS (Issues & Solutions) - 記事検索導線として配置 */}
      <section className="py-24 bg-[#FAFAFA] border-y border-gray-100">
           <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
               <div className="text-center mb-10">
                   <h2 className="text-xl font-bold text-[#264653]">関連する記事・事例を探す</h2>
                   <p className="text-gray-500 text-sm mt-2">具体的な課題や解決策から事例を検索できます。</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* 課題タグ */}
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                       <h3 className="font-bold text-gray-400 text-xs mb-4 flex items-center gap-2"><i className="fas fa-exclamation-triangle"></i> 課題から探す</h3>
                       <div className="flex flex-wrap gap-2">
                           {relatedProblemTags.map((tag: string, i: number) => (
                               <Link key={i} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-100 text-gray-600 hover:text-[#E76F51] text-xs font-bold px-3 py-2 rounded-full transition-colors">
                                   {tag}
                               </Link>
                           ))}
                       </div>
                   </div>
                   {/* 解決策タグ */}
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                       <h3 className="font-bold text-gray-400 text-xs mb-4 flex items-center gap-2"><i className="fas fa-lightbulb"></i> 解決策から探す</h3>
                       <div className="flex flex-wrap gap-2">
                           {relatedSolutionTags.map((tag: string, i: number) => (
                               <Link key={i} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-gray-50 hover:bg-melon-light/20 border border-gray-200 hover:border-melon/20 text-gray-600 hover:text-melon-dark text-xs font-bold px-3 py-2 rounded-full transition-colors">
                                   {tag}
                               </Link>
                           ))}
                       </div>
                   </div>
               </div>
           </div>
      </section>

      {/* TARGET (向いている会社) */}
      <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
              <div className="bg-melon-light/10 rounded-3xl p-8 md:p-12 text-center border border-melon/20">
                  <h2 className="text-2xl font-bold text-[#264653] mb-8">このサービスが向いている会社</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                          <i className="fas fa-building text-melon-dark text-xl"></i>
                          <span className="font-bold text-[#264653] text-sm">中小企業・小規模チーム</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                          <i className="fas fa-user-slash text-melon-dark text-xl"></i>
                          <span className="font-bold text-[#264653] text-sm">IT担当がいない、または兼任</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                          <i className="fas fa-users-cog text-melon-dark text-xl"></i>
                          <span className="font-bold text-[#264653] text-sm">現場主導で業務が回っている</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                          <i className="fas fa-history text-melon-dark text-xl"></i>
                          <span className="font-bold text-[#264653] text-sm">DXに失敗した経験がある</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* FLOW */}
      <section className="py-24 bg-[#FAFAFA] relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
               <div className="text-center mb-16">
                   <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">FLOW</span>
                   <h2 className="text-2xl md:text-3xl font-bold text-[#264653]">進め方</h2>
                   <p className="text-gray-500 text-sm mt-3">必要なところだけ、必要な分だけやります。</p>
               </div>
               <div className="relative">
                   <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block"></div>
                   <div className="space-y-8">
                       {[
                           { step: "01", title: "現状ヒアリング・業務把握", text: "まずは現場のお話を聞かせてください。何がボトルネックかを探ります。" },
                           { step: "02", title: "課題整理・改善方針の設計", text: "ツールを入れる前に、業務フローそのものを整理します。" },
                           { step: "03", title: "Excel改善 or ツール導入", text: "無理のない範囲で、Excelの改修やSaaSツールの導入を行います。" },
                           { step: "04", title: "定着支援・運用サポート", text: "現場で実際に使われるようになるまで、伴走してサポートします。" }
                       ].map((flow, i) => (
                           <div key={i} className="flex flex-col md:flex-row items-center gap-6 md:gap-0 relative bg-white md:bg-transparent p-6 md:p-0 rounded-2xl shadow-sm md:shadow-none border md:border-none border-gray-100">
                               <div className="w-full md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                                   <h3 className="text-lg font-bold text-[#264653] mb-2">{flow.title}</h3>
                                   <p className="text-sm text-gray-500">{flow.text}</p>
                               </div>
                               <div className="w-10 h-10 bg-melon-dark text-white rounded-full flex items-center justify-center font-bold relative z-10 shadow-md shrink-0 order-1 md:order-2 text-sm">{flow.step}</div>
                               <div className="w-full md:w-1/2 md:pl-12 order-3 md:order-3 hidden md:block"></div>
                           </div>
                       ))}
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

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#264653] to-[#2A9D8F] text-white py-24 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">DXは「導入」ではなく「定着」がゴールです。</h2>
              <p className="text-white/80 mb-10 text-base md:text-lg leading-relaxed">
                  ツールが使われない、現場が混乱する、結局元に戻る。<br />
                  そんなDXを、これ以上増やしません。
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
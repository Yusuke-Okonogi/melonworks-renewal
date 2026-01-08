import { client } from "@/libs/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import StickyBottomNav from "@/components/StickyBottomNav";

export const revalidate = 0;

// ▼▼▼ サービス定義 (他ページと共通化) ▼▼▼
const serviceItems = [
    { id: "dx", name: "業務設計・DX支援", path: "/service/dx" },
    { id: "web", name: "Webサイト制作", path: "/service/web" },
    { id: "ec", name: "ECサイト構築・運用", path: "/service/ec" },
    { id: "design", name: "デザイン制作", path: "/service/design" },
];

// ▼▼▼ データ取得関数 ▼▼▼

// 1. 記事詳細を取得
async function getArticle(id: string) {
  try {
    const data = await client.get({ endpoint: "article", contentId: id, customRequestInit: { cache: "no-store" } });
    return data;
  } catch (error) { return null; }
}

// 2. 最新記事を取得
async function getLatestArticles() {
  try {
    const data = await client.get({ endpoint: "article", queries: { limit: 5, orders: "-publishedAt" } });
    return data.contents;
  } catch (error) { return []; }
}

// 3. 全タグ情報を取得 (サービス判定用)
async function getTags() {
  try {
    const data = await client.get({ endpoint: "tags", queries: { limit: 100 } });
    return data.contents;
  } catch (e) { return []; }
}

// --- ヘルパー関数 ---
const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, '.');
};

// タグ名を取り出す関数（オブジェクト/文字列両対応）
const getTagName = (tag: any) => {
  if (!tag) return "";
  if (typeof tag === "string") return tag;
  return tag.name || tag.tag || tag.label || "";
};

// ★修正: カテゴリ名決定ロジック (タグからサービスを逆引き)
const getDisplayCategory = (article: any, allTags: any[]) => {
    // 1. もしmicroCMSで「カテゴリ」が設定されていればそれを最優先
    if (article.category) {
        if (Array.isArray(article.category)) return article.category[0]?.name || "お知らせ";
        if (typeof article.category === 'object') return article.category.name || "お知らせ";
    }

    // 2. カテゴリがない場合、記事のタグ(problem_tags / solution_tags)を見てサービスを推定
    const articleTags = [
        ...(article.problem_tags || []),
        ...(article.solution_tags || [])
    ];

    // 記事についているタグの名前リスト
    const articleTagNames = articleTags.map(t => getTagName(t));

    // APIから取得した全タグ情報を使って、マッチングするサービスを探す
    for (const tagName of articleTagNames) {
        const tagData = allTags.find((t: any) => t.name === tagName);
        if (tagData && tagData.related_services && tagData.related_services.length > 0) {
            // タグに関連付けられたサービスID (dx, web, ec...) を取得
            const serviceId = tagData.related_services[0]; 
            // サービスIDから日本語名を取得
            const service = serviceItems.find(s => s.id === serviceId);
            if (service) return service.name;
        }
    }

    // 3. それでも見つからなければデフォルト
    return "お知らせ";
};


export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 記事、最新記事、全タグを並行取得
  const [article, latestArticles, allTags] = await Promise.all([
      getArticle(id), 
      getLatestArticles(), 
      getTags()
  ]);

  if (!article) notFound();

  const mainImage = article.thumnail || article.thumbnail || article.image || article.eyecatch;
  const imageUrl = mainImage?.url || "https://placehold.jp/eeeeee/999999/600x600.png?text=No+Image";

  const pubDateStr = article.published_at || article.publishedAt;
  const revDateStr = article.renewed_at || article.updatedAt;
  const displayDate = formatDate(revDateStr) || formatDate(pubDateStr);
  const isRenewed = !!(revDateStr && formatDate(revDateStr) !== formatDate(pubDateStr));

  const currentPTags = article.problem_tags || [];
  const currentSTags = article.solution_tags || [];
  
  // ★修正: カテゴリ名を自動判定ロジックで取得
  const currentCategoryName = getDisplayCategory(article, allTags);
  
  // サービスIDの逆引き (検索ページへのリンク用)
  const currentServiceItem = serviceItems.find(s => s.name === currentCategoryName);
  
  // 検索ページで使用するタグリスト生成（サイドバー用）
  const searchProblemTags = allTags.filter((t: any) => t.type?.includes("problem")).map((t: any) => t.name);
  const searchSolutionTags = allTags.filter((t: any) => t.type?.includes("solution")).map((t: any) => t.name);

  return (
    <main className="bg-[#F9FAFB] min-h-screen pt-14 md:pt-16 pb-20">
      
      {/* パンくず */}
      <div className="bg-white border-b border-gray-100 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl py-4 md:py-6 relative z-10">
             <nav className="flex items-center text-[10px] md:text-xs text-gray-400 font-en gap-2">
                <Link href="/" className="hover:text-melon-dark transition-colors flex items-center gap-1"><i className="fas fa-home"></i></Link>
                <span className="text-gray-300"><i className="fas fa-chevron-right"></i></span>
                <Link href="/articles" className="hover:text-melon-dark transition-colors">ARTICLES</Link>
                <span className="text-gray-300"><i className="fas fa-chevron-right"></i></span>
                <span className="text-melon-dark font-bold truncate max-w-[200px]">{article.title}</span>
            </nav>
          </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* ▼ メインカラム ▼ */}
            <article className="w-full lg:w-3/4 bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden relative z-10">
                
                {/* 記事ヘッダー */}
                <div className="p-6 md:p-8 border-b border-gray-100">
                    <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-start">
                        
                        <div className="w-full md:w-[240px] flex-shrink-0">
                            <div className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="flex-grow w-full">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {/* ★修正: 自動判定されたカテゴリ名を表示 */}
                                <Link 
                                    href={currentServiceItem ? currentServiceItem.path : "/articles"} 
                                    className="bg-melon-light text-melon-dark text-[10px] font-bold px-2.5 py-1 rounded-full hover:bg-melon hover:text-white transition-colors"
                                >
                                    {currentCategoryName}
                                </Link>
                                <div className="text-xs text-gray-500 font-en flex items-center gap-1.5">
                                    <i className={`far ${isRenewed ? 'fa-check-circle text-melon-dark' : 'fa-clock'}`}></i>
                                    {displayDate}
                                    {isRenewed && <span className="text-[10px] text-melon-dark font-bold">更新</span>}
                                </div>
                            </div>

                            <h1 className="text-xl md:text-2xl font-bold text-[#264653] leading-tight mb-4 md:mb-5">
                                {article.title}
                            </h1>

                            {/* タグ一覧 */}
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(currentPTags) && currentPTags.map((tag: any, i: number) => (
                                    <Link key={`p-${i}`} href={`/search?tag=${encodeURIComponent(getTagName(tag))}`} className="text-[#E76F51] border border-red-100 bg-red-50 text-[10px] font-bold px-2 py-1 rounded-md hover:bg-[#E76F51] hover:text-white transition-colors">
                                        #{getTagName(tag)}
                                    </Link>
                                ))}
                                {Array.isArray(currentSTags) && currentSTags.map((tag: any, i: number) => (
                                    <Link key={`s-${i}`} href={`/search?tag=${encodeURIComponent(getTagName(tag))}`} className="text-[#264653] border border-melon/20 bg-melon-light/30 text-[10px] font-bold px-2 py-1 rounded-md hover:bg-melon-dark hover:text-white transition-colors">
                                        #{getTagName(tag)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 本文エリア */}
                <div className="p-6 md:p-8">
                    <div 
                        className="
                            text-[#264653] leading-relaxed text-sm md:text-base
                            [&>h2]:text-lg md:[&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-5 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-gray-200
                            [&>h3]:text-base md:[&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:pl-3 [&>h3]:border-l-4 [&>h3]:border-melon-dark
                            [&>p]:mb-6 [&>p]:leading-7 [&>p]:text-gray-600
                            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul]:space-y-1 [&>ul]:text-gray-600
                            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>ol]:space-y-1 [&>ol]:text-gray-600
                            [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:italic [&>blockquote]:text-gray-500 [&>blockquote]:mb-6 [&>blockquote]:bg-gray-50
                            [&>img]:rounded-lg [&>img]:shadow-sm [&>img]:my-6 [&>img]:w-full [&>img]:border [&>img]:border-gray-100
                            [&>a]:text-melon-dark [&>a]:underline [&>a]:font-bold hover:[&>a]:text-melon hover:[&>a]:no-underline
                        "
                        dangerouslySetInnerHTML={{ __html: article.content || article.body || "<p>記事本文がありません。</p>" }} 
                    />
                </div>

                <div className="p-6 md:p-8 border-t border-gray-100 text-center">
                    <Link href="/articles" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-600 px-6 py-2.5 rounded-full hover:border-melon-dark hover:text-melon-dark hover:bg-melon-dark hover:text-white transition-all group shadow-sm text-xs md:text-sm font-bold">
                        <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
                        記事一覧に戻る
                    </Link>
                </div>
            </article>

            {/* サイドバー */}
            <aside className="w-full lg:w-1/4 flex flex-col gap-10 sticky top-24">
                {/* 人気記事 */}
                <div>
                    <h3 className="font-bold text-[#264653] border-b-2 border-melon/20 pb-2 mb-4 text-sm flex items-center gap-2">人気記事</h3>
                    <div className="space-y-5">
                        {latestArticles.map((item: any, index: number) => (
                            <Link key={item.id} href={`/article/${item.id}`} className="group flex gap-3 items-start">
                                <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 text-[#264653] font-en font-bold text-[10px] rounded group-hover:bg-melon-dark group-hover:text-white group-hover:border-melon-dark transition-colors shadow-sm">{index + 1}</span>
                                <div><h4 className="text-xs font-bold leading-relaxed text-gray-600 group-hover:text-melon-dark transition-colors line-clamp-3">{item.title}</h4><time className="text-[10px] text-gray-400 font-en mt-1 block">{formatDate(item.published_at || item.publishedAt)}</time></div>
                            </Link>
                        ))}
                    </div>
                </div>
                
                {/* サービス (固定リストを使用) */}
                <div>
                    <h3 className="font-bold text-[#264653] border-b-2 border-melon/20 pb-2 mb-4 text-sm flex items-center gap-2">サービス</h3>
                    <div className="flex flex-wrap gap-2">
                        {serviceItems.map((service, i) => (
                            <Link key={i} href={service.path} className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-melon-light hover:text-melon-dark hover:border-melon-light transition-colors shadow-sm">
                                {service.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 課題から探す (★修正: APIから取得したタグを表示) */}
                <div>
                    <h3 className="font-bold text-[#264653] border-b-2 border-melon/20 pb-2 mb-4 text-sm flex items-center gap-2">課題から探す</h3>
                    <div className="flex flex-wrap gap-2">
                        {searchProblemTags.map((tag: any, i: number) => (
                            <Link key={i} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-white border border-red-100 text-[#E76F51] text-[10px] font-bold px-3 py-1.5 rounded shadow-sm hover:bg-red-50 transition-colors">
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
                
                {/* 解決策から探す (★修正: APIから取得したタグを表示) */}
                <div>
                    <h3 className="font-bold text-[#264653] border-b-2 border-melon/20 pb-2 mb-4 text-sm flex items-center gap-2">解決策から探す</h3>
                    <div className="flex flex-wrap gap-2">
                        {searchSolutionTags.map((tag: any, i: number) => (
                            <Link key={i} href={`/search?tag=${encodeURIComponent(tag)}`} className="bg-white border border-melon/20 text-melon-dark text-[10px] font-bold px-3 py-1.5 rounded shadow-sm hover:bg-melon-light transition-colors">
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
                
                {/* バナー */}
                <div className="bg-gradient-to-br from-[#264653] to-[#2A9D8F] rounded-xl p-6 text-white text-center shadow-lg mt-4">
                    <p className="text-xs font-bold mb-3 opacity-90">お困りごとはありませんか？</p>
                    <Link href="/contact" className="block bg-white text-melon-dark text-xs font-bold py-3 rounded-full hover:shadow-md transition-shadow">無料相談はこちら</Link>
                </div>
            </aside>

        </div>
      </div>
      <StickyBottomNav title={article.title} category={{ name: currentCategoryName }} />
    </main>
  );
}
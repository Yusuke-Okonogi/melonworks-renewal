import { client } from "@/libs/client";
import Link from "next/link";
import StickyBottomNav from "@/components/StickyBottomNav";

export const revalidate = 0;

// --- データ取得 ---
async function getAllArticles() {
  try {
    const data = await client.get({
      endpoint: "article",
      queries: {
        limit: 100,
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

// --- メインコンポーネント ---
export default async function ArticlesPage() {
  const articles = await getAllArticles();
  const PAGE_TITLE = "記事一覧";

  return (
    // ★修正: pt-20 md:pt-24 (または pt-16 md:pt-20) -> pt-14 md:pt-16 に変更
    <main className="bg-[#F9FAFB] min-h-screen pt-14 md:pt-16 pb-20">

      {/* ページ上部パンくず */}
      <div className="bg-white border-b border-gray-100 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl py-4 md:py-6 relative z-10">
             <nav className="flex items-center text-[10px] md:text-xs text-gray-400 font-en gap-2">
                <Link href="/" className="hover:text-melon-dark transition-colors flex items-center gap-1">
                    <i className="fas fa-home"></i> HOME
                </Link>
                <span className="text-gray-300"><i className="fas fa-chevron-right"></i></span>
                <span className="text-melon-dark font-bold">{PAGE_TITLE}</span>
            </nav>
          </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-12">
        
        {/* ヘッダー */}
        <div className="text-center mb-12">
            <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-3 block">ARCHIVES</span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#264653]">
                {PAGE_TITLE}
            </h1>
            <p className="text-gray-400 mt-2 text-sm font-en">
                All Articles
            </p>
        </div>

        {/* 記事一覧グリッド */}
        {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article: any) => {
                    const pTags = article.problem_tags ? (Array.isArray(article.problem_tags) ? article.problem_tags : [article.problem_tags]) : [];
                    const sTags = article.solution_tags ? (Array.isArray(article.solution_tags) ? article.solution_tags : [article.solution_tags]) : [];
                    const currentCategoryName = getCategoryName(article.category);

                    return (
                        <Link key={article.id} href={`/article/${article.id}`} className="group relative overflow-hidden rounded-2xl shadow-soft h-[320px] hover-lift block border border-gray-100 bg-white">
                            <div className="absolute inset-0">
                                <img 
                                    src={article.thumnail?.url || article.thumbnail?.url || article.image?.url || article.eyecatch?.url || "https://placehold.jp/eeeeee/999999/600x400.png?text=No+Image"} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#264653]/95 via-[#264653]/40 to-transparent"></div>
                            </div>
                            
                            <div className="absolute top-4 left-4 z-20">
                                <span className="bg-white/95 backdrop-blur-sm text-[#264653] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                                    {currentCategoryName}
                                </span>
                            </div>

                            <div className="absolute bottom-0 p-6 text-white z-10 w-full">
                                <div className="mb-2">
                                    <time className="text-xs text-gray-300 font-en">
                                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                                    </time>
                                </div>
                                <h3 className="font-bold text-lg leading-snug mb-3 group-hover:text-melon-light transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                
                                <div className="flex flex-wrap gap-1.5">
                                    {pTags.map((t: any, i: number) => (
                                        <span key={`p-${i}`} className="bg-white text-[#E76F51] text-[9px] font-bold px-2 py-0.5 rounded shadow-sm border border-red-100">
                                            {getTagName(t)}
                                        </span>
                                    ))}
                                    {sTags.map((t: any, i: number) => (
                                        <span key={`s-${i}`} className="bg-white text-melon-dark text-[9px] font-bold px-2 py-0.5 rounded shadow-sm border border-melon/20">
                                            {getTagName(t)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        ) : (
            <div className="text-center py-20 text-gray-500">
                <p>記事が見つかりませんでした。</p>
                <div className="mt-8">
                    <Link href="/" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-600 px-6 py-2.5 rounded-full hover:border-melon-dark hover:text-melon-dark transition-all">
                        トップページに戻る
                    </Link>
                </div>
            </div>
        )}
      </div>

      <StickyBottomNav title={PAGE_TITLE} />

    </main>
  );
}
import { client } from "@/libs/client";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import StickyBottomNav from "@/components/StickyBottomNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "検索結果",
  description: "記事の検索結果一覧です。",
};

// ▼▼▼ サービス定義 (固定情報のみ定義し、タグはAPIからマッチング) ▼▼▼
// ※keywords配列は削除しました。代わりにid (dx, web, ec, design) でマッチングします
const serviceItems = [
    {
        id: "dx", // APIの related_services の値と合わせる
        icon: "fas fa-shapes",
        title: "業務設計・DX支援",
        desc: "業務の流れや情報の分断を整理し、現場に無理のない仕組みを設計します。",
        href: "/service/dx"
    },
    {
        id: "web",
        icon: "fas fa-laptop-code",
        title: "Webサイト制作",
        desc: "更新しやすく、成果が出るWebサイトを。デザインからCMS構築まで対応します。",
        href: "/service/web"
    },
    {
        id: "ec",
        icon: "fas fa-store",
        title: "ECサイト構築・運用",
        desc: "Shopifyを用いた売れるECサイトの構築と、日々のバックヤード業務をサポート。",
        href: "/service/ec"
    },
    {
        id: "design",
        icon: "fas fa-palette",
        title: "デザイン制作",
        desc: "ロゴ、名刺、パンフレットなど、Webと紙を一貫させたブランディングを提供します。",
        href: "/service/design"
    }
];

// ▼▼▼ データ取得関数 ▼▼▼

// 1. タグ一覧を取得
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

// 2. 記事を取得
async function getSearchArticles(tag?: string, categoryId?: string) {
    const queries: any = { limit: 100, orders: "-publishedAt" };

    if (tag) {
        // microCMSの参照フィールド(tags)に対して「中身のコンテンツ(name)」でフィルタリングするのは難しいため、
        // 厳密には「タグID」で検索するのがベストですが、
        // ここでは簡易的に従来の「文字列が含まれるか」または「タグ名そのもの」で検索するロジックを想定しています。
        // ※記事側のproblem_tags/solution_tagsが「テキストエリア」の場合はこのままでOK。
        // ※「コンテンツ参照」に変更した場合は、filtersの書き方が変わりますが、
        //   一旦ヘルパー関数(getTagName)で吸収する前提の表示ロジックにしています。
        //   （厳密なフィルタリングにはタグID検索の実装推奨）
        
        // とりあえずテキストマッチとして検索
        queries.q = tag; // 全文検索機能を利用するのが一番手っ取り早い
    } else if (categoryId) {
        queries.filters = `category[equals]${categoryId}`;
    }

    try {
        const data = await client.get({ endpoint: "article", queries });
        return data.contents;
    } catch (e) {
        return [];
    }
}

// ヘルパー関数
const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};
const getTagName = (tag: any) => (typeof tag === "string" ? tag : tag.name || tag.tag || "");
const getCategoryName = (cat: any) => {
    if (!cat) return "お知らせ";
    if (Array.isArray(cat)) return cat[0] ? (cat[0].name || cat[0]) : "お知らせ";
    if (typeof cat === 'object') return cat.name || "お知らせ";
    return cat;
};

export default async function SearchPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ tag?: string, categoryId?: string, categoryName?: string }> 
}) {
    const { tag, categoryId, categoryName } = await searchParams;
    
    // 記事とタグ一覧を並行取得
    const [articles, allTags] = await Promise.all([
        getSearchArticles(tag, categoryId),
        getTags()
    ]);
    
    // ページタイトル決定
    const searchTitle = tag ? `#${tag}` : (categoryName || "記事一覧");

    // ★関連サービスの抽出ロジック（修正版）
    // APIから取得したタグ情報(allTags)の中に、今回検索された「tag」と一致するものがあるか探し、
    // そのタグが持っている「related_services」の情報を使ってサービスを表示する。
    
    let relatedServices: any[] = [];

    if (tag) {
        // 1. 検索タグと名前が一致するタグデータをAPI取得結果から探す
        const matchedTagData = allTags.find((t: any) => t.name === tag);

        if (matchedTagData && matchedTagData.related_services) {
            // 2. 一致したタグが「関連サービス」情報を持っていれば、それに基づきサービスを抽出
            // matchedTagData.related_services は ["dx", "ec"] のような配列を想定
            relatedServices = serviceItems.filter(s => matchedTagData.related_services.includes(s.id));
        } else {
            // 3. (フォールバック) タグデータが見つからない、または関連サービス設定がない場合
            // 念のためサービスタイトルにタグが含まれるかだけチェック
            relatedServices = serviceItems.filter(s => s.title.includes(tag));
        }
    }

    return (
        <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
            <PageHeader 
                titleEn="SEARCH"
                titleJp="検索結果"
                breadcrumbs={[{ name: searchTitle }]}
            />

            <section className="py-16 md:py-24 bg-[#FAFAFA]">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    
                    <div className="mb-12">
                        <h2 className="text-xl md:text-2xl font-bold text-[#264653] flex items-center gap-3">
                            <span className="text-melon-dark"><i className="fas fa-search"></i></span>
                            「{searchTitle}」の検索結果
                        </h2>
                    </div>

                    {/* 1. 関連サービスがある場合のみ表示 */}
                    {relatedServices.length > 0 && (
                        <div className="mb-20 animate-fade-in-up">
                            <div className="flex items-center gap-2 mb-6 opacity-80">
                                <i className="fas fa-lightbulb text-melon-dark text-xl"></i>
                                <span className="font-bold text-[#264653]">おすすめの解決策（サービス）</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedServices.map((s) => (
                                    <Link key={s.id} href={s.href} className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex items-start gap-4">
                                        <div className="w-12 h-12 bg-melon-light/20 rounded-xl flex items-center justify-center text-melon-dark text-xl shrink-0 group-hover:bg-melon-dark group-hover:text-white transition-colors">
                                            <i className={s.icon}></i>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-[#264653] mb-2 group-hover:text-melon-dark transition-colors">{s.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                                            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-melon-dark group-hover:underline">
                                                詳細を見る <i className="fas fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 2. 記事一覧表示 */}
                    <div>
                        {relatedServices.length > 0 && <hr className="border-gray-200 mb-12 border-dashed" />}
                        
                        {articles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {articles.map((article: any) => {
                                    const pTags = article.problem_tags ? (Array.isArray(article.problem_tags) ? article.problem_tags : [article.problem_tags]) : [];
                                    const sTags = article.solution_tags ? (Array.isArray(article.solution_tags) ? article.solution_tags : [article.solution_tags]) : [];
                                    const categoryName = getCategoryName(article.category);
                                    
                                    return (
                                        <div key={article.id} className="group relative overflow-hidden rounded-2xl shadow-soft h-[320px] hover-lift block bg-white">
                                            <Link href={`/article/${article.id}`} className="absolute inset-0 z-0 block" />
                                            
                                            {/* サムネイル */}
                                            <div className="absolute inset-0 pointer-events-none">
                                                <img 
                                                  src={article.thumnail?.url || article.thumbnail?.url || article.image?.url || "https://placehold.jp/eeeeee/999999/600x400.png?text=No+Image"} 
                                                  alt={article.title} 
                                                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#264653] via-[#264653]/40 to-transparent"></div>
                                            </div>

                                            {/* カテゴリラベル */}
                                            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                                                <span className="bg-white text-[#264653] text-xs font-bold px-3 py-1 rounded-full shadow-sm">{categoryName}</span>
                                            </div>

                                            {/* 記事情報 */}
                                            <div className="absolute bottom-0 p-6 z-10 w-full pointer-events-none">
                                                <time className="text-white text-xs font-en block mb-2 font-medium opacity-90 drop-shadow-sm">{formatDate(article.publishedAt || article.createdAt)}</time>
                                                <h3 className="font-bold text-lg leading-snug mb-3 text-white drop-shadow-md line-clamp-2">{article.title}</h3>
                                                
                                                {/* タグ一覧 */}
                                                <div className="flex flex-wrap gap-2 pointer-events-auto">
                                                    {pTags.map((tag: any, i: number) => (
                                                        <Link key={`p-${i}`} href={`/search?tag=${encodeURIComponent(getTagName(tag))}`} className="bg-white text-[#E76F51] text-xs font-bold px-2.5 py-1 rounded shadow-sm border border-red-100 hover:shadow-md transition-all relative z-20">
                                                            {getTagName(tag)}
                                                        </Link>
                                                    ))}
                                                    {sTags.map((tag: any, i: number) => (
                                                        <Link key={`s-${i}`} href={`/search?tag=${encodeURIComponent(getTagName(tag))}`} className="bg-white text-melon-dark text-xs font-bold px-2.5 py-1 rounded shadow-sm border border-melon/20 hover:shadow-md transition-all relative z-20">
                                                            {getTagName(tag)}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <div className="text-6xl text-gray-200 mb-4"><i className="far fa-folder-open"></i></div>
                                <p className="text-gray-500 font-bold">該当する記事が見つかりませんでした。</p>
                                <p className="text-gray-400 text-sm mt-2">別のキーワードやカテゴリをお試しください。</p>
                                <div className="mt-8">
                                    <Link href="/" className="inline-block bg-melon-dark text-white px-8 py-3 rounded-full font-bold hover:bg-[#264653] transition-colors">
                                        トップページへ戻る
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </section>
            
            <StickyBottomNav title="検索結果" />
        </main>
    );
}
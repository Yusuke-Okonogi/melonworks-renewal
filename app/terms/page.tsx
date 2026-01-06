import PageHeader from "@/components/PageHeader";
import StickyBottomNav from "@/components/StickyBottomNav";

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
      {/* 共通ヘッダー */}
      <PageHeader
        titleEn="TERMS OF USE"
        titleJp="利用規約"
        breadcrumbs={[{ name: "TERMS OF USE" }]}
      />

      <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              
              <div className="prose max-w-none text-gray-600 leading-relaxed space-y-8">
                    <p>本利用規約（以下「本規約」）は、メロンワークス合同会社（以下「当社」）が運営するウェブサイト（以下「本サイト」）の利用条件を定めるものです。本サイトをご利用いただくことで、本規約に同意したものとみなします。</p>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">第1条（適用範囲）</h3>
                        <p>本規約は、本サイトの閲覧、利用、お問い合わせ等、本サイトに関連する一切の行為に適用されます。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">第2条（禁止事項）</h3>
                        <p>本サイトの利用にあたり、以下の行為を禁止します。</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>法令または公序良俗に反する行為</li>
                            <li>本サイトの運営を妨害する行為</li>
                            <li>当社または第三者の権利・利益を侵害する行為</li>
                            <li>本サイトの内容を無断で転載、複製、改変、再配布する行為</li>
                            <li>自動取得ツール等を用いたスクレイピング、クローリング行為</li>
                            <li>その他、当社が不適切と判断する行為</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">第3条（知的財産権）</h3>
                        <p>本サイトに掲載されている文章、画像、デザイン、図表、ノウハウその他一切のコンテンツに関する著作権および知的財産権は、当社または正当な権利者に帰属します。<br />
                        私的利用の範囲を超えて、無断で利用することを禁止します。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">第4条（免責事項）</h3>
                        <p>当社は、本サイトに掲載する情報の正確性・完全性・有用性について、いかなる保証も行うものではありません。<br />
                        本サイトの利用または利用不能により生じた損害について、当社は一切の責任を負いません。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">第5条（AIに関する取扱い）</h3>
                        <p>本サイトに掲載されているコンテンツについて、当社の許可なく、AIその他の自動生成・学習・解析を目的として利用する行為を禁止します。<br />
                        当社は、業務の効率化および品質向上を目的として、AI等の技術を利用する場合があります。<br />
                        AIの利用により生成された情報や成果物について、その正確性、完全性、特定の目的への適合性を保証するものではありません。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">第6条（規約の変更）</h3>
                        <p>当社は、必要に応じて、本規約の内容を予告なく変更することがあります。変更後の規約は、本サイトに掲載された時点で効力を生じるものとします。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">第7条（準拠法および管轄）</h3>
                        <p>本規約の解釈および適用については、日本法を準拠法とします。<br />
                        本サイトの利用に関して当社と利用者との間で生じた紛争については、当社所在地を管轄する裁判所を専属的合意管轄とします。</p>
                    </div>

                    <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200 mt-12">
                        <h3 className="text-lg font-bold text-[#264653] mb-4">お問い合わせ窓口</h3>
                        <p className="mb-4">本規約に関するお問い合わせは、下記までご連絡ください。</p>
                        <p className="font-bold text-lg mb-1">メロンワークス合同会社</p>
                        <p className="mb-4">〒371-0831<br />群馬県前橋市小相木町327 タカゼンビル203</p>
                        <p className="flex flex-wrap gap-2 items-center">
                            <span>メールアドレス：</span>
                            <a href="mailto:hello@melonworks.me" className="text-melon-dark font-bold underline hover:no-underline">hello@melonworks.me</a>
                        </p>
                    </div>
              </div>

          </div>
      </section>

      <StickyBottomNav title="利用規約" />
    </main>
  );
}
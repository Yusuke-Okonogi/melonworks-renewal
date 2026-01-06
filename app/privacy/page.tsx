import PageHeader from "@/components/PageHeader";
import StickyBottomNav from "@/components/StickyBottomNav";

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
      {/* 共通ヘッダー */}
      <PageHeader
        titleEn="PRIVACY POLICY"
        titleJp="プライバシーポリシー"
        breadcrumbs={[{ name: "PRIVACY POLICY" }]}
      />

      <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              
              <div className="prose max-w-none text-gray-600 leading-relaxed space-y-8">
                    <p>本ウェブサイトは、メロンワークス合同会社（以下「当社」）の事業内容等を紹介するサイトです。</p>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">1. 個人情報に関する基本方針</h3>
                        <p>当社は、個人情報の重要性を認識し、個人情報の保護に関する法律および関連法令を遵守するとともに、適切な取扱いおよび保護に努めます。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">2. 個人情報の管理</h3>
                        <p>当社は、お客様の個人情報を正確かつ最新の状態に保ち、不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、管理体制の整備、社内教育の徹底等の必要な措置を講じ、個人情報の厳重な管理を行います。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">3. 個人情報の利用目的</h3>
                        <p>当社は、お客様から取得した個人情報を、以下の目的の範囲内で利用いたします。</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>お問い合わせへの対応</li>
                            <li>業務上必要なご連絡</li>
                            <li>サービスのご案内、資料の送付</li>
                        </ul>
                        <p className="mt-2">取得した個人情報は、上記目的以外で利用することはありません。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">4. 個人情報の第三者への開示・提供の禁止</h3>
                        <p>当社は、お客様よりお預かりした個人情報を適切に管理し、次の場合を除き、第三者に開示または提供いたしません。</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>お客様の同意がある場合</li>
                            <li>お客様が希望されるサービスを提供するため、業務委託先に必要な範囲で開示する場合</li>
                            <li>法令に基づき開示することが必要である場合</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">5. 個人情報の安全対策</h3>
                        <p>当社は、個人情報の正確性および安全性を確保するため、適切なセキュリティ対策を講じます。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">6. ご本人の照会・修正・削除</h3>
                        <p>お客様ご本人から、個人情報の照会・修正・削除等をご希望された場合には、ご本人であることを確認の上、速やかに対応いたします。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">7. アクセス解析ツールについて</h3>
                        <p>当社は、本ウェブサイトの利用状況を把握し、サービス向上を目的として、Google Analytics 等のアクセス解析ツールを利用する場合があります。<br />
                        これらのツールはトラフィックデータの収集のためにCookieを使用しますが、収集される情報は匿名であり、個人を特定するものではありません。<br />
                        なお、Cookieの使用を望まない場合は、ブラウザの設定により無効にすることが可能です。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">8. 法令、規範の遵守と見直し</h3>
                        <p>当社は、保有する個人情報に関して適用される日本の法令およびその他の規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">9. 免責事項</h3>
                        <p>本ウェブサイトの情報は、無料で提供されています。本サイトを利用したことによって生じたいかなる損害についても、当社は一切の責任を負いません。<br />
                        また、本サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報やサービス等について、当社は一切の責任を負いません。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">10. 著作権</h3>
                        <p>本ウェブサイトに掲載されているすべてのコンテンツ（文章・画像・デザイン等）の著作権は、当社に帰属します。書面による許可なく、私的利用の範囲を超えて使用することを禁止します。</p>
                    </div>

                    <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200 mt-12">
                        <h3 className="text-lg font-bold text-[#264653] mb-4">お問い合わせ窓口</h3>
                        <p className="mb-4">当社の個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。</p>
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

      <StickyBottomNav title="プライバシーポリシー" />
    </main>
  );
}
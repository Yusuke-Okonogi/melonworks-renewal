import PageHeader from "@/components/PageHeader";
import StickyBottomNav from "@/components/StickyBottomNav";

export default function AntisocialPage() {
  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
      {/* 共通ヘッダー */}
      <PageHeader
        titleEn="ANTI-SOCIAL FORCES POLICY"
        titleJp="反社会的勢力に対する基本方針"
        breadcrumbs={[{ name: "ANTI-SOCIAL FORCES POLICY" }]}
      />

      <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              
              <div className="prose max-w-none text-gray-600 leading-relaxed space-y-8">
                    <p>メロンワークス合同会社（以下「当社」）は、社会の秩序や安全に脅威を与える反社会的勢力に対し、以下のとおり基本方針を定め、毅然とした態度で対応します。</p>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">1. 組織としての対応</h3>
                        <p>当社は、反社会的勢力に対して組織全体として対応し、不当要求に対しては、役員および従業員の安全を確保したうえで、断固として拒絶します。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">2. 外部専門機関との連携</h3>
                        <p>当社は、反社会的勢力による不当な要求に備え、平素より警察、暴力追放運動推進センター、弁護士等の外部専門機関と連携し、適切に対応します。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">3. 取引を含めた一切の関係の遮断</h3>
                        <p>当社は、反社会的勢力とは、取引関係を含めて一切の関係を持ちません。また、反社会的勢力による不当要求については、いかなる理由があっても拒絶します。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">4. 不当要求時における法的対応</h3>
                        <p>反社会的勢力による不当要求に対しては、民事および刑事の両面から、法令に基づき厳正に対応します。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">5. 不適切な取引および資金提供の禁止</h3>
                        <p>当社は、反社会的勢力による不当要求が、事業活動上または役員・従業員個人の不祥事を理由とする場合であっても、事案を隠蔽するための不適切な取引や資金提供は一切行いません。</p>
                    </div>

                    <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200 mt-12">
                        <h3 className="text-lg font-bold text-[#264653] mb-4">お問い合わせ窓口</h3>
                        <p className="mb-4">本方針に関するお問い合わせは、下記までご連絡ください。</p>
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

      <StickyBottomNav title="反社会的勢力に対する基本方針" />
    </main>
  );
}
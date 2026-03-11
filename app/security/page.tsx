import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import StickyBottomNav from "@/components/StickyBottomNav";

export const metadata: Metadata = {
  title: "情報セキュリティ基本方針",
  description: "メロンワークスの情報セキュリティ基本方針について記載しています。",
};

export default function SecurityPage() {
  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
      {/* 共通ヘッダー */}
      <PageHeader
        titleEn="INFORMATION SECURITY POLICY"
        titleJp="情報セキュリティ基本方針"
        breadcrumbs={[{ name: "INFORMATION SECURITY POLICY" }]}
      />

      <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              
              <div className="prose max-w-none text-gray-600 leading-relaxed space-y-8">
                    
                    {/* メッセージセクション */}
                    <div className="mb-12">
                        <p className="text-lg md:text-xl font-bold text-melon-dark font-en tracking-widest mb-6">
                            Security is part of our work.
                        </p>
                        <p className="mb-4">
                            メロンワークス合同会社（以下、当社）は、<br className="hidden md:block" />
                            お客様からお預かりした情報および当社が取り扱う情報資産を、事故・災害・不正アクセス・情報漏えいなどの脅威から守ることを重要な責任と考えています。
                        </p>
                        <p className="mb-4">
                            小さなミスが大きなトラブルにつながらないよう、日々の業務の中で丁寧に情報を取り扱い、安全な環境づくりを続けていきます。
                        </p>
                        <p>
                            派手な仕組みよりも、当たり前のことをきちんと続けること。<br className="hidden md:block" />
                            それがメロンワークスの情報セキュリティに対する基本姿勢です。
                        </p>
                        <p className="mt-8 font-bold text-[#264653]">
                            この方針に基づき、当社は以下の取り組みを行います。
                        </p>
                    </div>

                    {/* 各条項 */}
                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">1. 経営者の責任</h3>
                        <p>当社は、経営者の責任のもと、情報セキュリティ対策を継続的に見直し、改善していきます。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">2. ルールと仕組み</h3>
                        <p>当社は、情報を適切に管理するためのルールや仕組みを整備し、日々の業務の中で確実に運用します。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">3. メンバーの意識</h3>
                        <p>当社のメンバー（役員・従業員・業務委託を含む）は、情報セキュリティの重要性を理解し、適切な情報の取り扱いを徹底します。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">4. 法令と約束を守る</h3>
                        <p>当社は、個人情報保護法をはじめとする関連法令を遵守するとともに、お客様との契約で定められた情報管理ルールを守ります。</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-3">5. 万が一のとき</h3>
                        <p>情報セキュリティに関する問題や事故が発生した場合は、迅速に対応し、原因の調査と再発防止に取り組みます。</p>
                    </div>

                    {/* 署名欄 */}
                    <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200 mt-12">
                        <p className="mb-4">2026年3月11日 制定</p>
                        <p className="mb-4">メロンワークス合同会社</p>
                        <p className="mb-4">代表社員 小此木勇介</p>
                    </div>
              </div>

          </div>
      </section>

      <StickyBottomNav title="情報セキュリティ基本方針" />
    </main>
  );
}
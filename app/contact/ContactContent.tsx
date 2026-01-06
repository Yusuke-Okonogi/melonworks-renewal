"use client"; // ★ここはクライアントコンポーネント

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import StickyBottomNav from "@/components/StickyBottomNav";

export default function ContactContent() {
  // スパム対策: 時間計測用
  const startTime = useRef<number>(0);
  
  // 送信状態の管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  // モーダル・同意状態の管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [hasRead, setHasRead] = useState(false);

  useEffect(() => {
    startTime.current = Date.now();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHasRead(true);
    setIsAgreed(true);
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!hasRead) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const elapsedTime = Date.now() - startTime.current;
    if (elapsedTime < 3000) {
      alert("入力時間が短すぎるため、送信できませんでした。");
      return;
    }

    if (!isAgreed) {
      alert("プライバシーポリシーへの同意が必要です。");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.bot_field) {
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSent(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("送信に失敗しました。しばらく経ってから再度お試しください。");
      }
    } catch (error) {
      alert("エラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
        <PageHeader titleEn="CONTACT" titleJp="お問い合わせ" breadcrumbs={[{ name: "CONTACT" }]} />
        <section className="py-24 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <div className="bg-white rounded-3xl p-12 shadow-soft border border-gray-100">
              <div className="w-20 h-20 bg-melon-light/30 text-melon-dark rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-[#264653] mb-4">送信が完了しました</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                お問い合わせありがとうございます。<br />
                ご入力いただいたメールアドレス宛に、自動返信メールをお送りしました。<br />
                担当者より折り返しご連絡いたしますので、今しばらくお待ちください。
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-melon-dark text-white font-bold py-3 px-8 rounded-full hover:bg-[#264653] transition-colors">
                トップページへ戻る
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-14 md:pt-16 pb-20 font-sans">
      
      <PageHeader
        titleEn="CONTACT"
        titleJp="お問い合わせ"
        breadcrumbs={[{ name: "CONTACT" }]}
      />

      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          
          <div className="text-center mb-12">
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Web制作、システム開発、デザイン制作など、<br className="hidden md:inline" />
              お仕事のご相談や御見積もりなど、お気軽にお問い合わせください。<br />
              通常 1〜2営業日以内に担当者より折り返しご連絡いたします。
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-melon text-white rounded-full flex items-center justify-center shadow-md border-4 border-[#FAFAFA]">
                <i className="far fa-envelope text-xl"></i>
            </div>

            <form className="space-y-8 mt-4" onSubmit={handleSubmit}>
                <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                    <label htmlFor="company" className="block text-sm font-bold text-[#264653] mb-2">会社名</label>
                    <input type="text" id="company" name="company" placeholder="メロンワークス合同会社" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-melon-dark focus:ring-1 focus:ring-melon-dark transition-colors placeholder-gray-300" />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-[#264653] mb-2">お名前 <span className="text-[#E76F51] text-xs ml-1 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">必須</span></label>
                    <input type="text" id="name" name="name" required placeholder="山田 太郎" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-melon-dark focus:ring-1 focus:ring-melon-dark transition-colors placeholder-gray-300" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-[#264653] mb-2">メールアドレス <span className="text-[#E76F51] text-xs ml-1 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">必須</span></label>
                    <input type="email" id="email" name="email" required placeholder="info@melonworks.me" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-melon-dark focus:ring-1 focus:ring-melon-dark transition-colors placeholder-gray-300" />
                </div>

                <div>
                    <label htmlFor="tel" className="block text-sm font-bold text-[#264653] mb-2">電話番号</label>
                    <input type="tel" id="tel" name="tel" placeholder="090-1234-5678" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-melon-dark focus:ring-1 focus:ring-melon-dark transition-colors placeholder-gray-300" />
                </div>

                <div>
                    <label htmlFor="type" className="block text-sm font-bold text-[#264653] mb-2">ご相談内容 <span className="text-[#E76F51] text-xs ml-1 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">必須</span></label>
                    <div className="relative">
                        <select id="type" name="type" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 appearance-none focus:outline-none focus:border-melon-dark focus:ring-1 focus:ring-melon-dark transition-colors cursor-pointer">
                            <option value="">選択してください</option>
                            <option value="業務設計・DX支援について">業務設計・DX支援について</option>
                            <option value="Webサイト制作について">Webサイト制作について</option>
                            <option value="ECサイト構築について">ECサイト構築について</option>
                            <option value="デザイン制作について">デザイン制作について</option>
                            <option value="その他のお問い合わせ">その他のお問い合わせ</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><i className="fas fa-chevron-down text-xs"></i></div>
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-bold text-[#264653] mb-2">お問い合わせ詳細 <span className="text-[#E76F51] text-xs ml-1 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">必須</span></label>
                    <textarea id="message" name="message" required rows={6} placeholder="ご予算、納期、現状の課題など、可能な範囲でご記入ください。" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-melon-dark focus:ring-1 focus:ring-melon-dark transition-colors resize-none placeholder-gray-300"></textarea>
                </div>

                {/* プライバシーポリシー同意 */}
                <div className="text-center pt-4 border-t border-gray-100 mt-8">
                    <div 
                      className="inline-flex items-center gap-3 cursor-pointer group select-none"
                      onClick={(e) => {
                        if (!hasRead && (e.target as HTMLElement).tagName !== 'BUTTON') {
                            setIsModalOpen(true);
                        }
                      }}
                    >
                        <input 
                            type="checkbox" 
                            required 
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            onClick={handleCheckboxClick}
                            className={`w-5 h-5 text-melon-dark border-gray-300 rounded focus:ring-melon-dark accent-melon-dark ${!hasRead ? 'cursor-pointer' : ''}`} 
                        />
                        <span className="text-xs md:text-sm text-gray-600 group-hover:text-[#264653] transition-colors">
                            <button type="button" onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }} className="text-melon-dark underline hover:no-underline font-bold mr-1 outline-none">
                                プライバシーポリシー
                            </button>
                            に同意する
                        </span>
                    </div>
                    {!hasRead && (
                        <p className="text-[10px] text-red-400 mt-2 animate-pulse">
                            ※内容を確認するとチェックが入ります
                        </p>
                    )}
                </div>

                <div className="text-center pt-2">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full md:w-auto bg-gradient-to-r from-[#264653] to-[#2A9D8F] text-white font-bold py-4 px-16 rounded-full transition-all duration-300 flex items-center justify-center gap-2 mx-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-1'}`}
                    >
                        {isSubmitting ? (<><i className="fas fa-spinner fa-spin"></i> 送信中...</>) : (<><i className="far fa-paper-plane"></i> 送信する</>)}
                    </button>
                </div>

            </form>
          </div>
        </div>
      </section>

      {/* プライバシーポリシーモーダル */}
      {isModalOpen && (
        <PrivacyModal onClose={handleCloseModal} />
      )}

      <StickyBottomNav title="お問い合わせ" />
    </main>
  );
}

// モーダルコンポーネント
function PrivacyModal({ onClose }: { onClose: () => void }) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            <div className="bg-white w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col relative animate-fade-in-up">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-[#264653]">プライバシーポリシー</h3>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-melon-dark hover:text-white transition-colors flex items-center justify-center">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed space-y-6">
                    <p>本ウェブサイトは、メロンワークス合同会社（以下「当社」）の事業内容等を紹介するサイトです。</p>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">1. 個人情報に関する基本方針</h4>
                        <p>当社は、個人情報の重要性を認識し、個人情報の保護に関する法律および関連法令を遵守するとともに、適切な取扱いおよび保護に努めます。</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">2. 個人情報の管理</h4>
                        <p>当社は、お客様の個人情報を正確かつ最新の状態に保ち、不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、管理体制の整備、社内教育の徹底等の必要な措置を講じ、個人情報の厳重な管理を行います。</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">3. 個人情報の利用目的</h4>
                        <p>当社は、お客様から取得した個人情報を、以下の目的の範囲内で利用いたします。</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                            <li>お問い合わせへの対応</li>
                            <li>業務上必要なご連絡</li>
                            <li>サービスのご案内、資料の送付</li>
                        </ul>
                        <p className="mt-2">取得した個人情報は、上記目的以外で利用することはありません。</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">4. 個人情報の第三者への開示・提供の禁止</h4>
                        <p>当社は、お客様よりお預かりした個人情報を適切に管理し、次の場合を除き、第三者に開示または提供いたしません。</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                            <li>お客様の同意がある場合</li>
                            <li>お客様が希望されるサービスを提供するため、業務委託先に必要な範囲で開示する場合</li>
                            <li>法令に基づき開示することが必要である場合</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">5. 個人情報の安全対策</h4>
                        <p>当社は、個人情報の正確性および安全性を確保するため、適切なセキュリティ対策を講じます。</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">6. ご本人の照会・修正・削除</h4>
                        <p>お客様ご本人から、個人情報の照会・修正・削除等をご希望された場合には、ご本人であることを確認の上、速やかに対応いたします。</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">7. アクセス解析ツールについて</h4>
                        <p>当社は、本ウェブサイトの利用状況を把握し、サービス向上を目的として、Google Analytics 等のアクセス解析ツールを利用する場合があります。<br />
                        これらのツールはトラフィックデータの収集のためにCookieを使用しますが、収集される情報は匿名であり、個人を特定するものではありません。<br />
                        なお、Cookieの使用を望まない場合は、ブラウザの設定により無効にすることが可能です。</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">8. 法令、規範の遵守と見直し</h4>
                        <p>当社は、保有する個人情報に関して適用される日本の法令およびその他の規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">9. 免責事項</h4>
                        <p>本ウェブサイトの情報は、無料で提供されています。本サイトを利用したことによって生じたいかなる損害についても、当社は一切の責任を負いません。<br />
                        また、本サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報やサービス等について、当社は一切の責任を負いません。</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#264653] border-l-4 border-melon-dark pl-3 mb-2">10. 著作権</h4>
                        <p>本ウェブサイトに掲載されているすべてのコンテンツ（文章・画像・デザイン等）の著作権は、当社に帰属します。書面による許可なく、私的利用の範囲を超えて使用することを禁止します。</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-[#264653] mb-2">お問い合わせ窓口</h4>
                        <p>当社の個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。</p>
                        <p className="mt-4 font-bold">メロンワークス合同会社</p>
                        <p>〒371-0831<br />群馬県前橋市小相木町327 タカゼンビル203</p>
                        <p className="mt-2">メールアドレス：hello@melonworks.me</p>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 text-center bg-gray-50 rounded-b-2xl">
                    <button onClick={onClose} className="bg-[#264653] text-white font-bold py-2.5 px-8 rounded-full hover:bg-melon-dark transition-colors text-sm">
                        閉じて同意する
                    </button>
                </div>
            </div>
        </div>
    );
}
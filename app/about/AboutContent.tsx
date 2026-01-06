"use client"; // ★ここはクライアントコンポーネントのまま

import Link from "next/link";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StickyBottomNav from "@/components/StickyBottomNav";

export default function AboutContent() {
  const PAGE_TITLE = "会社案内";

  // アコーディオンの開閉状態を管理
  const [openItems, setOpenItems] = useState<number[]>([]);
  const isAllOpen = openItems.length === 7;

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((i) => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const toggleAll = () => {
    if (isAllOpen) {
      setOpenItems([]);
    } else {
      setOpenItems([0, 1, 2, 3, 4, 5, 6]);
    }
  };

  const mvvData = [
    { title: "MISSION", sub: "やさしい価値を届け、仕事と健康を持続できる社会をつくる。", desc: "Less is more の精神で、高い解像度で本質を捉え、シンプルでやさしい仕組みを生み出す。", note: "「やさしい」には「優しい（人に）」「易しい（しくみに）」の両方の意味を込めています。", color: "bg-[#E0F2F1]" },
    { title: "VISION", sub: "高い解像度で現場の声と課題を理解し、最小限で最大の成果を生む。", desc: "優しさと易しさを兼ね備えたチームとして、温かみと精度のある価値を届け続ける。", note: "", color: "bg-[#F0F9F9]" }
  ];

  const valueData = [
    { num: "01", en: "Less is more", jp: "最小限で、最大限に。", text: "無駄を減らし、本質に集中する。シンプルに削ぎ落とし、豊かさを生む。" },
    { num: "02", en: "Be gentle and simple", jp: "優しく、そして易しく。", text: "相手に寄り添い、誰にでもわかる形に整える。優しさとわかり易さを両立する。" },
    { num: "03", en: "Stay grounded", jp: "現場に根ざす。", text: "現場に足を運び、体温のある理解を大切にする。本質は現場にある。" },
    { num: "04", en: "Craft with charm", jp: "愛嬌を込めてつくる。", text: "手間を惜しまず、仕上げに“人のあたたかさ”を。機能だけでなく、心が動くかたちを大切にする。" },
    { num: "05", en: "See in every resolution", jp: "あらゆる解像度で見る。", text: "広く、深く、正確に。粗くしても、細かくしても、本質を見失わない。" },
  ];

  // メンバーデータ (ひらがな表記版)
  const members = [
    {
      name: "おこのぎ ゆうすけ",
      en: "Yusuke Okonogi",
      role: "Representative / Producer",
      image: "https://placehold.jp/eeeeee/cccccc/400x400.png?text=Y.Okonogi",
      desc: "全体の統括および、ビジネス設計を担当。"
    },
    {
      name: "こばやし てつろう",
      en: "Tetsuro Kobayashi",
      role: "Director / Engineer",
      image: "https://placehold.jp/eeeeee/cccccc/400x400.png?text=T.Kobayashi",
      desc: "技術選定およびシステム開発をリード。"
    },
    {
      name: "うちやま やすこ",
      en: "Yasuko Uchiyama",
      role: "Designer / Backoffice",
      image: "https://placehold.jp/eeeeee/cccccc/400x400.png?text=Y.Uchiyama",
      desc: "クリエイティブ制作および組織運営を担当。"
    }
  ];

  return (
    <main className="bg-[#F9FAFB] min-h-screen pt-14 md:pt-16 pb-14 font-sans">
      
      <PageHeader 
        titleEn="COMPANY" 
        titleJp="会社案内" 
        breadcrumbs={[{ name: "会社案内" }]} 
      />

      {/* MVV Section */}
      <section id="mvv" className="py-16 bg-white border-b border-gray-100 relative scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
              
              <div className="text-center mb-10">
                  <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-2 block">PHILOSOPHY</span>
                  <h2 className="text-2xl font-bold text-[#264653] mb-4">企業理念</h2>
                  
                  <button onClick={toggleAll} className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-melon-dark transition-colors border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 hover:border-gray-300">
                      <i className={`fas ${isAllOpen ? 'fa-angle-double-up' : 'fa-angle-double-down'}`}></i>
                      <span>{isAllOpen ? "すべて閉じる" : "すべて見る"}</span>
                  </button>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-start">
                  {mvvData.map((item, idx) => (
                    <div key={idx} className={`${item.color} rounded-2xl border border-gray-100 overflow-hidden hover-lift shadow-sm`}>
                        <button onClick={() => toggleItem(idx)} className={`w-full text-left p-6 flex items-center justify-between group cursor-pointer outline-none`}>
                            <div className="flex-grow">
                                <span className="text-melon-dark font-bold tracking-widest font-en text-[10px] uppercase mb-1 block opacity-70">{item.title}</span>
                                <h2 className="text-lg font-bold text-[#264653] leading-snug" dangerouslySetInnerHTML={{__html: item.sub.replace(/、/g, '、<br>')}}></h2>
                            </div>
                            <div className={`w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-melon-dark group-hover:border-melon-dark transition-all flex-shrink-0 ml-4 ${openItems.includes(idx) ? 'rotate-180' : ''}`}>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </div>
                        </button>
                        <div className={`transition-all duration-300 ease-out overflow-hidden ${openItems.includes(idx) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-6 pb-6 pt-0">
                                <div className="h-[1px] w-full bg-melon-dark/10 mb-4"></div>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                                {item.note && (
                                    <p className="text-[10px] text-gray-500 bg-white/60 border border-gray-200/50 px-3 py-1.5 rounded-lg inline-flex items-center gap-2">
                                        <i className="fas fa-info-circle text-melon-dark/60"></i>
                                        {item.note}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                  ))}
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-start">
                  {valueData.slice(0, 3).map((item, idx) => (
                      <ValueCard key={idx} item={item} index={idx + 2} isOpen={openItems.includes(idx + 2)} toggle={() => toggleItem(idx + 2)} />
                  ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto items-start">
                  {valueData.slice(3).map((item, idx) => (
                      <ValueCard key={idx} item={item} index={idx + 5} isOpen={openItems.includes(idx + 5)} toggle={() => toggleItem(idx + 5)} />
                  ))}
              </div>

          </div>
      </section>

      {/* MEMBERS Section */}
      <section id="members" className="py-16 bg-[#FAFAFA] border-b border-gray-100 relative scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
              <div className="text-center mb-10">
                  <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-2 block">MEMBERS</span>
                  <h2 className="text-2xl font-bold text-[#264653]">メンバー紹介</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                  {members.map((member, i) => (
                      <div key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                          {/* 写真エリア */}
                          <div className="aspect-square relative overflow-hidden bg-gray-100">
                              <img 
                                src={member.image} 
                                alt={member.en} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                              />
                          </div>
                          {/* 情報エリア */}
                          <div className="p-6 text-center">
                              {/* 役職 */}
                              <p className="text-[10px] text-melon-dark font-bold font-en tracking-wider mb-2 uppercase">{member.role}</p>
                              
                              {/* 名前 (英語メイン) */}
                              <h3 className="text-xl font-bold text-[#264653] font-en mb-1">{member.en}</h3>
                              
                              {/* 名前 (ひらがなサブ) */}
                              <p className="text-xs text-gray-400 font-medium mb-4 tracking-wider">{member.name}</p>
                              
                              <div className="w-8 h-[2px] bg-melon-light mx-auto mb-4"></div>
                              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                  {member.desc}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Outline Section */}
      <section id="outline" className="py-12 lg:py-20 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
              <div className="text-center mb-10">
                  <span className="text-melon-dark font-bold tracking-widest font-en text-xs uppercase mb-2 block">OUTLINE</span>
                  <h2 className="text-2xl font-bold text-[#264653]">会社概要</h2>
              </div>

              <div className="w-full bg-[#F9FAFB] rounded-3xl p-6 md:p-10 border border-gray-100 relative">
                  <div className="grid grid-cols-1 gap-y-6 md:gap-y-8">
                      <Row icon="far fa-building" title="会社名">
                          <p className="text-gray-600 leading-relaxed font-bold">
                              メロンワークス合同会社 <span className="text-sm text-gray-400 font-en font-normal ml-2">(Melon Works LLC)</span>
                          </p>
                      </Row>
                      <Row icon="far fa-user" title="代表">
                          <p className="text-gray-600 leading-relaxed">小此木 勇介 <span className="text-xs text-gray-400 ml-2">(おこのぎ ゆうすけ)</span></p>
                      </Row>
                      <Row icon="fas fa-map-marker-alt" title="所在地">
                          <div className="text-gray-600 space-y-4">
                              <div><span className="inline-block bg-melon-light text-melon-dark text-[10px] font-bold px-2 py-1 rounded mb-1">本社</span><p className="leading-relaxed text-sm">〒371-0831<br />群馬県前橋市小相木町327 タカゼンビル203</p></div>
                              <div><span className="inline-block bg-melon-light text-melon-dark text-[10px] font-bold px-2 py-1 rounded mb-1">東京拠点</span><p className="leading-relaxed text-sm">〒106-0032<br />東京都港区六本木6-8-23</p></div>
                          </div>
                      </Row>
                      <Row icon="fas fa-phone-alt" title="電話番号">
                          <p className="text-gray-600 font-en tracking-wider">027-898-2667 <span className="text-xs text-gray-400 ml-1 font-sans">(代表)</span></p>
                      </Row>
                      <Row icon="far fa-calendar-alt" title="設立">
                          <p className="text-gray-600">2018年4月</p>
                      </Row>
                      
                      <Row icon="fas fa-briefcase" title="事業内容" isLast>
                          <div className="space-y-6">
                              <div>
                                  <h4 className="font-bold text-[#264653] mb-2 text-sm md:text-base">
                                      デジタルソリューション事業部
                                  </h4>
                                  <ul className="list-disc list-outside ml-6 space-y-1.5 text-xs md:text-sm text-gray-600 marker:text-melon-dark/50">
                                      <li>インターネットに関する総合コンサルティング業務</li>
                                      <li>デジタルコンテンツの企画、制作、運営業務</li>
                                      <li>インターネットでの広告業務及び広告代理店業</li>
                                  </ul>
                              </div>

                              <div>
                                  <h4 className="font-bold text-[#264653] mb-2 text-sm md:text-base">
                                      ウェルネス事業部
                                  </h4>
                                  <ul className="list-disc list-outside ml-6 space-y-1.5 text-xs md:text-sm text-gray-600 marker:text-melon-dark/50">
                                      <li>
                                          Ananda Yogaスタジオの運営
                                          <a 
                                            href="https://ananda-yogaschool.com/" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="block mt-1 text-melon-dark underline hover:no-underline break-all text-[11px] md:text-xs"
                                          >
                                              <i className="fas fa-external-link-alt mr-1"></i>
                                              https://ananda-yogaschool.com/
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </Row>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#264653] to-[#2A9D8F] text-white py-24 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-4 md:px-6 max-w-6xl text-center relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">あなたのビジネスの「現場」を整えます。</h2>
              <p className="text-white/80 mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed">Web制作からシステム開発、日々の運用サポートまで。<br />まずは無料相談からお気軽にお問い合わせください。</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <Link href="/contact" className="bg-white text-melon-dark font-bold py-4 px-10 rounded-full hover:bg-melon-dark hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"><i className="far fa-envelope group-hover:rotate-12 transition-transform"></i> お問い合わせ</Link>
                  <Link href="#" className="bg-transparent border border-white/50 text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-melon-dark hover:border-white transition-all flex items-center justify-center gap-2"><i className="fas fa-download"></i> 資料ダウンロード</Link>
              </div>
          </div>
      </section>
      
      <StickyBottomNav title={PAGE_TITLE} />
    </main>
  );
}

// サブコンポーネント
function ValueCard({ item, index, isOpen, toggle }: any) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover-lift shadow-sm">
            <button onClick={toggle} className="w-full text-left p-5 flex items-center justify-between group h-full cursor-pointer outline-none">
                <div className="flex-grow pr-2">
                    <span className="text-melon-dark/40 font-bold font-en text-[10px] block mb-0.5">VALUE {item.num}</span>
                    <h3 className="text-melon-dark font-bold font-en text-sm mb-1 leading-tight">{item.en}</h3>
                    <p className="text-[11px] font-bold text-[#264653]">{item.jp}</p>
                </div>
                <div className={`w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-melon-dark transition-all flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    <i className="fas fa-chevron-down text-[10px]"></i>
                </div>
            </button>
            <div className={`transition-all duration-300 ease-out overflow-hidden ${isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-5 pt-0">
                    <p className="text-[10px] text-gray-500 leading-relaxed pt-2 border-t border-gray-50">{item.text}</p>
                </div>
            </div>
        </div>
    );
}

function Row({ icon, title, children, isLast }: any) {
    return (
        <div className={`flex flex-col md:flex-row ${!isLast ? 'border-b border-gray-100 pb-6 md:pb-8' : ''}`}>
            <dt className="w-full md:w-1/4 font-bold text-[#264653] flex items-center gap-2 mb-2 md:mb-0 text-sm">
                <i className={`${icon} text-melon-dark opacity-60`}></i> {title}
            </dt>
            <dd className="w-full md:w-3/4">{children}</dd>
        </div>
    );
}
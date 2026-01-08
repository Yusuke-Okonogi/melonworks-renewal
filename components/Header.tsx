"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // スマホメニューの開閉
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false); // PCメガメニューの開閉
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setIsOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  // サービスメニューのデータ
  const services = [
    {
      title: "業務設計・DX支援",
      path: "/service/dx",
      icon: "fas fa-shapes",
    },
    {
      title: "Webサイト制作",
      path: "/service/web",
      icon: "fas fa-laptop-code",
    },
    {
      title: "ECサイト構築",
      path: "/service/ec",
      icon: "fas fa-store",
    },
    {
      title: "デザイン制作",
      path: "/service/design",
      icon: "fas fa-palette",
    },
  ];

  return (
    <>
      {/* Header (Desktop & Mobile Top Bar) */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 h-14 md:h-16 flex items-center transition-all ${
          isOpen 
            ? 'bg-transparent border-none' 
            : 'bg-white/90 backdrop-blur-md border-b border-gray-100'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-6xl h-14 md:h-16 flex items-center justify-between">
          
          {/* ロゴ */}
          <Link href="/" className="relative z-50 flex items-center gap-3 group opacity-90 hover:opacity-100 transition-opacity" onClick={closeMenu}>
            <img src="/logo-gr.png" alt="Melon Works" className="h-4 md:h-5 w-auto" />
          </Link>

          {/* PC Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs md:text-sm font-bold text-gray-500 font-en">
            <Link href="/about" className="hover:text-melon-dark transition-colors relative group">
                会社案内
            </Link>

            {/* PC用メガメニューのトリガー */}
            <div
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Link
                href="/service"
                className="hover:text-melon-dark transition-colors relative group flex items-center gap-1 py-4"
              >
                サービス <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`}></i>
              </Link>
              
              {/* メガメニュー本体 */}
              <div
                className={`
                    absolute top-full 
                    right-0 w-[520px] 
                    lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-[600px]
                    bg-white border border-gray-100 shadow-xl rounded-b-xl overflow-hidden transition-all duration-300 origin-top 
                    ${isMegaMenuOpen ? "opacity-100 visible max-h-[400px]" : "opacity-0 invisible max-h-0"}
                `}
              >
                <div className="p-6 grid grid-cols-2 gap-4 bg-white">
                    {services.map((s, i) => (
                        <Link key={i} href={s.path} className="flex gap-4 p-3 rounded-lg hover:bg-melon-light/10 transition-colors group/item">
                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-melon-dark text-lg group-hover/item:bg-melon-dark group-hover/item:text-white transition-colors flex-shrink-0">
                                <i className={s.icon}></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#264653] text-sm mb-0.5">{s.title}</h4>
                                <p className="text-[10px] text-gray-400 leading-tight">詳しく見る</p>
                            </div>
                        </Link>
                    ))}
                </div>
              </div>
            </div>

            <Link href="/articles" className="hover:text-melon-dark transition-colors relative group">
                事例
            </Link>
            
            <Link href="/contact" className="bg-melon-dark text-white px-5 py-2 md:px-6 md:py-2 rounded-full hover:bg-melon hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-[10px] md:text-xs tracking-wider">
                お問い合わせ
            </Link>
          </nav>
        </div>
      </header>

      {/* ▼▼▼ Mobile Menu Overlay (タイル型メニュー・圧縮版) ▼▼▼ */}
      <div 
        className={`fixed inset-0 bg-[#F9FAFB]/95 backdrop-blur-xl z-[90] flex flex-col items-center overflow-y-auto transition-all duration-500 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* 背景装飾 */}
        <div className="fixed top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-melon-light/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#264653]/5 rounded-full blur-[60px] pointer-events-none"></div>

        {/* タイルグリッドコンテナ */}
        <nav className="relative z-10 w-full max-w-sm px-6 grid grid-cols-2 gap-3 pb-32 pt-24">
            
            {/* 1. ホーム & 会社案内 */}
            <Link 
                href="/" 
                onClick={closeMenu}
                className="h-20 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md active:scale-95 transition-all duration-300"
            >
                <i className="fas fa-home text-xl text-melon-dark"></i>
                <span className="font-bold text-[#264653] text-sm">ホーム</span>
            </Link>

            <Link 
                href="/about" 
                onClick={closeMenu}
                className="h-20 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md active:scale-95 transition-all duration-300"
            >
                <i className="fas fa-users text-xl text-melon-dark"></i>
                <span className="font-bold text-[#264653] text-sm">会社案内</span>
            </Link>

            {/* 2. SERVICES SECTION TITLE */}
            <div className="col-span-2 flex items-center gap-2 mt-2 mb-1 pl-1 opacity-60">
                <span className="h-[1px] w-4 bg-[#264653]"></span>
                <span className="text-xs font-bold font-en text-[#264653] tracking-widest">SERVICES</span>
                <span className="h-[1px] flex-grow bg-[#264653] opacity-20"></span>
            </div>

            {/* 3. INDIVIDUAL SERVICES (4つ) - 高さを圧縮 */}
            {services.map((s, i) => (
                <Link 
                    key={i}
                    href={s.path} 
                    onClick={closeMenu}
                    className="h-24 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 transition-all duration-300 relative overflow-hidden group px-1"
                >
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i className={`${s.icon} text-3xl text-melon-dark`}></i>
                    </div>
                    <i className={`${s.icon} text-2xl text-melon-dark`}></i>
                    <span className="font-bold text-[#264653] text-xs text-center leading-tight">{s.title}</span>
                </Link>
            ))}

            {/* 4. 事例 (ARTICLES) */}
            <Link 
                href="/articles" 
                onClick={closeMenu}
                className="col-span-2 bg-white border border-gray-100 rounded-2xl py-4 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 transition-all duration-300 mt-2"
            >
                <i className="far fa-newspaper text-lg text-melon-dark"></i>
                <span className="font-bold text-[#264653] text-base">事例</span>
            </Link>

            {/* 5. お問い合わせ (CONTACT) */}
            <Link 
                href="/contact" 
                onClick={closeMenu}
                className="col-span-2 bg-gradient-to-r from-[#264653] to-[#2A9D8F] text-white rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
            >
                <i className="far fa-envelope text-lg"></i>
                <span className="font-bold text-base">お問い合わせ</span>
            </Link>

        </nav>
      </div>

      {/* ▼▼▼ Mobile Menu Button (Floating) ▼▼▼ */}
      {/* 修正: z-indexを高く設定 (z-[100]) し、フッターより前面に出るようにする */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] md:hidden">
        <button 
            onClick={toggleMenu}
            className={`
                relative z-50 px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 border border-white/20 backdrop-blur-sm
                ${isOpen 
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gradient-to-r from-[#264653] to-[#2A9D8F] text-white hover:scale-105 animate-pulse-glow shadow-melon/30'
                }
            `}
        >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-sm w-4 text-center transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}></i>
            <span className="font-bold text-xs font-en tracking-wider w-10 text-center">
                {isOpen ? 'CLOSE' : 'MENU'}
            </span>
        </button>
      </div>
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { client } from "@/libs/client";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [tags, setTags] = useState<any[]>([]);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await client.get({ 
            endpoint: "tags", 
            queries: { limit: 20 } 
        });
        setTags(data.contents);
      } catch (e) {
        console.error("Tags fetch failed", e);
      }
    };
    fetchTags();
  }, []);

  const problemTags = tags.filter((t: any) => t.type?.includes("problem")).slice(0, 6);
  const solutionTags = tags.filter((t: any) => t.type?.includes("solution")).slice(0, 6);

  const services = [
    { title: "業務設計・DX支援", path: "/service/dx", icon: "fas fa-shapes" },
    { title: "Webサイト制作", path: "/service/web", icon: "fas fa-laptop-code" },
    { title: "ECサイト構築", path: "/service/ec", icon: "fas fa-store" },
    { title: "デザイン制作", path: "/service/design", icon: "fas fa-palette" },
  ];

  const companyLinks = [
    { name: "会社概要", path: "/about" },
    { name: "利用規約", path: "/terms" },
    { name: "プライバシーポリシー", path: "/privacy" },
    { name: "反社基本方針", path: "/antisocial" },
  ];

  return (
    <>
      {/* Header (Desktop & Mobile Top Bar) */}
      <header 
        className={`fixed top-0 left-0 w-full z-[95] h-14 md:h-16 flex items-center transition-all duration-300 ${
          isOpen 
            ? 'bg-[#F9FAFB] border-b border-transparent' // ★修正: メニュー展開時は背景色をつけて透過を防ぐ
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
            <Link href="/about" className="hover:text-melon-dark transition-colors relative group">会社案内</Link>

            {/* PC Mega Menu */}
            <div
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Link href="/service" className="hover:text-melon-dark transition-colors relative group flex items-center gap-1 py-4">
                サービス <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`}></i>
              </Link>
              <div className={`absolute top-full right-0 w-[520px] lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-[600px] bg-white border border-gray-100 shadow-xl rounded-b-xl overflow-hidden transition-all duration-300 origin-top ${isMegaMenuOpen ? "opacity-100 visible max-h-[400px]" : "opacity-0 invisible max-h-0"}`}>
                <div className="p-6 grid grid-cols-2 gap-4 bg-white">
                    {services.map((s, i) => (
                        <Link key={i} href={s.path} className="flex gap-4 p-3 rounded-lg hover:bg-melon-light/10 transition-colors group/item">
                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-melon-dark text-lg group-hover/item:bg-melon-dark group-hover/item:text-white transition-colors flex-shrink-0"><i className={s.icon}></i></div>
                            <div><h4 className="font-bold text-[#264653] text-sm mb-0.5">{s.title}</h4><p className="text-[10px] text-gray-400 leading-tight">詳しく見る</p></div>
                        </Link>
                    ))}
                </div>
              </div>
            </div>

            <Link href="/articles" className="hover:text-melon-dark transition-colors relative group">事例</Link>
            <Link href="/contact" className="bg-melon-dark text-white px-5 py-2 md:px-6 md:py-2 rounded-full hover:bg-melon hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-[10px] md:text-xs tracking-wider">お問い合わせ</Link>
          </nav>
        </div>
      </header>

      {/* ▼▼▼ Mobile Menu Overlay ▼▼▼ */}
      <div 
        className={`fixed inset-0 bg-[#F9FAFB] z-[90] overflow-y-auto transition-all duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ paddingTop: '64px' }} // ヘッダーの高さ分パディングを確保
      >
        {/* 背景装飾 */}
        <div className="fixed top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-melon-light/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#264653]/5 rounded-full blur-[60px] pointer-events-none"></div>

        {/* コンテンツコンテナ */}
        <div className="relative z-10 w-full max-w-md mx-auto px-6 pb-40 pt-6 space-y-10">
            
            {/* 1. SERVICE SECTION */}
            <section>
                <div className="flex items-center gap-2 mb-4 opacity-60">
                    <span className="h-[1px] w-4 bg-[#264653]"></span>
                    <span className="text-xs font-bold font-en text-[#264653] tracking-widest">SERVICE</span>
                    <span className="h-[1px] flex-grow bg-[#264653] opacity-20"></span>
                </div>
                {/* ★修正: COMPANYと同じサイズ感のグリッドに変更 */}
                <div className="grid grid-cols-2 gap-3">
                    {services.map((s, i) => (
                        <Link key={i} href={s.path} onClick={closeMenu} className="bg-white border border-gray-100 rounded-xl py-3 px-3 flex items-center justify-start gap-2 shadow-sm active:scale-95 transition-all">
                            <div className="w-6 h-6 rounded-full bg-melon-light/20 flex items-center justify-center text-melon-dark text-xs flex-shrink-0">
                                <i className={s.icon}></i>
                            </div>
                            <span className="font-bold text-[#264653] text-xs leading-tight">{s.title}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 2. TAGS SECTION */}
            <section>
                <div className="flex items-center gap-2 mb-4 opacity-60">
                    <span className="h-[1px] w-4 bg-[#264653]"></span>
                    <span className="text-xs font-bold font-en text-[#264653] tracking-widest">TAGS</span>
                    <span className="h-[1px] flex-grow bg-[#264653] opacity-20"></span>
                </div>
                
                <div className="space-y-4">
                    {/* Issues */}
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 mb-2 pl-1">ISSUES</p>
                        <div className="flex flex-wrap gap-2">
                            {problemTags.map((tag: any, i: number) => (
                                <Link key={i} href={`/search?tag=${encodeURIComponent(tag.name)}`} onClick={closeMenu} className="bg-white border border-red-100 text-[#E76F51] text-[10px] font-bold px-3 py-2 rounded-full shadow-sm active:scale-95 transition-all">
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Solutions */}
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 mb-2 pl-1">SOLUTIONS</p>
                        <div className="flex flex-wrap gap-2">
                            {solutionTags.map((tag: any, i: number) => (
                                <Link key={i} href={`/search?tag=${encodeURIComponent(tag.name)}`} onClick={closeMenu} className="bg-white border border-melon/20 text-melon-dark text-[10px] font-bold px-3 py-2 rounded-full shadow-sm active:scale-95 transition-all">
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. COMPANY SECTION */}
            <section>
                <div className="flex items-center gap-2 mb-4 opacity-60">
                    <span className="h-[1px] w-4 bg-[#264653]"></span>
                    <span className="text-xs font-bold font-en text-[#264653] tracking-widest">COMPANY</span>
                    <span className="h-[1px] flex-grow bg-[#264653] opacity-20"></span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {companyLinks.map((item, i) => (
                        <Link key={i} href={item.path} onClick={closeMenu} className="bg-white border border-gray-100 rounded-xl py-3 px-4 flex items-center justify-center shadow-sm active:scale-95 transition-all">
                            <span className="font-bold text-gray-500 text-xs">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CONTACT BUTTON */}
            <Link 
                href="/contact" 
                onClick={closeMenu}
                className="block w-full bg-gradient-to-r from-[#264653] to-[#2A9D8F] text-white rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
            >
                <i className="far fa-envelope text-lg"></i>
                <span className="font-bold text-base">お問い合わせ</span>
            </Link>

        </div>
      </div>

      {/* Floating Menu Button */}
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
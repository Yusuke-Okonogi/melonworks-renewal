import Link from 'next/link';

export default function Footer() {
  return (
    // ★修正: pb-8 -> pb-24 (固定バーの分だけ余白を確保)
    <footer className="bg-white border-t border-gray-100 pt-16 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <img src="/logo-gr.png" alt="Melon Works" className="h-6 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" />
                    </div>
                    <div className="flex gap-4 mb-6">
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-melon-dark hover:text-white transition-colors">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-melon-dark hover:text-white transition-colors">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-melon-dark hover:text-white transition-colors">
                            <i className="fas fa-note-sticky"></i>
                        </a>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        第三者目線と現場経験を武器に、アパレルから不動産、政治活動まであらゆる領域の課題を解決する「Webの何でも屋」です。
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-xs font-en tracking-wider text-[#264653] border-b border-gray-100 pb-2 inline-block">ROLE</h4>
                    <ul className="text-xs text-gray-500 space-y-3">
                        <li>
                            <Link href="#" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> 経営者・オーナー
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> 店舗責任者・店長
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> EC担当者
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-bold mb-6 text-xs font-en tracking-wider text-[#264653] border-b border-gray-100 pb-2 inline-block">TOPIC</h4>
                    <ul className="text-xs text-gray-500 space-y-3">
                        <li>
                            <Link href="#" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> 在庫管理・POS
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> DX・業務効率化
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> Web制作・運用
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-xs font-en tracking-wider text-[#264653] border-b border-gray-100 pb-2 inline-block">COMPANY</h4>
                    <ul className="text-xs text-gray-500 space-y-3">
                        <li>
                            <Link href="/about" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> 会社概要
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> お問い合わせ
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> プライバシーポリシー
                            </Link>
                        </li>
                        <li>
                            <Link href="/antisocial" className="hover:text-melon-dark transition-colors flex items-center gap-1 group">
                                <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i> 反社基本方針
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-[10px] text-gray-400 border-t border-gray-100 pt-8 font-en">
                &copy; 2025 MelonWorks. All Rights Reserved.
            </div>
        </div>
    </footer>
  );
}
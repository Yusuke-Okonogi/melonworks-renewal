import Link from "next/link";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "900", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "MELON BASE | Melon Works",
  description: "メロンワークスご契約者様専用ポータルサイト「MELON BASE」へのログインページです。",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
        
        {/* ヘッダー部分 */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group decoration-none">
             {/* ★修正: gap-2 (8px) を基本とし、PCでは gap-2.5 (10px) に微調整 */}
             <h1 className={`${montserrat.className} text-3xl md:text-5xl text-[#264653] tracking-widest group-hover:text-melon-dark transition-colors flex items-center justify-center gap-2 md:gap-2.5`}>
               <i className="fas fa-layer-group text-3xl md:text-4xl text-melon-dark opacity-90"></i>
               <span>MELON BASE</span>
             </h1>
          </Link>
          <p className="text-xs text-gray-400 font-bold mt-3 tracking-wide">
            契約・売上・Web解析。IT周りの情報を一括管理。
          </p>
        </div>

        {/* フォーム部分 */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">ログインID / メールアドレス</label>
            <input 
              type="text" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-melon-dark focus:ring-1 focus:ring-melon-dark transition-all placeholder-gray-300" 
              placeholder="example@company.com" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">パスワード</label>
            <input 
              type="password" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-melon-dark focus:ring-1 focus:ring-melon-dark transition-all placeholder-gray-300" 
              placeholder="••••••••" 
            />
          </div>

          <button className="w-full bg-[#264653] text-white font-bold py-3.5 rounded-xl hover:bg-melon-dark shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 tracking-wider">
            LOGIN
          </button>
        </div>

        {/* リンク類 */}
        <div className="mt-10 text-center space-y-6">
          <Link href="#" className="inline-block text-xs text-gray-400 hover:text-melon-dark transition-colors border-b border-transparent hover:border-melon-dark pb-0.5">
            パスワードをお忘れの方はこちら
          </Link>
          
          <div className="pt-6 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              ※本システムはご契約者様専用です。<br />
              アカウント発行をご希望の方は担当者までご連絡ください。
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
import Link from "next/link";

type Props = {
  title?: string;
  text?: string;
  hideDownload?: boolean; // 資料DLボタンを隠したい場合用
};

export default function ContactSection({ 
  title = "あなたのビジネスの「現場」を整えます。", 
  text = "まずは無料相談からお気軽にお問い合わせください。",
  hideDownload = false
}: Props) {
  return (
    // ★修正: py-24 -> py-12 md:py-16 に変更して高さを圧縮
    <section className="bg-gradient-to-br from-[#264653] to-[#2A9D8F] text-white py-12 md:py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6 max-w-6xl text-center relative z-10">
        
        {/* ★修正: マージンとフォントサイズを少し抑えてバランス調整 */}
        <h2 className="text-xl md:text-3xl font-bold mb-4">{title}</h2>
        <p className="text-white/80 mb-8 text-sm md:text-base max-w-xl mx-auto leading-relaxed">{text}</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          {/* ★修正: ボタンのパディングも py-4 -> py-3.5 に微調整 */}
          <Link href="/contact" className="bg-white text-melon-dark font-bold py-3.5 px-8 rounded-full hover:bg-melon-dark hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
            <i className="far fa-envelope group-hover:rotate-12 transition-transform"></i> お問い合わせ
          </Link>
          {!hideDownload && (
            <Link href="#" className="bg-transparent border border-white/50 text-white font-bold py-3.5 px-8 rounded-full hover:bg-white hover:text-melon-dark hover:border-white transition-all flex items-center justify-center gap-2">
              <i className="fas fa-download"></i> 資料ダウンロード
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
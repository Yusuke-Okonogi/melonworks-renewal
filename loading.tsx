export default function Loading() {
  return (
    // ヘッダー・フッターの間に表示されるローディング画面
    <div className="flex items-center justify-center min-h-[50vh] py-20 bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* メロンワークスカラーのスピナー */}
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#264653] rounded-full animate-spin"></div>
        <p className="text-[#264653] font-bold font-en text-sm tracking-widest animate-pulse">LOADING...</p>
      </div>
    </div>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ▼▼▼ メタデータ共通設定 ▼▼▼
export const metadata: Metadata = {
  metadataBase: new URL("https://melonworks.me"),
  title: {
    template: "%s | メロンワークス合同会社",
    default: "メロンワークス合同会社 | 群馬・東京のDX支援・Web制作",
  },
  description: "群馬県前橋市・東京都港区を拠点に、業務設計・DX支援、Webサイト制作、ECサイト構築を行うメロンワークス合同会社です。「やさしい価値」を届け、ビジネスの現場を整えます。",
  openGraph: {
    title: "メロンワークス合同会社",
    description: "群馬・東京のDX支援・Web制作パートナー。現場に根ざした「使える」システムとデザインを提供します。",
    url: "https://melonworks.me",
    siteName: "Melon Works",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/ogp-default.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ★修正: suppressHydrationWarning を追加して拡張機能によるミスマッチエラーを抑制
    <html lang="ja" suppressHydrationWarning={true}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>

      <body className="text-gray-600 font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
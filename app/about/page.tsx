import type { Metadata } from "next";
import AboutContent from "./AboutContent"; // 先ほど作成したファイル

export const metadata: Metadata = {
  title: "会社案内",
  description: "メロンワークス合同会社の企業理念（MVV）、会社概要、メンバー紹介。",
  openGraph: {
    title: "会社案内 | Melon Works",
    description: "メロンワークス合同会社の企業理念（MVV）、会社概要、メンバー紹介。",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
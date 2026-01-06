import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "Web制作、システム開発、DX支援に関するご相談はこちらから。",
};

export default function ContactPage() {
  return <ContactContent />;
}
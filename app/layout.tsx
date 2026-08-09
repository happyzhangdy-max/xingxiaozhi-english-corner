import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const favicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2312140f'/%3E%3Crect x='18' y='18' width='28' height='28' rx='2' transform='rotate(45 32 32)' fill='%23d7ff3f'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: favicon },
  title: "行小之 · 英语角",
  description:
    "查词、识图、自动背词和单词大冒险：包含通用表达、职场岗位术语与场景英语。",
  applicationName: "行小之英语角",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: "行小之 · 英语角",
    description: "把英语说到嘴边：从查词到闯关的一站式练习场。",
    siteName: "行小之英语角",
  },
  twitter: {
    card: "summary",
    title: "行小之 · 英语角",
    description: "查词、识图、自动背词和单词大冒险。",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#12140f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

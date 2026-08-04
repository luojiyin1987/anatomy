import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://anatomy.itea.fit";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
});

const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 675,
  alt: "Anatomy Atelier 人体解剖学习工具的心脏标本预览图",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "人体解剖学习工具｜Anatomy Atelier",
    template: "%s｜Anatomy Atelier",
  },
  description:
    "交互式人体解剖学习工具，通过 3D 模型探索心脏、大脑、肺、肝脏、肾脏等人体器官的结构、位置与功能。",
  applicationName: "Anatomy Atelier",
  keywords: [
    "人体解剖",
    "解剖学习",
    "3D 解剖",
    "人体器官",
    "医学教育",
    "anatomy",
    "3D anatomy",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "zh_CN",
    siteName: "Anatomy Atelier",
    title: "人体解剖学习工具｜Anatomy Atelier",
    description: "通过可交互的 3D 标本探索人体器官的结构、位置与功能。",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "人体解剖学习工具｜Anatomy Atelier",
    description: "通过可交互的 3D 标本探索人体器官的结构、位置与功能。",
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f0e7",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Anatomy Atelier",
      alternateName: ["解剖学工作室", "anatomy.itea.fit"],
      url: `${SITE_URL}/`,
      description: "通过交互式 3D 模型学习人体器官结构、位置与功能。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#application`,
      name: "Anatomy Atelier",
      url: `${SITE_URL}/`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and WebGL",
      isAccessibleForFree: true,
      inLanguage: "zh-CN",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${sans.variable} ${serif.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        {children}
      </body>
    </html>
  );
}

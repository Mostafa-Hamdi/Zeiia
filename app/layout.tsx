import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Zeiia - Enterprise Software Solutions | Custom Development & Digital Transformation",
  description:
    "Leading enterprise software development company specializing in eCommerce, WordPress, custom solutions, CRM systems, and digital transformation. Trusted by Fortune 500 companies worldwide.",
  keywords:
    "enterprise software, custom development, ecommerce solutions, wordpress development, CRM systems, digital transformation, software company, enterprise applications",
  authors: [{ name: "Zeiia" }],
  openGraph: {
    title: "Zeiia - Enterprise Software Solutions",
    description:
      "Leading enterprise software development company trusted by Fortune 500 companies worldwide.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeiia - Enterprise Software Solutions",
    description:
      "Leading enterprise software development company trusted by Fortune 500 companies worldwide.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${bricolage.variable} antialiased`}>{children}</body>
    </html>
  );
}

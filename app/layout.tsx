import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/smooth-scroll";
import JsonLd from "@/components/json-ld";
import { SITE, DEFAULT_DESCRIPTION, organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Actorix — AI Automation & Custom Software Company in India",
    template: "%s | Actorix",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.founder, url: "https://www.linkedin.com/in/ajinkya842004/" }],
  creator: SITE.founder,
  publisher: SITE.name,
  category: "Technology",
  keywords: [
    "AI automation company India",
    "AI automation agency Mumbai",
    "custom software development company Mumbai",
    "SaaS MVP development India",
    "AI chatbot development company",
    "workflow automation services India",
    "web application development Mumbai",
    "hire AI developers India",
    "software studio Mumbai",
    "Actorix",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: "Actorix — AI Automation & Custom Software Company in India",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Actorix — intelligent software for modern businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Actorix — AI Automation & Custom Software Company in India",
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

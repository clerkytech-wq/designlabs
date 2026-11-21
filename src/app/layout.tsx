import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Anton, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Condensed display faces for the editorial hero
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "designlabs — Creative Design & Brand Agency",
  description:
    "designlabs is a premier creative design and brand agency crafting bold visual identities, memorable brand strategy, and high-performance digital platforms.",
  openGraph: {
    type: "website",
    title: "designlabs — Creative Design & Brand Agency",
    description:
      "designlabs is a premier creative design and brand agency crafting bold visual identities, memorable brand strategy, and high-performance digital platforms.",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1024,
        height: 739,
        alt: "designlabs — Creative Design & Brand Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "designlabs — Creative Design & Brand Agency",
    description:
      "designlabs is a premier creative design and brand agency crafting bold visual identities, memorable brand strategy, and high-performance digital platforms.",
    images: ["/images/og-preview.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/tab-icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/tab-icon.png",
    apple: "/images/tab-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${oswald.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen w-full overflow-x-hidden bg-[#050505] text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}

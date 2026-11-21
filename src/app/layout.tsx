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

export const metadata: Metadata = {
  title: "designlabs — Creative Design & Brand Agency",
  description:
    "designlabs is a premier creative design and brand agency crafting bold visual identities, memorable brand strategy, and high-performance digital platforms.",
  icons: {
    icon: "/images/logo-designlabs.png",
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

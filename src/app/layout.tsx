import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://codershubinc.com"),
  title: {
    default: "CodersHubInc | Swapnil Ingle",
    template: "%s | CodersHubInc",
  },
  description: "Backend Developer & Linux Enthusiast. Creator of Orbit, Quazaar, and VS Music. Building high-performance systems and open-source tools.",
  keywords: ["Swapnil Ingle", "CodersHubInc", "Backend Developer", "Go", "TypeScript", "Linux", "Open Source", "Software Engineer"],
  authors: [{ name: "Swapnil Ingle", url: "https://codershubinc.com" }],
  creator: "Swapnil Ingle",
  publisher: "CodersHubInc",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codershubinc.com",
    title: "CodersHubInc | Swapnil Ingle",
    description: "Backend Developer & Linux Enthusiast. Creator of Orbit, Quazaar, and VS Music.",
    siteName: "CodersHubInc",
    images: [
      {
        url: "https://codershubinc.com/api/og?slug=home",
        width: 1200,
        height: 630,
        alt: "CodersHubInc Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodersHubInc | Swapnil Ingle",
    description: "Backend Developer & Linux Enthusiast. Building high-performance systems and open-source tools.",
    creator: "@codershubinc",
    images: ["https://codershubinc.com/api/og?slug=home"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-[#0a0a0a]`}>
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
        {children}
      </body>
    </html>
  );
}

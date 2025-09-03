import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodersHub Inc - Smart, open-source utilities for the modern developer",
  description: "A collection of practical, open-source projects designed to solve real-world developer problems. Explore our suite of developer tools and utilities.",
  keywords: ["developer tools", "open source", "software utilities", "CodersHub Inc", "GitHub extensions", "developer productivity"],
  authors: [{ name: "Swapnil Ingle", url: "https://swapnilingle.com" }],
  creator: "Swapnil Ingle",
  publisher: "CodersHub Inc",
  openGraph: {
    title: "CodersHub Inc - Smart, open-source utilities for the modern developer",
    description: "A collection of practical, open-source projects designed to solve real-world developer problems.",
    url: "https://codershubinc.tech",
    siteName: "CodersHub Inc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodersHub Inc - Smart, open-source utilities for the modern developer",
    description: "A collection of practical, open-source projects designed to solve real-world developer problems.",
    creator: "@swapnilingle",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

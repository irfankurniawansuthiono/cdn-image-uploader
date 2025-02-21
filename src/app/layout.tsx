import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: 'device-width, initial-scale=1.0',
}
export const metadata: Metadata = {
  title: 'IrfanCDN - Upload and Share Images with Ease',
  description: 'IrfanCDN is a fast and reliable image uploader designed to help you store, manage, and share images effortlessly. With instant uploads and optimized delivery, it’s perfect for bloggers, developers, and content creators.',
  keywords: 'image uploader, CDN, content delivery network, image hosting, file sharing, NanamiCDN, fast upload, image optimization, developer tools',
  authors: [{ name: 'Irfan Kurniawan Suthiono', url: 'https://irfanks.site' }],
  creator: 'Irfan Kurniawan Suthiono',
  publisher: 'Irfan Kurniawan Suthiono',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://cdn.irfanks.site',
    title: 'IrfanCDN - Fast and Reliable Image Hosting',
    description: 'Upload, optimize, and share your images instantly with IrfanCDN. Built for speed, reliability, and ease of use, it’s the perfect solution for all your image hosting needs.',
    siteName: 'IrfanCDN',
    images: [
      {
        url: 'https://cdn.irfanks.site/images/cdn-og.jpg',
        width: 1200,
        height: 630,
        alt: 'IrfanCDN Image Uploader Interface',
      }
    ]
  },
  robots: 'index, follow',
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MediaProvider } from "@/contexts/MediaProvider";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animext",
  description: "An anime list web app built with Next and Tailwind.",
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
        <Suspense>
          <MediaProvider>
            <main className="min-h-screen h-full">
              <div className="m-auto pt-20 pb-8 max-w-[1520px]">
                {children}
              </div>
            </main>
          </MediaProvider>
        </Suspense>
      </body>
    </html>
  );
}

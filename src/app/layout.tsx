import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import { MediaProvider } from "@/contexts/MediaProvider";
import "./globals.css";
import { Suspense } from "react";

const overpass = Overpass({
  variable: "--font-overpass",
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
      <body className={`${overpass.variable} antialiased`}>
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

import { Suspense } from "react";
import { Toaster } from "sonner";
import { Overpass } from "next/font/google";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { MediaProvider } from "@/contexts/MediaProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${overpass.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <AppHeader />
          <Suspense>
            <MediaProvider>
              <main className="min-h-screen h-full">
                <div className="m-auto pt-20 pb-8 max-w-[1520px]">
                  {children}
                </div>
              </main>
            </MediaProvider>
          </Suspense>
          <AppFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
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
  title: "AuthNext Platform",
  description: "Minimalist authentication web app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-screen flex flex-col items-center justify-center bg-black text-[#e0e0e0] p-3 sm:p-6 selection:bg-[#565656] selection:text-[#ffffff]">
        <div className="w-full max-w-xl minimal-box flex flex-col my-auto overflow-hidden rounded-none border border-[#565656]">
          <Navbar />
          <main className="w-full flex-1 p-6 sm:p-8 flex flex-col justify-center">
            {children}
          </main>
          <Footer />
        </div>


        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#2b2b2b",
              color: "#e0e0e0",
              border: "1px solid #565656",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            },
          }}
        />
      </body>
    </html>
  );
}





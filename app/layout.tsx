import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense, use } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">{children}</body>
    </html>
  );
}

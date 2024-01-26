"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense, use, useEffect } from "react";
import "highlight.js/styles/github-dark.css"; // Or whichever style you prefer.
import hljs from "highlight.js";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { store } from "@/hooks/redux/store";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <body className="relative">
          <Provider store={store}>{children}</Provider>
        </body>
      </ConfigProvider>
    </html>
  );
}

// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // Import provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buyer Portal",
  description: "Manage your export orders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers> {/* Bungkus children */}
      </body>
    </html>
  );
}
import { Saira } from "next/font/google";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";

import "./globals.scss";

const saira = Saira({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CaJuFlix",
  description: "Site de busca de filmes",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={saira.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
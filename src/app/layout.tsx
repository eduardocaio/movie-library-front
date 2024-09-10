'use client';

import { useEffect, useState } from "react";
import { Saira } from "next/font/google";
import Head from "next/head";

import Navbar from "@/components/Navbar";

import "./globals.scss";

const saira = Saira({ subsets: ["latin"] });

const checkAuth = () => {
  return localStorage.getItem('TOKEN_API_BACKEND') !== null;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(checkAuth());
  }, []);

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Rede social de filmes" />
        <title>CaJuFlix</title>
      </Head>
      <body className={saira.className}> {/* Aplicando a fonte Saira */}
        <Navbar checkAuth={authenticated}/>
        {children}
      </body>
    </html>
  );
}
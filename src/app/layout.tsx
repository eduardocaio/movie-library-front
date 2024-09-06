'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/Navbar";
import Home from "./page";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });


const checkAuth = () => {
  if(localStorage.getItem('TOKEN_API_BACKENDD') != undefined){
    return true;
  }else{
    return false;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [pageLoaded, setPageLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(checkAuth());
  })

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar checkAuth={authenticated}/>
        {children}
        </body>
    </html>
  );
}

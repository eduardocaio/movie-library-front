'use client'

import React from 'react'
import { MdFavorite } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './navbar.styles';
import Link from 'next/link';



export default function Navbar() {

  const router = useRouter();

  const handleLoginClick = () =>{
    router.push('/auth/login');
  }

  const handleHomeClick = () =>{
    router.push('/');
  }

  const handleSignupClick = () =>{
    router.push('/auth/signup');
  }

  return (

    <HeaderContainer>
      <HeaderTitle onClick={handleHomeClick}>SOCIALFLIX</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Procurar</HeaderItem>
        <HeaderItem onClick={handleLoginClick}>Entrar</HeaderItem>
        <HeaderItem onClick={handleSignupClick}>Criar conta</HeaderItem>
        <HeaderItem><MdFavorite size={30} /></HeaderItem>
      </HeaderItems>
    </HeaderContainer >
  )
}

'use client'

import React from 'react'
import './index.scss';
import { MdFavorite } from "react-icons/md";
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './navbar.styles';

export default function Navbar() {
  return (
    <HeaderContainer>
      <HeaderTitle>BIBLIOTECA DE FILMES</HeaderTitle>
        <HeaderItems>
          <HeaderItem>Procurar</HeaderItem>
          <HeaderItem>Entrar</HeaderItem>
          <HeaderItem>Criar conta</HeaderItem>
          <HeaderItem><MdFavorite size={30} /></HeaderItem>
        </HeaderItems>
    </HeaderContainer>
  )
}

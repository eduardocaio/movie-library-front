'use client'

import React, { FunctionComponent } from 'react'
import { MdFavorite } from "react-icons/md";
import { useRouter } from 'next/navigation';

import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './navbar.styles';

interface NavbarProps{
  checkAuth: boolean;
}

const  Navbar: FunctionComponent<NavbarProps> = ({checkAuth}) => {

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
        
        {checkAuth ? 
          <HeaderItem>Nome do usuário</HeaderItem>  
          :
          <>
          <HeaderItem onClick={handleLoginClick}>Entrar</HeaderItem>
          <HeaderItem onClick={handleSignupClick}>Criar conta</HeaderItem>
          </> 
        }

        
        <HeaderItem><MdFavorite size={30} /></HeaderItem>
      </HeaderItems>
    </HeaderContainer >
  )
}

export default Navbar;

'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';

import './index.scss'; 

import CustomInput from '../CustomInput';
import CustomDropdown from '../Dropdown';

interface SearchForm {
  search: string;
}

interface DecodedToken {
  sub: string;
}

const Navbar = () => {

  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<SearchForm>();
  const [subject, setSubject] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('TOKEN_API_BACKEND');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setSubject(decoded.sub);
    }
  }, []);


  const handleHomeClick = () => {
    router.push('/');
  }

  const handleSubmitPress = (data: SearchForm) => {
    if (!data.search) return;
    router.push(`/search/${data.search}`);
    reset({ search: '' });
  }

  return (
    <div className='header-container'>
      <div className='header-left'>
        <img 
          src='/logo.png' 
          alt='Logo' 
          className='header-logo' 
          onClick={handleHomeClick} // Adicione o manipulador de clique aqui
        />
        <div className='header-title' onClick={handleHomeClick}>
          CAJUFLIX
        </div>
      </div>

      <div className='header-center'>
        <div className='header-search'>
          <CustomInput
            className='form-control'
            placeholder='Buscar por um filme...'
            {...register('search')}
            onEnterPress={handleSubmit(handleSubmitPress)}
          />
        </div>

        {subject ? (
          <CustomDropdown
            menuItems={[
              { label: 'Favoritos', action: 'favorites' },
              { label: 'Sair', action: 'logout' },
            ]}
          >
            {subject}
          </CustomDropdown>
        ) : (
          <CustomDropdown
            menuItems={[
              { label: 'Entrar', action: 'login' },
              { label: 'Criar Conta', action: 'signup' },
            ]}
          >
            Iniciar sessão
          </CustomDropdown>
        )}
      </div>
    </div>
  );
}

export default Navbar;

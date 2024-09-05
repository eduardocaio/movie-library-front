import React from 'react'
import './index.scss';
import { MdFavorite } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="header-container">
      <h2 className="header-title">Biblioteca de Filmes</h2>
      <div className="header-items">
        <div className="header-item">Procurar</div>
        <div className="header-item">Entrar</div>
        <div className="header-item">Criar conta</div>
        <div className="header-item"><MdFavorite size={30} /></div>
      </div>
    </div>
  )
}

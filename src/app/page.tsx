'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineMovieFilter } from "react-icons/md";
import { FaGrinStars } from "react-icons/fa";

import MovieList from '@/components/MoviesList';
import { Movie } from '@/types/movie';
import env from '@/config/env.config';
import CustomCarousel from '@/components/CustomCarousel';

import './index.scss';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(`${env.apiUrl}/movies`);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };

    getMovies();
  }, []);


  const topMovies = movies.slice(0, 3);

  return (
    <div className="home-container">

      <div className="highlight-title">
        <h2>{<MdOutlineMovieFilter size={50}/>} Em Destaque </h2>
      </div>

      <CustomCarousel movies={topMovies} />

      <div className="popular-title">
        <h2>{<FaGrinStars  size={45}/>} Os Mais Populares no Momento</h2>
      </div>

      <MovieList />
    </div>
  );
}

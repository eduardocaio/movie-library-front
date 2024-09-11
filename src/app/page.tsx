
'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

import MovieList from '@/components/MoviesList';
import { Movie } from '@/types/movie';
import env from '@/config/env.config';
import CustomCarousel from '@/components/CustomCarousel';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(`${env.apiUrl}/movies`);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const topMovies = movies.slice(0, 3);

  return (
    <div>
      
      <CustomCarousel movies={topMovies} />

      <MovieList />
    </div>
  );
}

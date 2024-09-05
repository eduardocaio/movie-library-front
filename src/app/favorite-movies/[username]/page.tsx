'use client'

import axios from 'axios';
import './index.scss';
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading';
import env from '@/config/env.config';
import MovieCard from '@/components/MovieCard';

interface Props{
    params: {username: string};
}


export default function MovieList({params}: Props) {
    
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        const {data} = await axios.get(`${env.apiUrl}/users/${params.username}/favorite-movies`);
        setMovies(data);
        setIsLoading(false);
    }

    if(isLoading){
        return (
            <div className="loading-container">
                    <ReactLoading type="spin" color="#6046FF" height={'5%'} width={'5%'} />
            </div>
        )
    }

    return(
        <ul className="movie-list">
            
            {movies.map((movie) => 
            <MovieCard 
                key={movie.id}
                movie={movie}
            />
            )}
            
        </ul>
    )
}
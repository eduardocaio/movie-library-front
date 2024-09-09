'use client'

import axios from "axios";
import ReactLoading from 'react-loading';
import { useEffect, useState } from "react";

import MovieCard from "@/components/MovieCard";
import env from "@/config/env.config";
import { Movie } from "@/types/movie";

import './index.scss';


interface Props{
    params: {query: string};
}

export default function Search ({params}: Props){
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        const {data} = await axios.get(`${env.apiUrl}/movies/search=${params.query}`);
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
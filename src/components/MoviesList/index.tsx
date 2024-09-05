import axios from 'axios';
import './index.scss';
import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading';
import env from '@/config/env.config';


export default function MovieList() {
    
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        const {data} = await axios.get(`${env.apiUrl}/movies`);
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
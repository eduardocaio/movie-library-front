'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import ReactLoading from 'react-loading';

import StarRating from "@/components/StarRating";
import env from "@/config/env.config";
import type { Movie } from "@/types/movie";
import CustomButton from "@/components/CustomButton";

import './index.scss';
import CustomAlert from "@/components/CustomAlert";

const checkAuth = () => {
    return localStorage.getItem('TOKEN_API_BACKEND') !== null;
}

interface Props {
    params: { id: number };
}

interface DecodedToken {
    sub: string;
}

const Movie = ({ params }: Props) => {

    let movieEmpty: Movie = {
        id: 0,
        title: '',
        poster_path: '',
        overview: '',
        vote_average: 0
    }

    const [movie, setMovie] = useState<Movie>(movieEmpty);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [subject, setSubject] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userFavoriteMovies, setUserFavoriteMovies] = useState<Movie[]>([]);
    const router = useRouter();
    const [alertInfo, setAlertInfo] = useState<{ variant: string; message: string } | null>(null);

    useEffect(() => {
        if (alertInfo) {
            const timer = setTimeout(() => {
                setAlertInfo(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alertInfo]);

    useEffect(() => {
        const token = localStorage.getItem('TOKEN_API_BACKEND');
        if (token) {
            const decoded: DecodedToken = jwtDecode(token);
            setSubject(decoded.sub);
            setAuthenticated(checkAuth());
            getFavoriteMovies(decoded.sub);
        } else {
            setAuthenticated(false);
        }
    }, []);

    const getFavoriteMovies = async (userId: string) => {
        try {
            const { data } = await axios.get(`${env.apiUrl}/users/${userId}/favorite-movies`);
            setUserFavoriteMovies(data);
        } catch (error) {
            console.error('Erro ao buscar filmes favoritos do usuário:', error);
        }
    };

    const getMovie = async () => {
        try {
            const { data } = await axios.get(`${env.apiUrl}/movies/${params.id}`);
            setMovie(data);
            setIsLoading(false);
        } catch (error) {
            setAlertInfo({
                variant: 'danger',
                message: 'Erro ao buscar o filme selecionado'
            });
        }
    }

    useEffect(() => {
        getMovie();
    }, []);

    const isFavorite = userFavoriteMovies.some(favoriteMovie => favoriteMovie.id === movie.id);

    const handleAddFavorite = async () => {
        if (!subject) return;

        const token = localStorage.getItem('TOKEN_API_BACKEND');

        try {
            await axios.put(`${env.apiUrl}/users/${subject}/add-movie/${movie.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            getFavoriteMovies(subject);
        } catch (error) {
            const token = localStorage.removeItem('TOKEN_API_BACKEND');
            window.location.reload()

            window.location.href = '/auth/login'
        }
    }

    const handleRemoveFavorite = async () => {
        if (!subject) return;

        const token = localStorage.getItem('TOKEN_API_BACKEND');

        try {
            await axios.put(`${env.apiUrl}/users/${subject}/remove-movie/${movie.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getFavoriteMovies(subject);
        } catch (error) {
            const token = localStorage.removeItem('TOKEN_API_BACKEND');
            window.location.reload()

            window.location.href = '/auth/login'
        }
    }

    const handleMoveLogin = () => {
        router.push('/auth/login');
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <ReactLoading type="spin" color="#6046FF" height={'5%'} width={'5%'} />
            </div>
        )
    }

    return (
        <>
            <div>
                {alertInfo && <CustomAlert variant={alertInfo.variant} message={alertInfo.message} />}
            </div>
            <div className="movie-page">
                <p className="tagline">{movie.title}</p>
                <div className="movie-content">
                    <div className="movie-background">
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                    </div>
                    <div className="movie-description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Descrição:
                        </h3>
                        <p>{movie.overview}</p>
                        <p>
                            {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
                        </p>
                        <div className="favorite-button">
                            {authenticated ? (
                                <CustomButton startIcon={<FaHeart size={18} />} onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}>
                                    {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                                </CustomButton>
                            ) : (
                                <CustomButton startIcon={<FaHeart size={18} />} onClick={handleMoveLogin}>
                                    Adicionar aos favoritos
                                </CustomButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Movie;
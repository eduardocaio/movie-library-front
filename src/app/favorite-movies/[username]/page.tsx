'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";

import env from '@/config/env.config';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

import './index.scss';
import CustomButton from '@/components/CustomButton';
import CustomAlert from '@/components/CustomAlert';

interface Props {
    params: { username: string };
}

export default function MovieList({ params }: Props) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
        getMovies();
    }, []);

    const getMovies = async () => {
        const { data } = await axios.get(`${env.apiUrl}/users/${params.username}/favorite-movies`);
        setMovies(data);
        setIsLoading(false);
    };

    const handleShareOnWhatsApp = () => {
        const currentUrl = encodeURIComponent(window.location.href);
        const whatsappUrl = `https://api.whatsapp.com/send?text=Confira este link: ${currentUrl}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleCopyToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
                setAlertInfo({
                    variant: 'success',
                    message: 'Link copiado para área de transferência!'
                });
            })
            .catch((error) => {
                setAlertInfo({
                    variant: 'danger',
                    message: 'Erro ao copiar o link para área de transferência!'
                });
            });
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <ReactLoading type="spin" color="#6046FF" height={'5%'} width={'5%'} />
            </div>
        );
    }

    return (
        <>
            <div>
                {alertInfo && <CustomAlert variant={alertInfo.variant} message={alertInfo.message} />}
            </div>

            <p className="tagline">LISTA DE FAVORITOS: {params.username}</p>
            <div className='share-buttons'>
                <CustomButton startIcon={<IoLogoWhatsapp size={18} />} onClick={handleShareOnWhatsApp}>
                    Compartilhar no WhatsApp
                </CustomButton>
                <CustomButton startIcon={<FaShareAlt size={18} />} onClick={handleCopyToClipboard}>
                    Copiar link
                </CustomButton>
            </div>

            <ul className="movie-list">
                {movies.map((movie) =>
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                )}
            </ul>
        </>
    );
}

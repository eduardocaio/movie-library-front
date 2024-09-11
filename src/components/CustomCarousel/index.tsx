/* eslint-disable @next/next/no-img-element */
import Carousel from 'react-bootstrap/Carousel';
import { Movie } from '@/types/movie';

interface CustomCarouselProps {
    movies: Movie[];
}

function CustomCarousel({ movies }: CustomCarouselProps) {
    return (
        <Carousel fade style={{ maxWidth: '100%', margin: '0 auto' }}>
            {movies.map((movie) => (
                <Carousel.Item
                    key={movie.id}
                    style={{
                        position: 'relative',
                        textAlign: 'center',
                        marginTop: '30px' // Ajuste o valor conforme necessário
                    }}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        style={{
                            width: '30%', // Tamanho fixo da imagem
                            height: 'auto',
                            objectFit: 'cover'
                        }}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CustomCarousel;

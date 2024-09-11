/* eslint-disable @next/next/no-img-element */
import Carousel from 'react-bootstrap/Carousel';
import { Movie } from '@/types/movie';
import { useRouter } from 'next/navigation';

interface CustomCarouselProps {
    movies: Movie[];
}

function CustomCarousel({ movies }: CustomCarouselProps) {

    const router = useRouter();

    const handleMoreDetailsPress = (movieId: number) => {
        router.push(`/movie/${movieId}`);
    }

    return (
        <Carousel fade style={{ maxWidth: '100%', margin: '0 auto' }}>
            {movies.map((movie) => (
                <Carousel.Item
                    key={movie.id}
                    style={{
                        position: 'relative',
                        textAlign: 'center',
                        marginTop: '30px',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleMoreDetailsPress(movie.id)}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        style={{
                            width: '30%',
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

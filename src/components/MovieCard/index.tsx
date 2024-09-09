import { Movie } from "@/types/movie"
import { useRouter } from "next/navigation"

import StarRating from "../StarRating"
import './index.scss'

export interface Props {
    movie: Movie
}

export default function MovieCard(props: Props) {
    const { movie } = props;
    const router = useRouter();

    const handleMoreDetailsPress = () => {
        router.push(`/movie/${movie.id}`);
    }

    return (
        <>
            <li className='movie-card'>
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                </div>

                <div className="movie-infos">
                    <p className="movie-title">{movie.title}</p>
                    <p>
                        {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
                    </p>
                    <div className="hidden-content">
                        {movie.overview && (
                            <p className='description'>
                                {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
                            </p>
                        )}

                        <button className="button-default" onClick={handleMoreDetailsPress}>
                            Ver mais
                        </button>
                    </div>
                </div>
            </li>

        </>
    );
}

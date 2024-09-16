import { Actor } from "@/types/actor";

import './index.scss';

export interface Props {
    actor: Actor
}

export default function ActorCard(props: Props) {
    const { actor } = props;

    const hasImage = !!actor.profile_path;

    return (
        <div className='actor-card'>
            <div className="actor-path">
                {hasImage ? (
                    <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.name} />
                ) : (
                    <div className="placeholder-image">Sem imagem</div>
                )}
            </div>

            <div className="actor-infos">
                <p className="actor-name">{actor.name}</p>
                <p className="actor-character">{actor.character}</p>
            </div>
        </div>
    );
}

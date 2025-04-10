import { Link } from "react-router-dom";
import "./SmallCard.css"

function SmallCard({ character }) {
    return (
        <div className='small-card'>
            <div className='small-card-image'>
                <img src={character.image} alt={character.name} />
            </div>
            <div className='small-card-info'>
                <h1 className='card-title'>{character.name}</h1>
                <ul className='card-details'>
                    <li><span>species: </span><span className='detail'>{character.species}</span></li>
                    <li><span>gender: </span><span className='detail'>{character.gender}</span></li>
                    <li><span>status: </span><span className='detail'>{character.status}</span></li>
                </ul>
                <div className='card-button'>
                    <Link to={`/character/${character.id}`}>LEARN MORE</Link>
                </div>
            </div>
        </div>
    )
}

export default SmallCard;
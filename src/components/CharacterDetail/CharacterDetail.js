import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "./CharacterDetail.css";
import { useEffect, useState } from 'react';

function CharacterDetail() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                const data = await res.json();
                setCharacter(data);
            } catch (err) {
                console.error("Failed to fetch character by id:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    
  if (loading) return <p>Loading character info...</p>;
  if (!character) return <p>Character not found.</p>;

    return (
        <div className='details-card'>
            <div className='details-card-image'>
                <img src={character.image} alt={character.name} />
            </div>
            <div className='details-card-info'>
                <h1 className='details-card-title'>{character.name}</h1>
                <ul className='details-card-details'>
                    <li><span>species: </span><span className='detail-item'>{character.species}</span></li>
                    <li><span>gender: </span><span className='detail-item'>{character.gender}</span></li>
                    <li><span>status: </span><span className='detail-item'>{character.status}</span></li>
                    <li><span>origin: </span><span className='detail-item'>{character.origin.name}</span></li>
                    <li><span>location: </span><span className='detail-item'>{character.location.name}</span></li>
                    <li><span>created: </span><span className='detail-item'>{new Date(character.created).toUTCString()}</span></li>
                </ul>
                <div className='details-card-button'>
                    <Link to={`/`}>GO BACK</Link>
                </div>
            </div>
        </div>
    )
}

export default CharacterDetail;
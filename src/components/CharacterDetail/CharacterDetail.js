import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "./CharacterDetail.css";
import { useEffect, useState } from 'react';

function extractLocationId(location) {
    if (location) {
        const id = location.split('/').pop();
        if (id && !isNaN(id)) {
            return id;
        }
    }
    return null;
}

function CharacterDetail() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locationDetails, setLocationDetails] = useState(null);
    const [originDetails, setOriginDetails] = useState(null);
    const [locationId, setLocationId] = useState();
    const [originId, setOriginId] = useState();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                const data = await res.json();
                setCharacter(data);

                const locationId = extractLocationId(data.location.url);
                if (locationId) {
                    fetch(`https://rickandmortyapi.com/api/location/${locationId}`)
                        .then(res => res.json())
                        .then(setLocationDetails)
                        .catch(err => console.error("Location fetch error:", err));

                    setLocationId(locationId);
                }

                const originId = extractLocationId(data.origin.url);
                if (originId) {
                    fetch(`https://rickandmortyapi.com/api/location/${originId}`)
                        .then(res => res.json())
                        .then(setOriginDetails)
                        .catch(err => console.error("Origin fetch error:", err));

                    setOriginId(originId);
                }
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
                    <li><span>origin: </span>
                        {character && originId ? (
                            <Link className="detail-item" to={`/location/${originId}`} state={{ originDetails, characterId: character?.id }}>
                                {character.origin.name}
                            </Link>
                        ) : (
                            <span className='detail-item'>{character.origin.name}</span>
                        )}</li>
                    <li><span>location: </span>
                        {character && locationId ? (
                            <Link className="detail-item" to={`/location/${locationId}`} state={{ locationDetails, characterId: character?.id}}>
                                {character.location.name}
                            </Link>
                        ) : (
                            <span className='detail-item'>{character.location.name}</span>
                        )}
                    </li>
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
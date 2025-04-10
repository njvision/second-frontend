import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SmallCard from '../SmallCard/SmallCard';
import "./LocationDetail.css";


function LocationDetail() {
    const location = useLocation();
    const dataLocationOrOrigin = location.state?.locationDetails || location.state?.originDetails || null;
    const title = location.state?.locationDetails ? "location" : "origin";
    const characterId = location.state?.characterId || null;
    const [character, setCharacter] = useState(null);
    const [characterList, setCharacterList] = useState([]);

    function extractCharacterIds(residentUrls) {
        return residentUrls
            .map(url => url.split('/').pop())
            .filter(id => id && !isNaN(id))
            .join(',');
    }

    useEffect(() => {
        if (!characterId) return;

        const fetchCharacter = async () => {
            try {
                const res = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
                const data = await res.json();
                setCharacter(data);
            } catch (err) {
                console.error("Failed to fetch character by id:", err);
            }
        };

        fetchCharacter();
    }, [characterId]);

    useEffect(() => {
        if (!dataLocationOrOrigin || !dataLocationOrOrigin.residents?.length) return;

        const idList = extractCharacterIds(dataLocationOrOrigin.residents)
        if (!idList) return;

        const fetchCharacters = async () => {
            try {
                const res = await fetch(`https://rickandmortyapi.com/api/character/${idList}`);
                const data = await res.json();
                setCharacterList(Array.isArray(data) ? data : [data]);
            } catch (err) {
                console.error("Failed to fetch character by ids:", err);
            }
        };

        fetchCharacters();
    }, [dataLocationOrOrigin]);

    if (!dataLocationOrOrigin) {
        return (
            <div className="location-detail">
                <p>Location data not available. Please navigate from a character card.</p>
            </div>
        );
    }

    return (
        <div className="location-detail-container">
            <div className="location-detail">
                <h1>{dataLocationOrOrigin.name}</h1>
                <p>{dataLocationOrOrigin.type}</p>
                <p>dimension: {dataLocationOrOrigin.dimension}</p>
                <p>created: {dataLocationOrOrigin.created}</p>
            </div>
            {character && <SmallCard character={character} />}
           <div className="results-row">
            {characterList.length > 0 ? (
                <p className="residents-count">and {characterList.length - 1} more residents of this location:</p>
            ) : (
                <p className="residents-count">Wasn't found any resident...</p> 
            )}
           </div>
            {characterList.length > 0 ? (
                <div className='card-grid'>
                    {characterList
                    .filter(char => char.id !== Number(characterId))
                    .map((char) => (
                        <SmallCard character={char} />
                    ))}
                </div>
            ) : (
                <p>Empty...</p>
            )}
        </div>

    );
}

export default LocationDetail;

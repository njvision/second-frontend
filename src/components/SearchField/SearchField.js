import "./SearchField.css"
import DropdownNavField from "../DropdownNavField/DropdownNavField"
import InputNavField from "../InputNavField/InputNavField";
import Button from "../Button/Button";
import ResultsList from "../ResultsList/ResultsList"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const speciesOptions = [
    'All', 'Alien', 'Animal', 'Cronenberg', 'Disease', 'Human',
    'Humanoid', 'Mythological Creature', 'Planet', 'Poopybutthole', 'Robot', 'Unknown'
];

const genderOptions = ['All', 'Male', 'Female', 'Genderless', 'Unknown'];
const statusOptions = ['All', 'Alive', 'Dead', 'Unknown'];

function SearchField({ setResults }) {
    const [filters, setFilters] = useState({
        name: '',
        type: '',
        species: 'All',
        gender: 'All',
        status: 'All'
    });

    const [infoResults, setInfoResults] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const name = searchParams.get("name") || "";
        const type = searchParams.get("type") || "";
        const species = searchParams.get("species") || "All";
        const gender = searchParams.get("gender") || "All";
        const status = searchParams.get("status") || "All";

        setFilters({ name, type, species, gender, status });
    }, []);

    useEffect(() => {
        const fetchCharacters = async () => {
            const params = new URLSearchParams({
                name: filters.name,
                type: filters.type,
                species: filters.species === "All" ? "" : filters.species,
                gender: filters.gender === "All" ? "" : filters.gender,
                status: filters.status === "All" ? "" : filters.status,
                page: searchParams.get("page") || "1"
            });

            const url = `https://rickandmortyapi.com/api/character/?${params.toString()}`;

            try {
                const res = await fetch(url);
                const data = await res.json();
                setInfoResults(data.info || []);
                setResults(data.results || []);
            } catch (err) {
                console.error("GET request error", err);
                setInfoResults([]);
                setResults([]);
            }
        };

        fetchCharacters();
    }, [filters]);

    const handChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }))
    };

    const handleReset = () => {
        setFilters({
            name: '',
            type: '',
            species: 'All',
            gender: 'All',
            status: 'All'
        });
        setInfoResults([]);
        setResults([]);
    };

    return (
        <div className="filter-container">
            <form className="character-container" method="GET" action="">
                <div className="filter-search-row">
                    <InputNavField
                        name="name"
                        label="Character name"
                        value={filters.name}
                        onChange={(e) => handChange('name', e.target.value)} />

                    <InputNavField
                        name="type"
                        label="Character type"
                        value={filters.type}
                        onChange={(e) => handChange('type', e.target.value)} />

                    <DropdownNavField
                        name="species"
                        label="Character species"
                        options={speciesOptions}
                        defaultValue={filters.species}
                        onChange={(val) => handChange('species', val.target.value)} />

                    <DropdownNavField
                        name="gender"
                        label="Character gender"
                        options={genderOptions}
                        defaultValue={filters.gender}
                        onChange={(val) => handChange('gender', val.target.value)} />

                    <DropdownNavField
                        name="status"
                        label="Character status"
                        options={statusOptions}
                        defaultValue={filters.status}
                        onChange={(val) => handChange('status', val.target.value)} />
                </div>
                <div className="button-reset-row">
                    <Button onClick={handleReset} />
                </div>
            </form>

            <ResultsList infoResults={infoResults} />
        </div>
    );
}

export default SearchField;
import "./SearchField.css"
import DropdownNavField from "../DropdownNavField/DropdownNavField"
import InputNavField from "../InputNavField/InputNavField";
import Button from "../Button/Button";
import ResultsList from "../ResultsList/ResultsList"
import { useState } from "react";

const speciesOptions = [
    'All', 'Alien', 'Animal', 'Cronenberg', 'Disease', 'Human',
    'Humanoid', 'Mythological Creature', 'Planet', 'Poopybutthole', 'Robot', 'Unknown'
];

const genderOptions = ['All', 'Male', 'Female', 'Genderless', 'Unknown'];
const statusOptions = ['All', 'Alive', 'Dead', 'Unknown'];

function SearchField() {
    const [filters, setFilters] = useState({
        name: '',
        type: '',
        species: 'All',
        gender: 'All',
        status: 'All'
    });

    const [results, setResults] = useState([]);

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
        setResults([]);
    };

    return (
        <div className="filter-container">
            <form className="character-container" method="GET" action="/filter">
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

            <ResultsList results={results} />
        </div>
    );
}

export default SearchField;
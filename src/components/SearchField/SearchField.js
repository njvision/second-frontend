import "./SearchField.css"
import DropdownNavField from "../DropdownNavField/DropdownNavField"
import InputNavField from "../InputNavField/InputNavField";

const speciesOptions = [
    'All', 'Alien', 'Animal', 'Cronenberg', 'Disease', 'Human',
    'Humanoid', 'Mythological Creature', 'Planet', 'Poopybutthole', 'Robot', 'Unknown'
];

const genderOptions = ['All', 'Male', 'Female', 'Genderless', 'Unknown'];
const statusOptions = ['All', 'Alive', 'Dead', 'Unknown'];

function SearchField() {
    return (
        <form className="character-container" method="GET" action="/filter">
            <InputNavField
                name="name"
                label="Character name" />
                
            <InputNavField
                name="type"
                label="Character type" />

            <DropdownNavField
                name="species"
                label="Character species"
                options={speciesOptions} />

            <DropdownNavField
                name="gender"
                label="Character gender"
                options={genderOptions} />

            <DropdownNavField
                name="status"
                label="Character status"
                options={statusOptions} />
        </form>
    );
}

export default SearchField;
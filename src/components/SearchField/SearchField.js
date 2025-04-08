import "./SearchField.css"

function SearchField () {
    return (
        <div className="character-container" >
            <form className="character-box" method="GET" action="/filter">
                <label for="character-input" className="character-label">Character name</label>
                <input class="character-input" type="text" name="name"></input>
            </form>
            <form className="character-box" method="GET" action="/filter">
                <label for="character-input" className="character-label">Character type</label>
                <input class="character-input" type="text" name="type"></input>
            </form>
        </div>
    );  
}

export default SearchField;
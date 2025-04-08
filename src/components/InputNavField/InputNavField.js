function InputNavField({ name, label }) {
    return (<div className="character-box">
        <label htmlFor="character-input" className="character-label">{label}</label>
        <input className="character-input" type="text" name={name}></input>
    </div>
    )
}

export default InputNavField;
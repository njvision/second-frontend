function InputNavField({ name, label, value, onChange }) {
    return (<div className="character-box">
        <label htmlFor="character-input" className="character-label">{label}</label>
        <input className="character-input" type="text" name={name} value={value} onChange={onChange}></input>
    </div>
    )
}

export default InputNavField;
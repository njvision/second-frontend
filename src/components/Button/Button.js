import "./Button.css"

function Button({onClick}) {
    return (
        <div className="button">
            <button type="button" className="reset-button" onClick={onClick}>
                Reset Filters
            </button>
        </div>
    )
}

export default Button;
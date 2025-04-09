import "./ResultsList.css";

function ResultsList({ infoResults }) {
    return (
        <div className="results-row">
            {infoResults.count > 0 ? (     
                <p>Found {infoResults.count} characters</p>) 
                : (
                <p>No charachter found.</p>
                )}

        </div>
    );
}

export default ResultsList;
function ResultsList({ results }) {
    return (
        <div className="results-row">
            {results.length > 0 ? (     
                <p>Found {results.lenght} characters</p>) 
                : (
                <p>No charachter found.</p>
                )}

        </div>
    );
}

export default ResultsList;
import SmallCard from '../SmallCard/SmallCard';
import SearchField from '../SearchField/SearchField';
import { useState } from "react";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  console.log(results);

  return (
    <div className="App">
      <nav className="nav">
        <SearchField setResults={setResults} />
      </nav>
      <main className="card-grid">
      {results.length > 0 ? (
          results.map((character) => (
            <SmallCard character={character} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </main>
    </div>
  );
}

export default App;

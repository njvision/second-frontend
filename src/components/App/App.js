import { Routes, Route } from "react-router-dom";
import SmallCard from '../SmallCard/SmallCard';
import SearchField from '../SearchField/SearchField';
import Pagination from '../Pagination/Pagination';
import CharacterDetail from "../CharacterDetail/CharacterDetail";
import LocationDetail from "../LocationDetail/LocationDetail";
import { useState } from "react";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [infoResults, setInfoResults] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  console.log(results);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <nav className="nav">
              <SearchField
                setResults={setResults}
                setInfoResults={setInfoResults}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                infoResults={infoResults} />
            </nav>
            <main className="card-grid">
              {results.length > 0 ? (
                results.map((character) => (
                  <SmallCard character={character} />
                ))
              ) : (
                <p>Empty...</p>
              )}
            </main>
            <footer className="footer">
              <Pagination
                currentPage={currentPage}
                totalPages={infoResults.pages || 1}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </footer>
          </>
        }
        />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/location/:id" element={<LocationDetail />} />
      </Routes>
    </div>
  );
}

export default App;

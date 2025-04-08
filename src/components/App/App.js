import SmallCard from '../SmallCard/SmallCard';
import SearchField from '../SearchField/SearchField';

function App() {
  return (
    <div className="App">
      <nav className="nav">
        <SearchField />
      </nav>
      <main>
        <SmallCard />
      </main>
    </div>
  );
}

export default App;

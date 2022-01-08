import './App.css';
import SearchBar from './components/SearchBar';
import CodeSnippet from './components/CodeSnippet';
import { useState, useEffect } from 'react';

function App() {
  const [codeSnippets, setCodeSnippets] = useState([]);


  useEffect(() => {
    fetch("/api/getCodeSnippets")
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "OK") {
          setCodeSnippets(data.codeSnippets);
        }
      });
  }, []);


  return (
    <div className="App">
      <SearchBar />
      <div className='snippets'>
        {codeSnippets.map((codeSnippet) => {
          return <CodeSnippet key={codeSnippet.id} codeSnippet={codeSnippet} />;
        })}
      </div>
    </div>
  );
}

export default App;

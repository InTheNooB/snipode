import './App.css';
import SearchBar from './components/SearchBar';
import CodeSnippet from './components/CodeSnippet';
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Axios from 'axios'

function App() {


  useEffect(() => {
    const socket = io(`:3002`);
    socket.on('newCodeSnippet', (codeSnippets) => {
      setCodeSnippets(codeSnippets);
    });
    return () => socket.close();
  }, []);


  const swalPopup = (languagesList) => {
    let optionsTag = languagesList.reduce((acc, curr) => {
      return acc += `<option value="${curr.value}">${curr.displayName}</option>`;
    }, '');
    return Swal.fire({
      title: 'Add code snippet',
      html:
        `
        <input class="swal2-input" id="swal-input-title" placeholder="Title" type="text">
        <input class="swal2-input" id="swal-input-description" placeholder="Description" type="text">
        <select class="swal2-select" id="swal-input-language">
        ${optionsTag}
        </select>
        <textarea aria-label="Your code here..." class="swal2-textarea" placeholder="Your code here..." id="swal-input-code"></textarea>
        `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById('swal-input-title').value,
          description: document.getElementById('swal-input-description').value,
          language: document.getElementById('swal-input-language').value,
          code: document.getElementById('swal-input-code').value
        }
      }
    });
  }
  // Load code snippets
  const [codeSnippets, setCodeSnippets] = useState([]);

  const addCodeSnippet = async () => {
    let languagesListAPIResponse = await fetch('/api/getLanguagesList').then(res => res.json());
    if (languagesListAPIResponse.result === 'OK') {
      let data = await swalPopup(languagesListAPIResponse.languagesList);
      if (!data.value.title || !data.value.language || !data.value.code) {
        return;
      }
      Axios.post("/api/addCodeSnippet", data.value).then((res) => {
        if (res.data.result === "OK" && res.data.codeSnippets) {
          setCodeSnippets(res.data.codeSnippets);
        }
      });
    } else {
      console.log('ERROR');
    }
  }


  useEffect(() => {
    fetch("/api/getCodeSnippets")
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "OK") {
          setCodeSnippets(data.codeSnippets);
        }
      });
  }, []);

  const search = (text) => {
    let words = text.split(' ');
    setCodeSnippets(codeSnippets.map((codeSnippet) => {
      let containsAtLeastOneDifferent = false;
      words.forEach(word => {
        containsAtLeastOneDifferent = containsAtLeastOneDifferent
          || (!codeSnippet.title.toLowerCase().includes(word.toLowerCase())
            && !codeSnippet.description.toLowerCase().includes(word.toLowerCase())
            && !codeSnippet.language.toLowerCase().includes(word.toLowerCase())
            && !String(codeSnippet.id).toLowerCase().includes(word.toLowerCase()));
      });

      return {
        ...codeSnippet,
        hidden: containsAtLeastOneDifferent
      };
    }));
  };

  return (
    <div className="App">
      <SearchBar addCodeSnippet={addCodeSnippet} search={search} />
      <div className='snippets'>
        {codeSnippets.map((codeSnippet) => {
          return !codeSnippet.hidden ? <CodeSnippet key={codeSnippet.id} codeSnippet={codeSnippet} /> : <></>;
        })}
      </div>
    </div>
  );
}

export default App;

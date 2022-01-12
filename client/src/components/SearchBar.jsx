import { useState } from 'react';
import './css/SearchBar.css';

const SearchBar = ({ addCodeSnippet, search }) => {

    const [searchBarText, setSearchBarText] = useState("");

    const searchBarChange = (text) => {
        setSearchBarText(text);
        search(text);
    };

    return (
        <div className='header'>
            <div className='side-item'></div>
            <form className='searchbar'>
                <input type='search' value={searchBarText} onChange={(e) => searchBarChange(e.target.value)} data-search />
            </form>
            <div className='add-code-snippet side-item' onClick={addCodeSnippet}><div className='inside-button'>Add</div></div>
        </div>
    )
}

export default SearchBar

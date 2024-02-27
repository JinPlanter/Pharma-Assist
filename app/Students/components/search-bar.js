import React, {useState} from 'react'

const SearchBar = ({ data }) => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    
    const handleSearchInput = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);

        if (searchInput.length > 0) {
            const results = data.filter((val) => {
                return(
                val.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                val.class.toLowerCase().includes(searchInput.toLowerCase()) ||
                val.studentid.includes(searchInput)
                );
            });
            setSearchResults(results);
            console.log("search results: ",searchResults);
        }
        else{
            setSearchResults([]);
        
        }
    };


    
    return (
        <div>
            <input className = "text-black" type="text" placeholder="Search..." value={searchInput} onChange={handleSearchInput} />
            {searchResults.length > 0 && (
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>
                        <div>
                            <p>{result.name}</p>
                            <p>{result.class}</p>
                            <p>{result.studentid}</p>
                        </div>
                    </li>
                ))}
            </ul>
        )}
        </div>
        
    )
    
}

export default SearchBar
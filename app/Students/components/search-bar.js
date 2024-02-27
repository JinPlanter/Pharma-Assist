import React, {useState, useEffect} from 'react'
import styles from './search-bar.module.css'

const SearchBar = ({ data }) => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
        handleSearchInput();
    }, [searchInput]);


    // score search results by category, top score is displayed on top of list
    // most unique identifier: studentid > class > name
    const calculateScore = (val) => {
        const nameScore = val.name.toLowerCase().includes(searchInput.toLowerCase()) ? 1 : 0;
        const classScore = val.class.toLowerCase().includes(searchInput.toLowerCase()) ? 2 : 0;
        const studentIdScore = val.studentid.includes(searchInput) ? 3 : 0; // most unique identifier thus highest score

        return nameScore + classScore + studentIdScore;
    }
    

    const handleSearchInput = () => {
        if (searchInput.length > 0) {
            const results = data
            .map((val) => ({...val, score: calculateScore(val)}))
            .filter((val) => val.score > 0)
            .sort((a, b) => b.score - a.score);
            setSearchResults(results);
            console.log("search results: ",searchResults);
        }
        else{
            setSearchResults([]);
        
        }
    };



    return (
        <div className={styles.container}>
            <input 
            className = {`${styles.inputBox} "text-black` }
            type="text" 
            placeholder="Search..." 
            value={searchInput} 
            onChange={(event)=> setSearchInput(event.target.value)} 
            />
            {searchResults.length > 0 && (
            <ul className = {`${styles.searchResults}` }>
                {searchResults.map((result) => (
                    <li className={styles.studentDetails} key={result.id}>
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
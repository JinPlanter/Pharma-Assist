import React, {useState, useEffect} from 'react'
//import styles from './search-bar.module.css'

import Link from 'next/link';

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
        }
        else{
            setSearchResults([]);
        }
    };





    return (
    <div className="p-4 bg-custom-gray">
        <label className="input input-bordered flex items-center gap-2">
            <input 
            type="text" 
            className="grow" 
            placeholder="Search"
            onChange = {(event) => setSearchInput(event.target.value)} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>

      {searchResults.length > 0 && (
        <div className="bg-custom-green">
          <table className="table">
            <thead className="">
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Student ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                  <tr className="hover">
                    <td>{result.name}</td>
                    <td>{result.class}</td>
                    <td>{result.studentid}</td>
                    <td>
                        <Link 
                        href={`/Students/${result.studentid}`}
                        className='link link-hover'>
                            View
                        </Link>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default SearchBar
import React, { useState, useEffect } from "react";
import Link from "next/link";

const SearchBar = ({ data }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  
  // Function to filter initial Data of api route based on search input
  const filterInitialData = (theData) => {
    // filter the data based on the search input
    return theData.filter((student) =>
      student.hasOwnProperty('id') &&
      student.hasOwnProperty('name') &&
      student.hasOwnProperty('class') &&
      (
        student.name.toLowerCase().includes(searchInput.toLowerCase()) || 
        student.class.toLowerCase().includes(searchInput.toLowerCase()) ||
        searchInput.includes(student.id)
        )
    );
  };


  // function to calculate the score of the search results
  const calculateScore = (val) => {
    const nameScore = val.name?.toLowerCase().includes(searchInput.toLowerCase()) ? 2 : 0;
    const classScore = val.class?.toLowerCase().includes(searchInput.toLowerCase()) ? 1 : 0;
    const idScore = searchInput.includes(val.id) ? 3 : 0;
    return nameScore + classScore + idScore;
  }

  // use calculateScore on filteredData to sort the results
  const sortData = (filteredData) => {
    // calculate the score for each item in the filteredData and add it to the object
    const dataWithScore = filteredData.map((val) => {
      return {
        ...val,
        score: calculateScore(val),
      };
    });

    // sort the filteredData based on the score
    return dataWithScore.sort((a, b) => b.score - a.score);
  };

  // useEffect to update searchResults when searchInput changes
  useEffect(() => {
    if (searchInput.length > 0) {
      const filteredData = filterInitialData(data);
      const sortedData = sortData(filteredData);
      setSearchResults(sortedData);
    }else{
      setSearchResults([]);
    }
  }, [searchInput, data]);


  return (
    <div className="p-4 bg-custom-gray">
        <label className="input input-bordered flex items-center gap-2 text-custom-beige ">
            <input 
            type="text" 
            className="grow" 
            placeholder="Search by name, class or student ID"
            onChange = {(event) => setSearchInput(event.target.value)} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>

      {searchResults.length > 0 && (
        <div className="bg-custom-green">
          <table className="table text-custom-beige">
            <thead className="font-extrabold">
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Student ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((student) => (
                  <tr key={student.id} className="hover text-custom-beige">
                    <td>{student.name}</td>
                    <td>{student.class}</td>
                    <td>{student.id}</td>
                    <td>
                        <Link 
                        href={`/Students/${student.id}`}
                        className='link link-hover'
                        >
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
};

export default SearchBar;

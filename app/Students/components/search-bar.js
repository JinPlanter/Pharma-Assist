import React, { useState, useEffect } from "react";
import Link from "next/link";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";

const SearchBar = ({ data }) => {
  const [initialData, setInitialData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  
  // Function to filter initial Data of api route based on search input
  const filterInitialData = () => {
    const filteredData = data.filter((student) => {
      if (student.fileContentJson && 
        Array.isArray(student.fileContentJson)) {
        return student.fileContentJson.some(
          (item) =>
            item.hasOwnProperty('id') &&
            item.hasOwnProperty('name') &&
            item.hasOwnProperty('class') &&
            item.name.toLowerCase().includes(searchInput.toLowerCase()) || 
            item.class.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
      return false; // Skip if the structure doesn't match
    });
    console.log("filteredData: ",filteredData);
    setInitialData(filteredData);
  };


  // function to calculate the score of the search results
  const calculateScore = (val) => {
    const nameScore = val.name?.toLowerCase().includes(searchInput.toLowerCase()) ? 2 : 0;
    const classScore = val.class?.toLowerCase().includes(searchInput.toLowerCase()) ? 1 : 0;
    const idScore = val.id?.includes(searchInput) ? 3 : 0;
    return nameScore + classScore + idScore;
  }

  //useEffect to filter results when the search term changes or data changes
  useEffect(() => {
    if(searchInput.length > 0){
      filterInitialData();
    }
  }, [searchInput,]);

  //sort initial Data based on the score
  const sortData = () => {
    const sortedData = initialData.sort((a, b) => {
      return calculateScore(b) - calculateScore(a);
    });
    setSearchResults(sortedData);
  };

  //useEffect to sort results when the initial data changes
  useEffect(() => {
    if(initialData.length > 0){
      sortData();
    }
  }, [initialData]);

  console.log("searchResults: ",searchResults);


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
              {/** note that search results is not clean clean; so must extract
               * an array of objects from the search results
               * with the structure: {id, name, class}
              */}
              {searchResults.map((item) => (
                item.fileContentJson.map((student) => (
                  <tr className="hover text-custom-beige">
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
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
};

export default SearchBar;

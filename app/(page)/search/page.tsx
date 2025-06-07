"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SearchPage() {
  const [query, setQuery] = useState(" ");
  const [searchResults, setSearchResults] = useState([]);

  const token = useSelector((state: any) => state.auth.token);

  //   call the search API when the query changes
  useEffect( () => {
    
  }, [query]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // if(value.trim()){
    //     setQuery(value);
    // }else{
    //     setQuery(" ");
    // }
  };

  return (
    <div className="rounded-lg shadow-md w-[500px]">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="block px-2 py-4 w-full text-xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
        placeholder="Search username..."
      />
    </div>
  );
}

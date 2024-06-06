import React, { useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { fetchFilterDataSearch,setSearchKeyword } from "../../redux/slices/ productSlice";
import { useDispatch } from "react-redux";

const SearchShop = (props) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    dispatch(fetchFilterDataSearch({ name: query}));
    dispatch(setSearchKeyword(query));
    props.close();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 relative max-w-md w-full mx-4">
        <button
          onClick={props.close}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FaWindowClose size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Search Products
        </h2>
        <div className="flex mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search term..."
            className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2"
          />
          <button
            onClick={handleSearch}
            className="bg-black p-3 rounded-r-lg text-white hover:bg-indigo-600"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchShop;

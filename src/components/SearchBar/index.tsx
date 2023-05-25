import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform the search operation with the searchTerm
    console.log("Searching for:", searchTerm);
    setSearchTerm("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className={`relative border-gray-200 border-2 rounded-md  `}>
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-primary dark:placeholder:text-white"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FaSearch className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

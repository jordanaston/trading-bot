import React, { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError(null);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setError('Please enter a valid search term.');
      return;
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleIconClick = () => {
    setIsClicked(true);
    handleSearch();
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex items-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search by title, artist or album"
        className="flex-grow p-3 border-2 rounded-full shadow-lg focus:outline-none border-[#5e843e] placeholder-gray-400"
      />
      <button
        onClick={handleIconClick}
        className="ml-2 p-2 rounded-full transition-colors focus:outline-none"
      >
        <HiOutlineSearch
          size={34}
          className={`transform transition-transform duration-300 ${
            isClicked ? 'scale-125 rotate-12 text-[#5e843e]' : 'text-gray-800'
          }`}
        />
      </button>
    </div>
  );
};

export default SearchBar;

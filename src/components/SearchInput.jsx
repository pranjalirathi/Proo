import React from 'react';

const SearchInput = () => {
  return (
    <div className="p-4">
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-200 text-black"
        placeholder="Search for rooms..."
      />
    </div>
  );
};

export default SearchInput;

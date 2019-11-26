import React from 'react';

function Search(props = {}) {
  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search by movie title..."
      />
    </div>
  );
}

export default Search;

import React, { useState } from 'react';

export default function Search({ allUsers }) {
  console.log(allUsers);
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = allUsers.filter((user) => user.username === query);
    console.log(result);
  };

  return (
    <div className="filter-func">
      <form onSubmit={handleSubmit}>
        <label>
          <input onChange={handleChange}></input>
        </label>
        <button>Search</button>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { uploadCallOut } from '../services/fetch-utils';

export default function CallOutForm(opponent) {
  const [callOut, setCallOut] = useState('');

  const handleChange = (e) => {
    setCallOut(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadCallOut(opponent.opponent, callOut);
  };
  return <div>
    <form onSubmit={handleSubmit}>
      <label>
              Upload video to initiate Call Out
        <input
          type='file'
          onChange={handleChange}
        ></input>
      </label>
      <button>Submit</button>
    </form>
  </div>;
}

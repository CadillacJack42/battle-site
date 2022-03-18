import React, { useState } from 'react';
import { uploadCallOut, fetchAllBattles } from '../services/fetch-utils';

export default function CallOutForm({ opponent, currentUser, setBattles }) {
  const [callOut, setCallOut] = useState('');

  const handleChange = (e) => {
    setCallOut(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadCallOut(opponent, callOut, currentUser);
    const battleList = await fetchAllBattles();
    await setBattles(battleList);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Upload video to initiate Call Out
          <input type="file" onChange={handleChange}></input>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

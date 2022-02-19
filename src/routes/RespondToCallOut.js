import React from 'react';
import { useState } from 'react';
import { declineCallOut, respondToCallOut } from '../services/fetch-utils';

export default function RespondToCallOut({ user_id, callOutId }) {
  console.log(callOutId);
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setResponse(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    respondToCallOut(user_id, callOutId, response);
  };
  return (
    <div>
      <form className="accept-decline" onSubmit={handleSubmit}>
        <label>
          Upload Your Response
          <input type="file" onChange={handleChange}></input>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

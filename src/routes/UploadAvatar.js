import React, { useState } from 'react';
import { getUserState, uploadProfileAvatar } from '../services/fetch-utils';

export default function UploadAvatar({ profile, setUserData }) {
  const userProfile = profile;

  const [media, setMedia] = useState('');

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProfileAvatar(userProfile.user_id, media);
    const response = await getUserState();
    await setUserData(response);
  };
  return (
    <div>
      <h3>Change Avatar</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="file" onChange={handleMediaChange}></input>
        </label>
        <button>Submit</button>
      </form>
      <br></br>
      <hr></hr>
      <br></br>
    </div>
  );
}

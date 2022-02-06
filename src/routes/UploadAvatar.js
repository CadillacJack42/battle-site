import React, { useState } from 'react';
import { uploadProfileAvatar } from '../services/fetch-utils';

export default function UploadAvatar(profile) {
  const userProfile = profile.profile;
  console.log(userProfile);

  const [media, setMedia] = useState('');

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadProfileAvatar(userProfile.user_id, media);
    setMedia('success');
  };
  return <div>
    <h3>Change Avatar</h3>
    <form onSubmit={handleSubmit}>
      <label>
        <input 
          type='file'
          onChange={handleMediaChange}
        ></input>
      </label>
      <button>Submit</button>
    </form>
    <br></br>
    <hr></hr>
    <br></br>
  </div>;
}

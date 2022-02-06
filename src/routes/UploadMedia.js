import React, { useState } from 'react';
import { uploadMedia } from '../services/fetch-utils';

export default function UploadMedia(profile) {
  const userProfile = profile.profile;
  console.log(userProfile);

  const [media, setMedia] = useState('');

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadMedia(userProfile.user_id, media);
  };
  return <div>
    <form onSubmit={handleSubmit}>
      <label>
        <input 
          type='file'
          onChange={handleMediaChange}
        ></input>
      </label>
      <button>Submit</button>
    </form>
  </div>;
}

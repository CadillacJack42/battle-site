import { useState } from 'react';
import { uploadNewVideo, getUserState } from '../services/fetch-utils';

export default function UploadVideos({ profile, setProfile }) {
  const [media, setMedia] = useState('');

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadNewVideo(profile.user_id, media);
    const userInfo = JSON.parse(localStorage.getItem('supabase.auth.token'));
    const updatedProfile = await getUserState(userInfo.currentSession.user.id);
    setProfile(updatedProfile);
  };
  return (
    <div>
      <h3>Upload New Videos</h3>
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

import React from 'react';

export default function PublicProfile(user) {
  const profile = user.user;
  return <div>
    <img src={profile.avatar_url} alt='Profile Pic'></img>
    <h2>{profile.username}</h2>
    {
      profile.video_uploads.map((video, i) => {
        return (
          <video width="400" height="300" controls key={profile.username + i} >
            <source src={video} type="video/mp4"/>
          </video>
        );
      })
    }
  </div>;
}

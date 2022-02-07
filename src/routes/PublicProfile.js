import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfileById } from '../services/fetch-utils';
import CallOutForm from './CallOutForm';



export default function PublicProfile() {

  const [profile, setProfile] = useState(null);
  const handle = useParams();
  
  useEffect(() => {
    const getAndSet = async () => {
      const userProfile = await fetchProfileById(handle.id);
      setProfile(userProfile);
    };
    getAndSet();
    
  }, [handle.id]);

  return <div>
    {
      profile ? 
        <div>
          <img src={profile[0].avatar_url} alt='Profile Pic'></img>
          <h2>{profile[0].username}</h2>
          <CallOutForm 
            opponent={profile[0].user_id}
          />
          {
            profile[0].video_uploads.map((video, i) => {
              return (
                <video width="400" height="300" controls key={profile[0].username + i} >
                  <source src={video} type="video/mp4"/>
                </video>
              );
            })
          }
        </div> : 
        <h1>LOADING....</h1>
    }
  </div>;
}

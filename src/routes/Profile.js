import React, { useEffect, useState } from 'react';
import { checkAuth, fetchUser, fetchUserProfile } from '../services/fetch-utils';
import './Profile.css';

export default function Profile() {

  const [getProfile, setGetProfile] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const xheck = async () => {
    checkAuth();
    setIsLoading(true);
    const user = fetchUser();
    const profile = await fetchUserProfile(user.id);
    setIsLoading(false);
    setGetProfile(profile[0]);
    return profile;
  };

  useEffect(() => {
    xheck();
  }, []);

  return (
    <div className='profile-container'>      
      {
        isLoading
          ? <h1>Profile Loading</h1>
          : <div>
            <h1>{ ` Welcome ${getProfile.username}` }</h1>
            
            
          </div>
      }
      
    </div>
  );

}

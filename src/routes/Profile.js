import React from 'react';
import { checkError } from '../services/client';
import { fetchUser, fetchUserProfile, logout } from '../services/fetch-utils';

export default function Profile() {

  const selectProfile = async () => {
    const { user } = await fetchUser();
    console.log(user);
    const profile = await fetchUserProfile(user.id);
    console.log(profile);
    return checkError(profile);
  };
  
  const userProfile = selectProfile();
  console.log(userProfile);

  return <div>
    <img src={''} alt={'this should be a profile pic'} style={{ width: '200px', height: '200px' }}></img>
    <h2>{userProfile.username}</h2>
    <button onClick={logout}>Logout</button>
  </div>;
}

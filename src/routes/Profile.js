import React, { useEffect, useState } from 'react';
import { fetchUser, fetchUserProfile } from '../services/fetch-utils';

export default function Profile() {

  const [getProfile, setGetProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const xheck = async () => {
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
    <div>
      <h1>Profile Page</h1>
      {
        isLoading
          ? <h1>Profile Loading</h1>
          : <div>{ getProfile.username }</div>
      }
    </div>
  );

}

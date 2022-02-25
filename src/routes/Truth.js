import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  fetchAllBattles,
  fetchMyBattles,
  fetchAllUsers,
  getUserState,
} from '../services/fetch-utils';
import { stars } from '../ratingDisplay';

import App from '../App';
import Home from './Home';
import Auth from './Auth';
import Profile from './Profile';
import BattleField from './BattleField';
import PublicProfile from './PublicProfile';
// import Events from '../Events';

export default function Truth() {
  const [profile, setProfile] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [battles, setBattles] = useState([]);

  const [callOuts, setCallOuts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const setState = async () => {
      setLoading(true);

      let profile;
      const userInfo = JSON.parse(localStorage.getItem('supabase.auth.token'));
      userInfo ? (profile = await getUserState(userInfo.currentSession.user.id)) : (profile = null);
      await setProfile(profile);

      const users = await fetchAllUsers();
      await setAllUsers(users);

      const battleList = await fetchAllBattles();
      await setBattles(battleList);

      let myCallOuts;
      userInfo ? (myCallOuts = await fetchMyBattles(userInfo.currentSession.user.id)) : null;
      userInfo ? await setCallOuts([...myCallOuts]) : null;
    };
    setState();
    profile && allUsers && battles && callOuts && setLoading(false);
  }, []);

  return (
    <div>
      {!isLoading ? (
        <BrowserRouter>
          <Routes>
            <Route element={<App userProfile={profile} />}>
              <Route exact path="/" element={<Home allUsers={allUsers} />} />
              <Route exact path="/auth" element={<Auth />} />
              <Route
                exact
                path="/profile"
                element={
                  profile ? (
                    <Profile profile={profile} callOuts={callOuts} />
                  ) : (
                    <Navigate replace to={'/auth'} />
                  )
                }
              />
              <Route
                exact
                path="/battles"
                element={<BattleField battles={battles} userProfile={profile} stars={stars} />}
              />
              <Route
                exact
                path={`/public-profile/:id`}
                element={<PublicProfile currentUser={profile} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <div>One Moment While We Load Data</div>
      )}
    </div>
  );
}

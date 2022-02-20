import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  fetchProfileByUserId,
  fetchAllBattles,
  fetchMyBattles,
  fetchAllUsers,
  getUserState,
} from '../services/fetch-utils';

export default function Truth() {
  const [userData, setUserData] = useState({});
  const [profile, setProfile] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [battles, setBattles] = useState([]);

  const [callOuts, setCallOuts] = useState([]);
  const [challengers, setChallengers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const setState = async () => {
      const userInfo = JSON.parse(localStorage.getItem('supabase.auth.token'));
      await setUserData(userInfo.currentSession.user);

      await setLoading(true);
      const profile = await getUserState(userInfo.currentSession.user.id);
      await setProfile(profile);

      const users = await fetchAllUsers();
      await setAllUsers(users);

      const battleList = await fetchAllBattles();
      await setBattles(battleList);

      const myCallOuts = await fetchMyBattles(userInfo.currentSession.user.id);
      await setCallOuts([...myCallOuts]);
    };
    setState();
  }, []);

  useEffect(() => {
    let newArray = [];
    const getAndSetChallengers = async () => {
      callOuts.map(async (callOut) => {
        let response = await fetchProfileByUserId(callOut.challenger);
        newArray = [...newArray, response];
        await setChallengers([...newArray, challengers]);
      });
      setLoading(false);
    };
    getAndSetChallengers();
  }, [callOuts]);

  const Landing = lazy(() => import('../App'));
  const Home = lazy(() => import('./Home'));
  const Auth = lazy(() => import('./Auth'));
  const Profile = lazy(() => import('./Profile'));
  const BattleField = lazy(() => import('./BattleField'));
  const PublicProfile = lazy(() => import('./PublicProfile'));

  return (
    <div>
      <Suspense fallback={<div>...Loading</div>}>
        <BrowserRouter>
          {!isLoading ? (
            <Routes>
              <Route element={<Landing userProfile={profile} />}>
                <Route exact path="/" element={<Home allUsers={allUsers} />} />
                <Route exact path="/auth" element={<Auth />} />
                <Route
                  exact
                  path="/profile"
                  element={
                    profile.user_id ? (
                      <Profile
                        profile={profile}
                        setUserData={setUserData}
                        callOuts={callOuts}
                        challengers={challengers}
                        isLoading={isLoading}
                      />
                    ) : (
                      <Navigate replace to={'/auth'} />
                    )
                  }
                />
                <Route
                  exact
                  path="/battles"
                  element={<BattleField battles={battles} profile={userData} />}
                />
                <Route exact path={`/public-profile/:id`} element={<PublicProfile />} />
              </Route>
            </Routes>
          ) : (
            <h1>Just a Moment While We Load Up Your Data</h1>
          )}
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

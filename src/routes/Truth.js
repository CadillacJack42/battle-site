import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { fetchAllBattles, fetchAllUsers, getUserState } from '../services/fetch-utils';

export default function Truth() {
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [battles, setBattles] = useState([]);

  useEffect(() => {
    setState();
  }, []);

  const setState = async () => {
    const profile = await getUserState();
    setUserData(profile);
    const users = await fetchAllUsers();
    await setAllUsers(users);
    const battleList = await fetchAllBattles();
    console.log(profile);
    setBattles(battleList);
  };

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
          <Routes>
            <Route element={<Landing userProfile={userData} />}>
              <Route exact path="/" element={<Home allUsers={allUsers} />} />
              <Route exact path="/auth" element={<Auth />} />
              <Route
                exact
                path="/profile"
                element={
                  userData ? (
                    <Profile profile={userData} setUserData={setUserData} />
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
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

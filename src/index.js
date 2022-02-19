import { render } from 'react-dom';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';


import { getUserState, fetchAllUsers, fetchAllBattles } from './services/fetch-utils';

const Landing = lazy(() => import('../src/App'));
const Home = lazy(() => import('../src/routes/Home'));
const Auth = lazy(() => import('../src/routes/Auth'));
const Profile = lazy(() => import('../src/routes/Profile'));
const BattleField = lazy(() => import('../src/routes/BattleField'));
const PublicProfile = lazy(() => import('../src/routes/PublicProfile'));


const rootElement = document.getElementById('root');

const renderApp = async () => {

  const profileData = await getUserState();
  const allUsers = await fetchAllUsers();
  const battles = await fetchAllBattles();

  return (
    render(
      <React.StrictMode>
        <Suspense fallback={<div>...Loading</div>}>
          <BrowserRouter>
            <Routes>
              <Route element={<Landing userProfile={profileData}/>}>
                <Route exact path='/' element={<Home allUsers={allUsers} />} />
                <Route exact path='/auth' element={<Auth />} />
                <Route exact path='/profile' element={<Profile profile={profileData}/>} />
                <Route exact path='/battles' element={<BattleField battles={battles} profile={profileData}/>} />
                <Route exact path={`/public-profile/:id`} element={<PublicProfile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </React.StrictMode>,
      rootElement
    )
  );
};
renderApp();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

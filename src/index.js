import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { getUserState, fetchAllUsers } from './services/fetch-utils';

const Landing = lazy(() => import('../src/App'));
const Home = lazy(() => import('../src/routes/Home'));
const Auth = lazy(() => import('../src/routes/Auth'));
const Profile = lazy(() => import('../src/routes/Profile'));
const BattleField = lazy(() => import('../src/routes/BattleField'));

const rootElement = document.getElementById('root');

const renderApp = async () => {
  const profileData = await getUserState();
  const allUsers = await fetchAllUsers();
  console.log(allUsers);
  return (
    render(
      <React.StrictMode>
        <Suspense fallback={<div>...Loading</div>}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Landing 
                userProfile={profileData}
              />}>
                <Route exact path='/home' element={<Home 
                  allUsers={allUsers}
                />} />
                <Route exact path='/auth' element={<Auth />} />
                <Route exact path='/profile' element={<Profile />} />
                <Route exact path='/battles' element={<BattleField />} />
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

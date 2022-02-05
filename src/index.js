import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const Home = lazy(() => import('../src/App'));
const Auth = lazy(() => import('../src/routes/Auth'));
const Profile = lazy(() => import('../src/routes/Profile'));
const BattleField = lazy(() => import('../src/routes/BattleField'));

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
    <Suspense fallback={<div>...Loading</div>}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path='/auth' element={<Auth />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/battles' element={<BattleField />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

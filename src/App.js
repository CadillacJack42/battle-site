// import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';
import { logout } from './services/fetch-utils';

function App() {

  return (
    <div className="App">
      <h1>Do you have what it takes to be the best?</h1>
      <nav
        style={{
          borderBottom: '1px solid black',
          paddingBottom: '1rem',
        }}
      >
        <Link to='/'>Home</Link> | {' '}

        <Link to='/auth'>Sign In/Sign Up</Link> | {' '}
        
        <Link to='/profile'>Profile</Link> | {' '}

        <Link to='/battles'>Battle Field</Link>
      </nav>
      <Outlet />
      <h1>LANDING PAGE</h1>
      <button onClick={logout}>LOGOUT</button>
    </div>
  );
}

export default App;

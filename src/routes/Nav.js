import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/fetch-utils';
import './Nav.css';

export default function Nav(username) {
  return (
    <div className="nav-pane">
      {username.Data ? (
        <div className="user-nav">
          <img className="avatar" src={username.Data.avatar_url} alt="PROFILE PIC"></img>
          <h1 className="user-nav-greetings">{`Welcome ${username.Data.username}`}</h1>
        </div>
      ) : null}
      {/* <h1>Do you have what it takes to be the best?</h1> */}
      <nav
        style={{
          borderBottom: '1px solid black',
          paddingBottom: '1rem',
        }}
      >
        <Link className="nav-link" to="/">
          Home
        </Link>{' '}
        |{' '}
        <Link className="nav-link" to="/profile">
          Profile
        </Link>{' '}
        |{' '}
        <Link className="nav-link" to="/battles">
          Battle Field
        </Link>{' '}
        |{' '}
        <Link className="nav-link" to="/public-profile/:id">
          Public Profile
        </Link>{' '}
        |{' '}
        <Link className="nav-link" to="/events">
          Live Events
        </Link>{' '}
        {username.Data ? (
          <button className="logout nav-link" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link className="nav-link" to="/auth">
            Sign In/Sign Up
          </Link>
        )}
      </nav>
    </div>
  );
}

import React from 'react';
import { useState } from 'react';
import { fetchUser, signUpUser, createProfile } from '../services/fetch-utils';


export default function Auth() {

  const [usernameSignUp, setUsernameSignUp] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');


  const handleUsernameChange = (e) => {
    setUsernameSignUp(e.target.value);
    console.log(usernameSignUp);

  };
  const handleEmailChange = (e) => {
    setEmailSignUp(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordSignUp(e.target.value);
  };
  const handleSubmit = async (e) => {
    console.log(emailSignUp);
    e.preventDefault();
    await signUpUser(emailSignUp, passwordSignUp);
    await createProfile(usernameSignUp, emailSignUp);
    location.replace('/profile');
  };
  return <div>
    Sign Up
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input value={usernameSignUp} onChange={handleUsernameChange}></input>
      </label>
      <label>
        Password
        <input 
          value={passwordSignUp} 
          onChange={handlePasswordChange}
          type={'password'}
        >
        </input>
      </label>
      <label>
        Email
        <input 
          value={emailSignUp}
          onChange={handleEmailChange}
          type={'email'}
        >
        </input>
      </label>
      <button>Submit</button>
    </form>
  </div>;
}

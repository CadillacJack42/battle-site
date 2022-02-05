import React from 'react';
import { createProfile, signUpUser } from '../services/fetch-utils';


export default function Auth({
  usernameSignUp,
  setUsernameSignUp,
  emailSignUp,
  setEmailSignUp,
  passwordSignUp,
  setPasswordSignUp,
}) {
  const handleUsernameChange = (e) => {
    setUsernameSignUp(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailSignUp(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordSignUp(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameSignUp,
      email: emailSignUp,
    };
    await createProfile({ newUser });
    await signUpUser(emailSignUp, passwordSignUp);
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
        <input value={passwordSignUp} onChange={handlePasswordChange}></input>
      </label>
      <label>
        Email
        <input value={emailSignUp} onChange={handleEmailChange}></input>
      </label>
      <button>Submit</button>
    </form>
  </div>;
}

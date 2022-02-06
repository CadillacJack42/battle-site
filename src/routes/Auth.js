import React from 'react';
import { useState } from 'react';
import { signUpUser, createProfile, signInUser } from '../services/fetch-utils';
import SignUpForm from '../SignUpForm';

export default function Auth() {

  const [emailSignUp, setEmailSignUp] = useState('');

  const [usernameSignUp, setUsernameSignUp] = useState('');
  const [usernameSignIn, setUsernameSignIn] = useState('');

  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');


  const handleSignUpUsernameChange = (e) => {
    setUsernameSignUp(e.target.value);
  };
  const handleSignInUsernameChange = (e) => {
    setUsernameSignIn(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailSignUp(e.target.value);
  };
  const handleSignUpPasswordChange = (e) => {
    setPasswordSignUp(e.target.value);
  };
  const handleSignInPasswordChange = (e) => {
    setPasswordSignIn(e.target.value);
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    await signUpUser(emailSignUp, passwordSignUp);
    await createProfile(usernameSignUp, emailSignUp);
    location.replace('/profile');
  };
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    await signInUser();
    location.replace('/profile');
  };
  return <div>
    <SignUpForm 
      handleSignUpSubmit={handleSignUpSubmit}
      usernameSignUp={usernameSignUp}
      handleSignUpUsernameChange={handleSignUpUsernameChange}
      passwordSignUp={passwordSignUp}
      handleSignUpPasswordChange={handleSignUpPasswordChange}
      emailSignUp={emailSignUp}
      handleEmailChange={handleEmailChange}
      handleSignInSubmit={handleSignInSubmit}
      usernameSignIn={usernameSignIn}
      handleSignInUsernameChange={handleSignInUsernameChange}
      passwordSignIn={passwordSignIn}
      handleSignInPasswordChange={handleSignInPasswordChange}
    />
  </div>;
}

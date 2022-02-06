import React from 'react';
import { useState } from 'react';
import { signUpUser, createProfile, signInUser } from '../services/fetch-utils';
import SignUpForm from '../SignUpForm';

export default function Auth() {

  const [usernameSignUp, setUsernameSignUp] = useState('');
  
  const [emailSignUp, setEmailSignUp] = useState('');
  const [emailSignIN, setEmailSignIN] = useState('');

  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');


  const handleSignUpUsernameChange = (e) => {
    setUsernameSignUp(e.target.value);
  };
  const handleSignUPEmailChange = (e) => {
    setEmailSignUp(e.target.value);
  };
  const handleSignINEmailChange = (e) => {
    setEmailSignIN(e.target.value);
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
    await signInUser(emailSignIN, passwordSignIn);
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
      handleSignUPEmailChange={handleSignUPEmailChange}
      handleSignInSubmit={handleSignInSubmit}
      emailSignIn={emailSignIN}
      handleSignINEmailChange={handleSignINEmailChange}
      passwordSignIn={passwordSignIn}
      handleSignInPasswordChange={handleSignInPasswordChange}
    />
  </div>;
}

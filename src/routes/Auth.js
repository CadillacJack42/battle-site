import React from 'react';
import { useState } from 'react';
import { signUpUser, createProfile, signInUser } from '../services/fetch-utils';
import SignUpForm from '../SignUpForm';
import './Auth.css';

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
    const user = await signUpUser(emailSignUp, passwordSignUp);
    await createProfile(usernameSignUp, emailSignUp);
    if (user) {
      location.replace('/profile');
    }
    
  };
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const user = await signInUser(emailSignIN, passwordSignIn);
    if (user) {
      location.replace('/profile');
    }
  };
  return <div className='auth-container'>
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

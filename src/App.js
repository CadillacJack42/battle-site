import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [usernameSignUp, setUsernameSignUp] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
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
        <Link to={{
          pathname: '/auth',
          state: {
            usernameSignUp: { usernameSignUp },
            setUsernameSignUp: { setUsernameSignUp },
            emailSignUp: { emailSignUp },
            setEmailSignUp: { setEmailSignUp },
            passwordSignUp: { passwordSignUp },
            setPasswordSignUp: { setPasswordSignUp },
          }
        }} 
          
        >Sign In/Sign Up</Link> | {' '}
        <Link to='/profile'>Profile</Link> | {' '}
        <Link to='/battles'>Battle Field</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

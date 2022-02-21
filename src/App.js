import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from './routes/Nav';

function App(profileData) {
  const profile = profileData.userProfile;
  return (
    <div className="App">
      <h1>Do you have what it takes to be the best?</h1>
      <Nav Data={profile} />
      <Outlet />
    </div>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from './routes/Nav';

function App(profileData) {
  const profile = profileData.userProfile;
  return (
    <div className="App">
      <Nav Data={profile} />
      <Outlet />
    </div>
  );
}

export default App;

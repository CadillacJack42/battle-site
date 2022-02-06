import { checkAuth } from '../services/fetch-utils';
import UploadMedia from './UploadMedia';
import './Profile.css';

export default function Profile(Profile) {
  const profile = Profile.Profile;
  checkAuth();
  return (
    <div className='profile-container'>      
      {
        !Profile
          ? <h1>Profile Loading</h1>
          : <div>
            <h1>{ ` Welcome ${profile.username}` }</h1>
            <UploadMedia 
              profile={profile}
            />
          </div>
      }
    </div>
  );
}

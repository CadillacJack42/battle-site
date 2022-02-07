import { checkAuth } from '../services/fetch-utils';
import UploadAvatar from './UploadAvatar';
import './Profile.css';
import UploadVideos from './UploadVideos';

export default function Profile(Profile) {
  const profile = Profile.Profile;
  console.log(profile);
  checkAuth();
  return (
    <div className='profile-container'>      
      {
        !Profile
          ? <h1>Profile Loading</h1>
          : <div>
            <h1>{ ` Welcome ${profile.username}` }</h1>
            <UploadAvatar 
              profile={profile}
            />
            <UploadVideos 
              profile={profile}
            />
          </div>
      }
    </div>
  );
}

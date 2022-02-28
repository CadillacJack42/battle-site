import UploadAvatar from './UploadAvatar';
import UploadVideos from './UploadVideos';
import MyCallOuts from './MyCallOuts';
import './Profile.css';

export default function Profile({ profile, callOuts, setProfile }) {
  return (
    <div className="profile-container">
      <div>
        <h1>{` Welcome ${profile.username}`}</h1>
        <UploadAvatar profile={profile} setProfile={setProfile} />
        <UploadVideos profile={profile} setProfile={setProfile} />
        <MyCallOuts user_id={profile.user_id} callOuts={callOuts} />
      </div>
    </div>
  );
}

import UploadAvatar from './UploadAvatar';
import UploadVideos from './UploadVideos';
import MyCallOuts from './MyCallOuts';
import './Profile.css';

export default function Profile({ profile, callOuts, isLoading }) {
  console.log(callOuts);
  return (
    <div className="profile-container">
      {!profile ? (
        <h1>Profile Loading</h1>
      ) : (
        <div>
          <h1>{` Welcome ${profile.username}`}</h1>
          <UploadAvatar profile={profile} />
          <UploadVideos profile={profile} />
          <MyCallOuts
            user_id={profile.user_id}
            callOuts={callOuts}
            // challengers={challengers}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

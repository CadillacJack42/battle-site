import React from 'react';

export default function Home({ allUsers }) {
  return (
    <div>
      {allUsers.map((user, i) => {
        return user.video_uploads.length !== 0 ? (
          <div onClick={() => location.replace(`./public-profile/${user.id}`)} key={user + i}>
            <h2>{user.username}</h2>

            <video width="400" height="300" controls key={user.username + i}>
              <source src={user.video_uploads[user.video_uploads.length - 1]} type="video/mp4" />
            </video>
          </div>
        ) : null;
      })}
    </div>
  );
}

import React from 'react';

export default function Home({ allUsers }) {
  return (
    <div>
      {allUsers.map((user, i) => {
        return (
          <div onClick={() => location.replace(`./public-profile/${user.id}`)} key={user + i}>
            <h2>{user.username}</h2>
            {user.video_uploads.map((video, i) => {
              return (
                <video width="400" height="300" controls key={user.username + i}>
                  <source src={video} type="video/mp4" />
                </video>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

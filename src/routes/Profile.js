import React from 'react';

export default function Profile({
  username,
}) {
  return <div>
    <img src={''} alt={'this should be a profile pic'} style={{ width: '200px', height: '200px' }}></img>
    <h2>{username}</h2>
  </div>;
}

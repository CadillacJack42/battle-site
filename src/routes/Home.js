import React from 'react';

export default function Home(
  allUsers
) {
  console.log(allUsers);
  return <div>
    {allUsers.allUsers.map((user, i) => {
      return <h2 key={user + i}>{user.username}</h2>;
    })}
  </div>;
}

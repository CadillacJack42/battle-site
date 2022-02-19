import React, { useEffect, useState } from 'react';
import { fetchMyBattles } from '../services/fetch-utils';
import './MyCallOuts.css';
import RespondToCallOut from './RespondToCallOut';

export default function MyCallOuts({ user_id }) {
  const [callOuts, setCallOuts] = useState([]);
  // const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchCall = async () => {
      const myCallOuts = await fetchMyBattles(user_id);
      console.log(myCallOuts);
      setCallOuts([...myCallOuts]);
    };
    fetchCall();
  }, [user_id]);

  return (
    <div>
      {callOuts ? (
        <div>
          {callOuts.map((callOut, i) => {
            return (
              <div key={callOut.opponent + i}>
                {/* {challengers.length < 1 && (
                  <p>{`User ${challengers[i].username} has called you out`}</p>
                )} */}
                {/* <video width="400" height="300" controls>
                  <source src={callOut.call_out} type="video/mp4" />
                </video> */}
                {/* {!callOut.response ? (
                  <RespondToCallOut user_id={user_id} callOutId={callOut.id} />
                ) : (
                  <p>Your response has been uploaded</p>
                )} */}
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

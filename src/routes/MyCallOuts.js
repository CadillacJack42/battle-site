import React, { useEffect, useState } from 'react';
import { fetchMyBattles } from '../services/fetch-utils';
import './MyCallOuts.css';
import RespondToCallOut from './RespondToCallOut';

export default function MyCallOuts({ user_id }) {
  const [callOuts, setCallOuts] = useState('');


  useEffect(() => {
    const fetchCall = async () => {
      const myCallOuts = await fetchMyBattles(user_id);
      setCallOuts(myCallOuts);
    };
    fetchCall();
  }, [user_id]);



  return <div>
    {
      callOuts ? 
        <div>
          {callOuts.map((callOut, i) => {
            console.log(callOut.id);
            const callOutId = callOut.id;
            return (<div key={callOut.opponent + i}>
              <p>{`User ${callOut.challenger} has called you out`}</p>
              <video width="400" height="300" controls>
                <source src={callOut.call_out} type="video/mp4"/>
              </video>
              {
                !callOut.response ?
                  <RespondToCallOut
                    user_id={user_id}
                    callOutId={callOutId}
                  /> : <p>Your response has been uploaded</p>
              }
              
            </div>);
          })}
        </div> : 
        <div>Loading...</div>
    } 
    
  </div>;
}

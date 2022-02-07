import React, { useEffect, useState } from 'react';
import { fetchMyBattles } from '../services/fetch-utils';

export default function MyCallOuts({ user_id }) {
  const [callOuts, setCallOuts] = useState('');
  useEffect(() => {
    const fetchCall = async () => {
      const myCallOuts = await fetchMyBattles(user_id);
      setCallOuts(myCallOuts);
    };
    fetchCall();
  }, []);

  return <div>
    {
      callOuts ? 
        <div>
          {callOuts.map((callOut, i) => {
            return (<div key={callOut.opponent + i}>
              <video width="400" height="300" controls>
                <source src={callOut.call_out} type="video/mp4"/>
              </video>
            </div>);
          })}
        </div> : <div></div>
    } 
  </div>;
}

import React from 'react';
import './MyCallOuts.css';
import RespondToCallOut from './RespondToCallOut';

export default function MyCallOuts({ user_id, callOuts }) {
  return (
    <div>
      <div>
        {callOuts.map((callOut, i) => {
          return (
            <div key={callOut.opponent + i}>
              <p>{`User ${callOut.challenger_username} has called you out`}</p>

              <video width="400" height="300" controls>
                <source src={callOut.call_out} type="video/mp4" />
              </video>
              {!callOut.response ? (
                <RespondToCallOut user_id={user_id} callOutId={callOut.id} />
              ) : (
                <p>Your response has been uploaded</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

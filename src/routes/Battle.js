import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import { fetchUserProfile } from '../services/fetch-utils';
import './Battle.css';

export default function Battle({ battle, profile }) {
  const [challenger, setChalleger] = useState('');
  const [opponent, setOpponent] = useState('');

  useEffect(() => {
    const getWarriors = async (battle) => {
      const challenger = await fetchUserProfile(battle.challenger);
      const opponent = await fetchUserProfile(battle.opponent);
      setChalleger(challenger);
      setOpponent(opponent);
    };
    getWarriors(battle);
  }, [battle]);
  return (
    <div className="battle-container">
      <div>
        <div className="battle">
          <span>
            <h2>{challenger.username}</h2>
            <video width="300" height="200" controls>
              <source src={battle.call_out} type="video/mp4" />
            </video>
          </span>

          <h1>VS.</h1>
          {battle.response ? (
            <span>
              <h2>{opponent.username}</h2>
              <video width="300" height="200" controls>
                <source src={battle.response} type="video/mp4" />
              </video>
            </span>
          ) : (
            <span>
              <h2>{opponent.username}</h2>
              <h2 className="waiting">Awaiting Response</h2>
            </span>
          )}
        </div>
        <Comments battle={battle} profile={profile} opponent={opponent} />
      </div>
    </div>
  );
}

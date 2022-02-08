import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/fetch-utils';
import './Battle.css';

export default function Battle(battle) {
  const [challenger, setChalleger] = useState('');
  const [opponent, setOpponent] = useState('');
    
  useEffect(() => {
    const getWarriors = async (battle) => {
      const challenger = await fetchUserProfile(battle.battle.challenger);
      const opponent = await fetchUserProfile(battle.battle.opponent);
      setChalleger(challenger);
      setOpponent(opponent);
    };
    getWarriors(battle);
  }, [battle]);
  return (
    <div className='battle-container'>
      <div className='battle'>
        <span>
          <h2>{challenger.username}</h2>
          <video width="300" height="200" controls>
            <source src={battle.battle.call_out} type="video/mp4"/>
          </video>
        </span>
      
        <h1>VS.</h1>
        {
          battle.battle.response ?
            <span>
              <h2>{opponent.username}</h2>
              <video width="300" height="200" controls>
                <source src={battle.battle.response} type="video/mp4"/>
              </video>
            </span> :
            <h2 className='waiting'>Awaiting Response</h2>
        }
      </div>
    </div>
    
  );
}

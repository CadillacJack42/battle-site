import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/fetch-utils';

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
    <div>
      <h3>{`${challenger.username} VS. ${opponent.username}`}</h3>
      <video width="400" height="300" controls>
        <source src={battle.battle.call_out} type="video/mp4"/>
      </video>
    </div>
  );
}

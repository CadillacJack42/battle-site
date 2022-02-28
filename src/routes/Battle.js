import React from 'react';
import Comments from './Comments';
import './Battle.css';
import RatingDisplay from '../RatingDisplay';

export default function Battle({ battle, userProfile, setBattles }) {
  return (
    <div className="battle-container">
      <div>
        <div className="battle">
          <span>
            <h2>{battle.challenger_username}</h2>
            <video width="300" height="200" controls>
              <source src={battle.call_out} type="video/mp4" />
            </video>
            <br></br>
            <RatingDisplay
              profile={userProfile}
              battleRating={battle.challenger_rating}
              battleId={battle.id}
              contender={'challenger'}
              setBattles={setBattles}
            />
          </span>

          <h1>VS.</h1>
          {battle.response ? (
            <span>
              <h2>{battle.opponent_username}</h2>
              <video width="300" height="200" controls>
                <source src={battle.response} type="video/mp4" />
              </video>
              <br></br>
              <RatingDisplay
                profile={userProfile}
                battleRating={battle.challenger_rating}
                battleId={battle.id}
                contender={'opponent'}
                setBattles={setBattles}
              />
            </span>
          ) : (
            <span>
              <h2>{battle.opponent_username}</h2>
              <h2 className="waiting">Awaiting Response</h2>
            </span>
          )}
        </div>
        <Comments battle={battle} userProfile={userProfile} />
      </div>
    </div>
  );
}

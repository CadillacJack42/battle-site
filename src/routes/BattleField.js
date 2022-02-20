import Battle from './Battle';
import './BattleField.css';

export default function BattleField({ battles, profile, userProfile }) {
  return (
    <div className="battle-field-container">
      <h1>BattleField !!!</h1>
      {battles.map((battle, i) => {
        return (
          <Battle
            key={battle.challenger + i}
            battle={battle}
            profile={profile}
            userProfile={userProfile}
          />
        );
      })}
    </div>
  );
}

import Battle from './Battle';
import './BattleField.css';

export default function BattleField(battles) {
  // const [challenger, setChalleger] = useState('');
  // const [opponent, setOpponent] = useState('');

  // useEffect(() => {
  //   const getWarriors = async (battle) => {
  //     const challenger = await fetchUserProfile(battle.challenger);
  //     const opponent = await fetchUserProfile(battle.opponent);
  //     setChalleger(challenger);
  //     setOpponent(opponent);
  //   };
  //   getWarriors();
  // }, []);
  
  
  return <div className='battle-field-container'>
    <h1>BattleField !!!</h1>
    { 
       
      battles.battles.map((battle, i) => {
        return <Battle 
          key={battle.challenger + i}
          battle={battle}
        />;
      })
    }
  </div>;
}

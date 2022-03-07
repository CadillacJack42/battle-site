import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { updateRatings, fetchAllBattles, fetchRating } from './services/fetch-utils';

export default function RatingDisplay({ profile, battleId, contender, setBattles }) {
  const username = profile.username;

  const [userRating, setUserRating] = useState(0); // initial rating value
  const [currentRatings, setCurrentRatings] = useState({});
  const [updatedRatings, setUpdatedRatings] = useState({});

  useEffect(() => {
    const getCurrRating = async () => {
      const rating = await fetchRating(battleId, contender, profile.username);
      console.log(rating);
      setCurrentRatings(rating);
    };
    getCurrRating();
  }, [battleId, contender, profile.username]);

  useEffect(() => {
    const newRating = { ...currentRatings[`${contender}_rating`] };
    newRating[username] = userRating;
    console.log(newRating[username]);
    setUpdatedRatings(newRating);
  }, [currentRatings, contender, userRating]);

  useEffect(() => {
    console.log(updatedRatings);
    userRating !== 0 && updateRatings(battleId, updatedRatings, contender);
  }, [battleId, contender, userRating, updatedRatings]);

  const handleUserRating = async (e) => {
    console.log(e);
    setUserRating(e);
  };
  return (
    <div className="Rating">
      <p>{JSON.stringify(currentRatings)}</p>
      <Rating onClick={handleUserRating} ratingValue={userRating} /* Available Props */ />
    </div>
  );
}

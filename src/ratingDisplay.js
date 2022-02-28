import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { updateRatings, fetchAllBattles, fetchRating } from './services/fetch-utils';

export default function RatingDisplay({ profile, battleId, contender, setBattles }) {
  const [userRating, setUserRating] = useState(0); // initial rating value
  // const [overallRating, setOverallRating] = useState(0);

  let currentRatings;
  useEffect(() => {
    const getCurrRating = async () => {
      const rating = await fetchRating(battleId);
      console.log(rating[0]);
      (await rating) && (currentRatings = JSON.parse(rating[0][`${contender}_rating`]));
      setUserRating(currentRatings);
      console.log(currentRatings);
    };
    getCurrRating();
  }, []);

  useEffect(() => {
    const setRating = async () => {
      const updatedRating = {
        username: profile.username,
        [`${contender}_rating`]: userRating,
      };

      let newRatings;
      currentRatings
        ? (newRatings = [currentRatings, updatedRating])
        : (newRatings = [updatedRating]);

      await updateRatings(battleId, newRatings, contender);
      const updatedBattles = await fetchAllBattles();
      setBattles(updatedBattles);
    };
    setRating();
  }, [userRating]);

  const handleUserRating = async (e) => {
    setUserRating(e);
  };

  return (
    <div className="Rating">
      <Rating onClick={handleUserRating} ratingValue={userRating} /* Available Props */ />
    </div>
  );
}

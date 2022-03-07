import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { updateRatings, fetchAllBattles, fetchRating } from './services/fetch-utils';

export default function RatingDisplay({ profile, battleId, contender, setBattles }) {
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
    setUpdatedRatings({ [`${contender}_ratings`]: userRating });
  }, [currentRatings, contender, userRating]);

  useEffect(() => {
    updateRatings(battleId, { [`${profile.username}`]: userRating }, contender);
  }, [battleId, contender, userRating]);

  // useEffect(() => {
  //   const setNewRatings = async () => {
  //     console.log(updatedRatings);
  //     const response = await updateRatings(battleId, updatedRatings, contender);
  //     console.log(response);
  //   };
  //   setNewRatings();
  // }, [updatedRatings]);

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

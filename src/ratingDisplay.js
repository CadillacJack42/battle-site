import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { updateRatings, fetchRating } from './services/fetch-utils';

export default function RatingDisplay({ profile, battleId, contender }) {
  const username = profile.username;

  const [userRating, setUserRating] = useState(0); // initial rating value
  const [currentRatings, setCurrentRatings] = useState({});
  const [updatedRatings, setUpdatedRatings] = useState({});

  useEffect(() => {
    const getCurrRating = async () => {
      const rating = await fetchRating(battleId, contender, profile.username);
      console.log(rating[`${contender}_rating`][username]);
      rating[`${contender}_rating`][username] &&
        setUserRating(rating[`${contender}_rating`][username]);
      setCurrentRatings(rating);
    };
    getCurrRating();
  }, []);

  useEffect(() => {
    const newRating = { ...currentRatings[`${contender}_rating`] };
    userRating !== 0 && (newRating[username] = userRating);
    setUpdatedRatings(newRating);
  }, [currentRatings, contender, userRating, username]);

  useEffect(() => {
    // console.log(updatedRatings);
    const updateAndRefresh = async () => {
      const response = await updateRatings(battleId, updatedRatings, contender);
      console.log(response);
    };
    userRating !== 0 && updateAndRefresh();
  }, [updatedRatings]);

  const handleUserRating = async (e) => {
    await setUserRating(e);
  };
  return (
    <div className="Rating">
      <p>{JSON.stringify(currentRatings)}</p>
      <Rating onClick={handleUserRating} ratingValue={userRating} /* Available Props */ />
    </div>
  );
}

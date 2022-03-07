import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { updateRatings, fetchAllBattles, fetchRating } from './services/fetch-utils';

export default function RatingDisplay({ profile, battleId, contender, setBattles }) {
  const [userRating, setUserRating] = useState(0); // STARS initial rating value
  const [currentRatings, setCurrentRatings] = useState({});
  const [updatedRatings, setUpdatedRatings] = useState({});

  const handleUserRating = async (e) => {
    console.log(e);
    setUserRating(e);
  };
  return (
    <div className="Rating">
      <Rating onClick={handleUserRating} ratingValue={userRating} /* Available Props */ />
    </div>
  );
}

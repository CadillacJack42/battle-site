import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function RatingDisplay() {
  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(Number(rate));
    // other logic
  };

  return (
    <div className="App">
      <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
    </div>
  );
}

// const fullStar = '★';
// const emptyStar = '☆';
// import React from 'react';

// export default function RatingDisplay({ rating }) {
//   const rates = stars(rating);
//   console.log(fullStar);
//   return <p>{rates}</p>;
// }

// export const stars = (rating) => {
//   let totalRating;
//   switch (rating) {
//     case 1:
//       totalRating = `${(<span>{fullStar}</span>)}${emptyStar}${emptyStar}${emptyStar}${emptyStar}`;
//       break;
//     case 2:
//       totalRating = `${fullStar}${fullStar}${emptyStar}${emptyStar}${emptyStar}`;
//       break;
//     case 3:
//       totalRating = `${fullStar}${fullStar}${fullStar}${emptyStar}${emptyStar}`;
//       break;
//     case 4:
//       totalRating = `${fullStar}${fullStar}${fullStar}${fullStar}${emptyStar}`;
//       break;
//     case 5:
//       totalRating = `${fullStar}${fullStar}${fullStar}${fullStar}${fullStar}`;
//       break;

//     default:
//       totalRating = `${(<span>{fullStar}</span>)}`;
//       break;
//   }
//   //   console.log(totalRating);
//   return totalRating;
// };

// // export const battleUserRating = () => {};

export const stars = (rating) => {
  let totalRating;
  switch (rating) {
    case 1:
      totalRating = '★☆☆☆☆';
      break;
    case 2:
      totalRating = '★★☆☆☆';
      break;
    case 3:
      totalRating = '★★★☆☆';
      break;
    case 4:
      totalRating = '★★★★☆';
      break;
    case 5:
      totalRating = '★★★★★';
      break;

    default:
      totalRating = '☆☆☆☆☆';
      break;
  }
  return totalRating;
};

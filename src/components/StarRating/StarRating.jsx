import css from "./StarRating.module.css";

import yellowStar from "../../assets/star.svg";
import grayStar from "../../assets/grey-star.svg";

export const StarRating = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = maxStars - fullStars;

  const starsArray = [
    ...Array(fullStars).fill(yellowStar),
    ...Array(emptyStars).fill(grayStar),
  ];

  return (
    <div className={css.stars}>
      {starsArray.map((star, index) => (
        <img key={index} src={star} alt="star" />
      ))}
    </div>
  );
};

export default StarRating;
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text, color }) => {
  const stars = [];
  const roundedValue = Math.round(value * 2) / 2; // Round the value to the nearest half-star

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedValue) {
      stars.push(<FaStar key={i} style={{ color }} />);
    } else if (i === Math.ceil(roundedValue) && value % 1 !== 0) {
      stars.push(<FaStarHalfAlt key={i} style={{ color }} />);
    } else {
      stars.push(<FaRegStar key={i} style={{ color }} />);
    }
  }

  return (
    <div className="rating">
      <span>{stars}</span>
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;

import { useState } from "react";

export default function RatingStars({ 
    maxRating = 5,
    color = "#fcc419",
    font = 24,
    message = [],
    defaultRating = 0,
    onSetRating,
}) {
  const container = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };
  const containerStars = {
    display: "flex",
    gap: "4px",
  };
  const text = {
    lineHeight: "1",
    margin: "0",
    color : color,
    fontSize  : ` ${ font / 1.5} px`
  };
  const [rating, setRating] = useState(defaultRating);
  const [hoverRate, setHoverRate] = useState(0);

  function handleRating(rate) {
    setRating(rate);
    onSetRating(rate);
  }
  function handleHoverRating (rate){
    setHoverRate(rate);
  }
  function handleLeaveRating (){
    setHoverRate();
  }
  return (
    <div style={container}>
      <div style={containerStars}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star key={i} onRating={() => handleRating(i + 1)}
          full = {  hoverRate ? hoverRate >= i+1 : rating >= i+1}
          onhover = {() => handleHoverRating(i+1)}
          onLeave = {handleLeaveRating}
          font ={font}
          color = {color}
          />
        ))}
      </div>
      <p style={text}>{ 
      (message.length === maxRating) ? (
      message ? (message[hoverRate] ? 
        message[hoverRate - 1] || message[rating - 1]
        : message[rating - 1]) 
      : hoverRate || rating
      ) : (hoverRate || rating) }</p>
    </div>
  );
}

function Star({ onRating, full, onhover, onLeave, font, color }) {

    const starStile = {
        height: `${font}px`,
        width: `${font}px`,
        display: "block",
        cursor: "pointer",
      };

  return (
    <span 
    style={starStile} 
    onClick={onRating}
    onMouseMove = {onhover}
    onMouseLeave={onLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
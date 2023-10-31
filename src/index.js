import React from 'react';
import ReactDOM from 'react-dom/client';
// import RatingStars from './RatingStars';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <RatingStars
     maxRating={5} 
     font={32} 
     message = {["Terrible","Bad","Good","Perfect","Amazing"]}
     defaultRating = {3}
     
     /> */}
  </React.StrictMode>
);

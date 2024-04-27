import './Plan.css';

import React from 'react';

import Card from './card.jsx';

const Plan = () => {
  // Define an array of card data
  const cardData = [
    { meal: "Breakfast", dish: "Potato", calories: 340 },
    { meal: "Lunch", dish: "Chicken Salad", calories: 550 },
    { meal: "Dinner", dish: "Salmon", calories: 700 },
  ];

  return (
    <div>
      <h2>DIET PLAN TAILORED FOR YOU</h2>
      <div className="container">
        {/* Map over the cardData array to render Card components dynamically */}
        {cardData.map((card, index) => (
          <Card
            key={index} // Add a unique key for each card
            meal={card.meal}
            dish={card.dish}
            calories={card.calories}
          />
        ))}
      </div>
    </div>
  );
};

export default Plan;
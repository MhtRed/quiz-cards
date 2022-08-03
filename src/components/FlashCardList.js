import React from "react";
import FlashCard from "./FlashCard";

export default function FlashCardList({ flashCards }) {
  return (
    <div className="card-grid">
      {flashCards.map((card) => (
        <FlashCard
          key={card.id}
          question={card.question}
          answer={card.answer}
          options={card.options}
        />
      ))}
    </div>
  );
}

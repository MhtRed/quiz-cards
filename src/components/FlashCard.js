import React from "react";
import { useState, useEffect, useRef } from "react";

export default function FlashCard({ question, answer, options }) {
  // States
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  // Refs to set the height
  const frontEL = useRef();
  const backEl = useRef();
  // Function to set the height
  function setMaxHeight() {
    const frontHeight = frontEL.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }
  //Effects to take place
  useEffect(setMaxHeight, [question, answer, options]);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);
  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEL}>
        <div>Question: {question}</div>
        <div className="flashcard-options">
          {options.map((option) => (
            <div className="flashcard-option" key={option}>
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {answer}
      </div>
    </div>
  );
}

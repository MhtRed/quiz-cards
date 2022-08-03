import "./App.css";
import { useEffect, useState, useRef } from "react";
import FlashCardList from "./components/FlashCardList";

// The App Component
function App() {
  const [flashCards, setFlashCards] = useState([]);
  console.log(flashCards);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();
  useEffect(() => {}, []);
  // Effect to retrieve categories
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      "https://opentdb.com/api.php?" +
        new URLSearchParams({
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        })
    )
      .then((res) => res.json())
      .then((res) =>
        res.results.map((item, index) => {
          const answer = decodeString(item.correct_answer);
          const options = [
            ...item.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(item.question),
            answer: answer,
            options: options.sort(() => 0.5 - Math.random()),
          };
        })
      )
      .then((questions) => setFlashCards(questions));
  }
  // Returning the JSX
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number Of Questions</label>
          <input
            id="amount"
            type="number"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          ></input>
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashCards={flashCards} />
      </div>
    </>
  );
}

export default App;

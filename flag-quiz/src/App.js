import './App.css';
import { useState, useRef, useEffect } from "react"
import data from "./countries.json";
// console.log(Object.keys(data));

export default function Game() {
  const [currentFlag, setFlag] = useState(Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))])
  let randButtons = [data[currentFlag], data[Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))]], data[Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))]], data[Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))]]]
  for (let i = 3; i > 0; i--) {
    let random = Math.floor(Math.random() * (i + 1))
    let slot = randButtons[i]
    randButtons[i] = randButtons[random]
    randButtons[random] = slot
  }
  const [buttons, setButtons] = useState(randButtons)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)

  function restart() {
    setFlag(Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))])
    let randButtons = [data[currentFlag], data[Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))]], data[Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))]], data[Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))]]]
    console.log(data[currentFlag]);
    for (let i = 3; i > 0; i--) {
      let random = Math.floor(Math.random() * (i + 1))
      let slot = randButtons[i]
      randButtons[i] = randButtons[random]
      randButtons[random] = slot
    }
    setButtons(randButtons)
  }

  function answer(element) {
    if (data[currentFlag] === element) {
      console.log("Right answer");
      setScore(score + 1)
    }
    else {
      setLives(lives - 1)
    }
    restart()
  }

  return (
    <div className="game">
      <form action="">
        <h2 className="score">Score: {score}</h2>
        <h1>Flag Quiz</h1>
        <h2 className="lives">Lives: {lives}</h2>
        <img src={"flags/" + currentFlag.toLowerCase() + ".svg"} alt="" />
        {buttons.map((element, id) => (
          <button key={id} type="button" onClick={() => answer(element)}>{element}</button>
        ))}
      </form>
    </div>
  )
}

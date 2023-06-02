import './App.css';
import { useState, useRef, useEffect } from "react"
import data from "./countries.json";
// console.log(Object.keys(data));

export default function App() {
  const [codes, setCodes] = useState(Object.keys(data))
  const [currentFlag, setFlag] = useState("")
  const [buttons, setButtons] = useState([])
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)

  function getQuiz() {
    let newFlag = codes[Math.floor(Math.random() * (codes.length - 1))]
    let newButtons = [data[codes[Math.floor(Math.random() * (codes.length - 1))]],]
    while (newButtons.length < 3) {
      let newButton = data[codes[Math.floor(Math.random() * (codes.length - 1))]]
      if (!newButtons.includes(newButton) && newButton !== data[newFlag]) {
        newButtons.push(newButton)
      }
    }
    newButtons.splice(Math.floor(Math.random() * 4), 0, data[newFlag])
    setFlag(newFlag)
    setButtons(newButtons)
  }

  useEffect(() => {
    getQuiz()
  }, [])

  function answer(element) {
    if (data[currentFlag] === element) {
      console.log("Right answer");
      setScore(score + 1)
    }
    else {
      setLives(lives - 1)
    }
    getQuiz()
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

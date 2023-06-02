import './App.css';
import { useState, useRef, useEffect } from "react"
import data from "./countries.json";
// console.log(Object.keys(data));

export default function App() {
  const [codes, setCodes] = useState(Object.keys[data])
  console.log(Object.keys[data])
  const [currentFlag, setFlag] = useState("")
  const [buttons, setButtons] = useState([])
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)

  function getQuiz() {
    let newFlag = codes[Math.floor(Math.random() * (codes.length - 1))]
    let newButtons = [
      data[newFlag],
      data[codes[Math.floor(Math.random() * (codes.length - 1))]],
      data[codes[Math.floor(Math.random() * (codes.length - 1))]],
      data[codes[Math.floor(Math.random() * (codes.length - 1))]]
    ]
    for (let i = 3; i > 0; i--) {
      let random = Math.floor(Math.random() * (i + 1))
      let slot = newButtons[i]
      newButtons[i] = newButtons[random]
      newButtons[random] = slot
    }
    setFlag(newFlag)
    setButtons(newButtons)
  }

  function restart() {
    setFlag(Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))])
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

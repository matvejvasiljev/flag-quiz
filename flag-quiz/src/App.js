import './App.css';
import { useState, useRef, useEffect } from "react"
import data from "./countries.json";
// console.log(Object.keys(data));

export default function Game() {
  const [currentFlag, setFlag] = useState(Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))])
  const [buttons, setButtons] = useState([data[currentFlag], data[Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))]], data[Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))]], data[Object.keys(data)[Math.floor(Math.random() * (Object.keys(data).length - 1))]]])

    return (
        <div className="game">
          <form action="">
            <h1>Flag Quiz</h1>
            <img src={"flags/" + currentFlag.toLowerCase() + ".svg"} alt="" />
            {buttons.map((element, id) => (
              <button key={id}>{element}</button>
            ))}
          </form>
        </div>
    )
}

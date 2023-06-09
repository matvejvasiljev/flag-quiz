import './App.css';
import { useState, useEffect } from "react"
// import data from "./countries.json";
// console.log(Object.keys(data));

export default function App() {
    const [countries, setCountries] = useState([])
    // const [codes, setCodes] = useState(Object.keys(data))
    const [currentFlag, setCurrentFlag] = useState("")
    const [currentCountry, setCurrentCountry] = useState("")
    const [buttons, setButtons] = useState([])
    const [buttonClass, setButtonClass] = useState("")
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [correctButton, setCorrectButton] = useState(null)
    const [incorrectButton, setIncorrectButton] = useState(null)

    function getCountries() {
        fetch("https://restcountries.com/v3.1/all", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response.json())
            })
            .then((data) => {
                setCountries(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (countries.length === 0) {
            getCountries()
        }
        // console.log(countries);
    }, [countries])

    // function getQuiz() {
    //     let newFlag = countries[Math.floor(Math.random() * (countries.length - 1))].flags.svg
    //     let newButtons = [countries[Math.floor(Math.random() * (countries.length - 1))].name.common]
    //     while (newButtons.length < 3) {
    //         let newButton = countries[Math.floor(Math.random() * (countries.length - 1))].name.common
    //         if (!newButtons.includes(newButton) && newButton !== data[newFlag]) {
    //             newButtons.push(newButton)
    //         }
    //     }
    //     newButtons.splice(Math.floor(Math.random() * 4), 0, data[newFlag])
    //     setCurrentFlag(newFlag)
    //     setButtons(newButtons)
    // }

    function getQuiz() {
        setCorrectButton(null)
        setIncorrectButton(null)
        const trueCountry = countries[Math.floor(Math.random() * (countries.length - 1))];
        setCurrentCountry(trueCountry.name.common);
        setCurrentFlag(trueCountry.flags.svg);
    }

    useEffect(() => {
        if (countries.length !== 0 && currentCountry !== "") {
            const selectedCountriesNames = [];
            while (selectedCountriesNames.length < 3) {
                let newCountry = countries[Math.floor(Math.random() * (countries.length - 1))];
                console.log(newCountry);
                if (!selectedCountriesNames.includes(newCountry.name.common)) {
                    selectedCountriesNames.push(newCountry.name.common);
                }
            }
            selectedCountriesNames.splice(Math.floor(Math.random() * 4), 0, currentCountry)
            setButtons(selectedCountriesNames)
            console.log(currentCountry);
        }
    }, [currentCountry, countries])

    useEffect(() => {
        if (countries.length !== 0) {
            getQuiz()
        }
        // eslint-disable-next-line
    }, [countries])

    function answer(element, id) {
        setCorrectButton(buttons.indexOf(currentCountry))
        let newLives = lives
        setButtonClass("disabled")

        if (currentCountry === element) {
            console.log("Right answer");
            setScore(score + 1)
        }
        else {
            setIncorrectButton(id)
            newLives = lives - 1
            setLives(newLives)
            if (newLives < 1) {
                setButtonClass("disabled")
                console.log("Game Over");
            }
        }

        setTimeout(() => {
            if (newLives > 0) {
                console.log(buttonClass);
                getQuiz()
                setButtonClass("")
            }
        }, 1000);
    }

    function restart() {
        setScore(0)
        setLives(3)
        setIncorrectButton(null)
        setCorrectButton(null)
        setButtonClass("")
        getQuiz()
    }

    return (
        <div className="main">
            <div className="game">
                <form action="">
                    <h2 className="score">Score: {score}</h2>
                    <h1>Flag Quiz</h1>
                    <h2 className="lives">Lives: {lives}</h2>
                    <button className="settingsButton"></button>
                    <img src={currentFlag} alt="" />
                    {buttons.map((element, id) => (
                        <button className={buttonClass + (id === correctButton ? " correct" : "") + (id === incorrectButton ? " incorrect" : "")} key={id} type="button" onClick={() => answer(element, id)}>{element}</button>
                    ))}
                </form>
                <button style={lives < 1 ? { transform: "translateY(100%)" } : { transform: "" }} className="restartButton" onClick={() => restart()}>Restart</button>
            </div>
            <form className="settings" action="">
                <h1>Settings</h1>
                <button>1 flag, 4 countries</button>
                <button>1 country, 4 flags</button>
            </form>
        </div>
    )
}

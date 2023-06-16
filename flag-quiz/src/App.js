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
    const [time, setTime] = useState(60)
    const [correctButton, setCorrectButton] = useState(null)
    const [incorrectButton, setIncorrectButton] = useState(null)
    const [settingsClass, setSettingsClass] = useState("")
    const [gameMode, setGameMode] = useState("oneFlagFourCountries")
    const [gameType, setGameType] = useState("lives")

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
                    selectedCountriesNames.push(gameMode === "oneFlagFourCountries" ? newCountry.name.common : newCountry.flags.svg);
                }
            }
            selectedCountriesNames.splice(Math.floor(Math.random() * 4), 0, gameMode === "oneFlagFourCountries" ? currentCountry : currentFlag)
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
        setCorrectButton(buttons.indexOf(gameMode === "oneFlagFourCountries" ? currentCountry : currentFlag))
        let newLives = lives
        setButtonClass("disabled")

        if (currentCountry === element || currentFlag === element) {
            console.log("Right answer");
            setScore(score + 1)
        }
        else {
            setIncorrectButton(id)
            if (gameType === "lives") {
                newLives = lives - 1
                setLives(newLives)
                if (newLives < 1) {
                    setButtonClass("disabled")
                    console.log("Game Over");
                }
            }
            else {

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

    function gameModeChange(mode) {
        setSettingsClass("")
        setGameMode(mode)
        console.log(mode);
        restart()
        setTime(60)
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime(time => time - 1)
        }, 1000);
        return () => clearInterval(timeInterval)
    }, [])

    function gameTypeChange() {
        setGameType(gameType === "timer" ? "lives" : "timer")
        setTime(60)
    }

    return (
        <div className="main">
            <div className="game" style={settingsClass === "settingsShow" ? { opacity: "0" } : {}}>
                <form action="">
                    <h2 className="score">Score: {score}</h2>
                    <h1>Flag Quiz</h1>
                    <h2 className="lives">{gameType === "lives" ? "Lives: " + lives : "Time: " + time}</h2>
                    <button type="button" className="settingsButton" onClick={() => setSettingsClass("settingsShow")}></button>
                    {gameMode === "oneFlagFourCountries" ? <img src={currentFlag} alt="" /> : <h2 className="countryName">{currentCountry}</h2>}
                    {buttons.map((element, id) => (
                        <button className={buttonClass + (id === correctButton ? " correct" : "") + (id === incorrectButton ? " incorrect" : "")} key={id} type="button" onClick={() => answer(element, id)}>{gameMode === "oneFlagFourCountries" ? element : <img src={element} alt="" />}</button>
                    ))}
                </form>
                <button style={lives < 1 ? { transform: "translateY(100%)" } : {}} className="restartButton" onClick={() => restart()}>Restart</button>
            </div>
            <form className={"settings " + settingsClass} action="">
                <h1>Settings</h1>
                <div className="settingsLeft">
                    <button type="button" onClick={() => gameModeChange("oneFlagFourCountries")}>1 flag, 4 countries</button>
                    <button type="button" onClick={() => gameModeChange("oneCountryFourFlags")}>1 country, 4 flags</button>
                    <button type="button" onClick={() => gameModeChange("ConnectFlags")}>Connect flags</button>
                </div>
                <div className="settingsRight">
                    <h3>3 lives</h3>
                    <label class="switch">
                        <input onChange={() => gameTypeChange()} type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                    <h3>Timer</h3>
                </div>
            </form>
        </div>
    );
};

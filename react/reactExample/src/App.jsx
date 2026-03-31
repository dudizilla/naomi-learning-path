import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function StrawberryArea() {
    const [strawberryCount, setStrawberryCount] = useState(0);

    function handleClick() {
        setStrawberryCount((prev) => prev + 1);
    }

    return (
        <div>
            <h2> Strawberry Area</h2>
            <p> We have {strawberryCount} strawberries in stock </p>
            <button onClick={handleClick}> Add strawberry</button>
        </div>
    );
}
function Animal(props) {
    return (
        <li>
            {" "}
            This is a {props.species} named {props.name}
        </li>
    );
}

function AnimalsArea() {
    return (
        <section>
            <h2> Animals List </h2>
            <ul>
                <Animal name="Meow" species="cat" />
                <Animal name="Woof" species="dog" />
                <Animal name="Oink" species="pig" />
            </ul>
        </section>
    );
}

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1> Welcome to our page!</h1>
            <AnimalsArea />
            <StrawberryArea />
        </>
    );
}

export default App;

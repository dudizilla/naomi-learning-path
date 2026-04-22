import React from "react";
import { createRoot } from "react-dom";
import Pizza from "./Pizza";

const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Ginos"),
    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "Something cool about pizzas",
    }),
    React.createElement(Pizza, {
      name: "Americano",
      description: "French fries and hot dogs",
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian",
      description: "pineapple and ham, wtf",
    }),
    React.createElement(Pizza, {
      name: "Chicken salad Pizza",
      description: "if you wanna a healthy idea",
    }),
    React.createElement(Pizza),
    React.createElement(Pizza),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));

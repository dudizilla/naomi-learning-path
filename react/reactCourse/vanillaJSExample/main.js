const root = document.querySelector(".block");
const state = new Proxy(
    { strawberryCount: 0 },
    {
        set(target, key, value) {
            target[key] = value;
            render();
            return true;
        },
    },
);

function Animal(name, species) {
    return `<li> This is a ${species} named ${name}</li>`;
}

function AnimalsArea() {
    return `
    <h2> Animals List </h2>
    <ul>
        ${Animal("Meow", "cat")}
        ${Animal("Woof", "dog")}
        ${Animal("Galop", "horse")}
    </ul>
    `;
}

function StrawberryArea() {
    return `
    <div>
        <h2> Strawberry Area </h2>
        <p> We have ${state.strawberryCount} strrawberries in stock.</p>
        <button onClick="state.strawberryCount++"> Add a Strawberry </button>
    </div>
    `;
}

function App() {
    return `
    <h1> Welcome to our page! </h1>
    ${AnimalsArea()}
    ${StrawberryArea()}
    `;
}

function render() {
    root.innerHTML = App();
}

render();

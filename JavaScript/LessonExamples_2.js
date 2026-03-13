function greet(firstName, lastName, honorific, greeting){
    return `${greeting} ${honorific} ${lastName}, we are pleased to meet you!
    Have a nice day, ${firstName} !`
}

console.log(greet('Naom','Mori', 'Mrs.', "Howdie")) 

const myHomeCity = "São Paulo";
const myHomeState = "São Paulo";
const myHomeCountry = "BRA";

function logOutYourHome(city, state, country) {
  console.log(`You are from ${city}, ${state} ${country}.`);
}

logOutYourHome(myHomeCity, myHomeState, myHomeCountry);

const chirp = () => {
  console.log("chirp chirp");
};


const A = "A"; 
let F; 

function doStuff(B) {
  console.log(B); //prints b
  const C = "C";
  let H = "H";
  if (1 + 1 === 2) {
    const D = "D";
    H = "something else";
  }
  console.log(D); // defined out of scope
  console.log(H); // works

  F = "F"
}

let E = 0;
while (E < 3) {
  E++;
  console.log(A); //works, 
  const G = "G"; 
}
console.log(E); //works
console.log(G); // no, declared inside a different scope

doStuff("B");
console.log(B); //works
console.log(C); // doesn't work, belongs to the function scope
console.log(F); //works


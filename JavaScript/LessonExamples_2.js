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
  //console.log(D); // defined out of scope
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
//console.log(G); // no, declared inside a different scope

doStuff("B");
//console.log(B); // doesn't work here, out of scope
//console.log(C); // doesn't work, belongs to the function scope
console.log(F); //works

const sentence = "ThIs HaS wEiRd CaSiNg On It";
const lowerCaseSentence = sentence.toLowerCase();
const upperCaseSentence = sentence.toUpperCase();
console.log(lowerCaseSentence);
console.log(upperCaseSentence);

console.log(sentence.split(" "));

console.log(sentence.substring(0,7));

const number = 5.315;
const roundNum = Math.round(number);
const randNum = Math.random();
const randFun = Math.round(Math.random()*100);

console.log(`The number: ${number} \nThe rounded one: ${roundNum}\nA rand decimal: ${randNum}\n Having some fun with random: ${randFun}`);
console.log(Date.now());

const testStringOne = "The book is on the table";
const testStringTwo = "An apple a day keeps the doctor away";
const stringToLookFor = "book";

console.log(testStringOne.includes(stringToLookFor));
console.log(testStringTwo.includes(stringToLookFor));


const person = {
    name: "John",
    shoutOut() {
        console.log(this.name);
    },
}

console.log(person.name);
person.shoutOut();

const me = {
    name: {
        firstName: "Naomi",
        lastName: "Mori",
    },
    location: {
        streetNumber: 13,
        street: "Rua dos Bobos",
        city: "Cidade Universitária",
        state: "SP",
        zipCode: "12345-000",
        country: "Nowhereland",
    },
    getAdress() {
        return `${this.name.firstName} ${this.name.lastName}\n${this.location.street}, ${this.location.streetNumber}, ${this.location.city}, ${this.location.state}, CEP ${this.location.zipCode}, ${this.location.country} 
        `
    },
};

console.log(me.getAdress());

const pullOutAdress = me.getAdress.bind(me);

const arrayEx = [
    "Casa", 1, 3, 4, "teto", true, { name: "Naomi", lastName: "Mori"}
];

console.log(arrayEx);
console.log(arrayEx.length);
console.log(arrayEx.join(" --- "));

const courses = [
    {teacher: "Nakamura sense", course: "Intro to Japanese" ,},
    {teacher: "John Kim", course: "Intro to Korean",},
    {teacher: "Maria da Silva", course: "Intro to Portuguese",}
];

courses.push({teacher: "Peter Smith", course: "Advanced English"});
console.log(courses);

const engCourse = courses.pop();
console.log(engCourse);

courses[2] = {teacher: "Ellen Zhang", course: "Intro to Mandarin"}
console.log(courses)

const cities = [
  "São Paulo",
  "Porto Alegre",
  "Seattle",
  "Vancouver",
];

for (let i = 0; i < cities.length; i++) {
  console.log(cities[i]);
}

cities.forEach(function (city) {
  console.log(city);
});

cities.shift();
console.log(cities);

cities.unshift("Rio de Janeiro");
console.log(cities)
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
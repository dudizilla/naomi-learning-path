const onlySquare = document.querySelector(".only-square");
onlySquare.style.backgroundColor = "yellow"; 

const whichSquare = document.querySelector(".squares");
whichSquare.style.fontWeight = "bold";

const allSquares = document.querySelectorAll(".squares");

for (let i = 0; i < allSquares.length; i++) {
  const currentElement = allSquares[i];
  currentElement.style.width = "300px";
}

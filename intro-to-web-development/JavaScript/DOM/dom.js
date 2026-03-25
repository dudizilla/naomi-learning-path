const onlySquare = document.querySelector(".only-square");
onlySquare.style.backgroundColor = "yellow"; 

const whichSquare = document.querySelector(".squares");
whichSquare.style.fontWeight = "bold";

const allSquares = document.querySelectorAll(".squares");

for (let i = 0; i < allSquares.length; i++) {
  const currentElement = allSquares[i];
  currentElement.style.width = "300px";
}

const button = document.querySelector(".event-button");
button.addEventListener(
    "click", function () {
        alert("Good Morning, Sunshine!");
    }
);

const input = document.querySelector(".input-to-copy");
const paragraph = document.querySelector(".p-to-copy-to");

input.addEventListener("keyup", function () {
  paragraph.innerText = input.value;
});

const colorBox = document.querySelector(".color-box");
const colorInput = document.querySelector(".color-input");

colorInput.addEventListener("change", function(){
    colorBox.style.backgroundColor = colorInput.value;
});

document.querySelector(".button-container")
  .addEventListener("click", 
    function (event) {
        alert(`This is ${event.target.innerText}`);
    }
);
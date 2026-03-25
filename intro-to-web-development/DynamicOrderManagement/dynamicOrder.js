const cart = [
    {
        id: 1,
        name: "Cappuccino",
        ingredients: ["Extra Foam", "Double Espresso"],
        price: 14.5,
        quantity: 1,
    },
    {
        id: 2,
        name: "Croissant",
        ingredients: ["Butter"],
        price: 5.5,
        quantity: 2,
    },
    {
        id: 3,
        name: "Iced Americano",
        ingredients: ["Extra Ice"],
        price: 9.9,
        quantity: 1,
    },
    //{ id: 4, name: "Cookie", ingredients: [], price: 4.5, quantity: 3 },
];

const cartList = document.querySelector(".cart__list");
let orderSum = 0;

function showFinalValues(){
        const subtotal = document.querySelector(".total__subtotal");
    const subtotalValue = document.createElement("td");
    subtotalValue.classList.add("total__price");
    subtotalValue.innerText = orderSum.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    subtotal.appendChild(subtotalValue);

    const tax = document.querySelector(".total__tax");
    const taxValue = document.createElement("td");
    taxValue.classList.add("total__price");
    taxValue.innerText = (orderSum*0.08).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    tax.appendChild(taxValue);

    const total = document.querySelector(".total__row--total");
    const totalValue = document.createElement("td");
    totalValue.classList.add("total__price");
    totalValue.innerText = (orderSum*1.08).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
   total.appendChild(totalValue);
}

function renderItems(items) {
    
    items.forEach((item) => {
        let ingredientsHTML = "";

        item.ingredients.forEach((ingredient) => {
            ingredientsHTML += `<p class="cart__item-spec">${ingredient}</p>`;
        });

        let price = item.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        const itemList = document.createElement("li");
        itemList.innerHTML = ` 
        <div class="cart__quantity"> 
            <button class="cart__button">+</button>
            <span>${item.quantity}</span>
            <button class="cart__button">-</button>
        </div>
        <div class="cart__item-middle"> 
            <p class="cart__item-name">${item.name}</p>
            ${ingredientsHTML}   
        </div>
        <div class="cart__item-price">${price}</div> `;

        itemList.classList.add("cart__item");

        cartList.appendChild(itemList);
        orderSum += parseInt(item.quantity) * parseFloat(item.price);
    });
}

renderItems(cart);
showFinalValues();

cartList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        let buttonValue = event.target.innerText;

        const button = event.target;
        const parent = button.parentElement;
        const sibling = parent.querySelector("span");
        console.log(sibling, sibling.innerText)
        if (buttonValue === "+") {
            console.log("aqui aumenta");
        } else console.log("aqui abaixa");
    }
});

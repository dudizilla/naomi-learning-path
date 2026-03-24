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
    { id: 4, name: "Cookie", ingredients: [], price: 4.5, quantity: 3 },
];

const cartList = document.querySelector(".cart__list");

function renderItems(items) {
    items.forEach((item) => {
        let ingredientsHTML = "";

        item.ingredients.forEach((ingredient) => {
            ingredientsHTML += `<p class="cart__item-spec">${ingredient}</p>`;
        });

        const itemList = document.createElement("li");
        itemList.innerHTML = ` <div class="cart__quantity"> ${item.quantity} </div>
        <div class="cart__item-middle"> 
            <p class="cart__item-name"> ${item.name} </p>
            <p class="cart__item-spec">  </p>
            ${ingredientsHTML}   
        </div>
        <div class="cart__item-price"> R$ ${item.price.toFixed(2)}</div>
    `;
        itemList.classList.add("cart__item");

        cartList.appendChild(itemList);
    });
}

renderItems(cart);

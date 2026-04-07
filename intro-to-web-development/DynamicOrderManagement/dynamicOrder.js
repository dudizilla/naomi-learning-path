const initialCart = [
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
    {
        id: 4,
        name: "Cookie",
        ingredients: ["Extra Chocolate Chips"],
        price: 4.5,
        quantity: 3,
    },
    {
        id: 5,
        name: "Orange Juice",
        ingredients: [],
        price: 10,
        quantity: 1,
    },
];

const cartList = document.querySelector(".cart__list");

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCart = () => {
    const saved = localStorage.getItem("cart");
    if (!saved) return structuredClone(initialCart);
    try {
        return JSON.parse(saved);
    } catch {
        return structuredClone(initialCart);
    }
};

let cart = loadCart();

function calculateTotals(items) {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

function showTotals() {
    const orderSum = calculateTotals(cart);

    const updateRow = (rowClass, value) => {
        const row = document.querySelector(rowClass);
        if (!row) return;
        let rowValue = row.querySelector(".total__price");

        if (!rowValue) {
            rowValue = document.createElement("td");
            rowValue.classList.add("total__price");
            row.appendChild(rowValue);
        }
        rowValue.innerText = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    updateRow(".total__subtotal", orderSum);
    updateRow(".total__tax", orderSum * 0.085);
    updateRow(".total__row--total", orderSum * 1.085);
}

function renderItems(items) {
    cartList.innerHTML = "";

    if (items.length === 0) {
        const message = document.createElement("h3");
        message.classList.add("cart__message");
        message.innerText = "You have no items in the cart :(";
        cartList.appendChild(message);

        const restartButton = document.createElement("button");
        restartButton.classList.add("cart__button");
        restartButton.classList.add("cart__button--large");
        restartButton.innerText = "Restart";
        cartList.appendChild(restartButton);
        showTotals();
        return;
    }

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
            <button class="cart__button" data-item-id="${item.id}">+</button>
            <span class="cart__span">${item.quantity}</span>
            <button class="cart__button" data-item-id="${item.id}">-</button>
        </div>
        <div class="cart__item-middle"> 
            <p class="cart__item-name">${item.name}</p>
            ${ingredientsHTML}   
        </div>
        <div class="cart__item-price">${price}</div> `;

        itemList.classList.add("cart__item");

        cartList.appendChild(itemList);
    });

    showTotals();
}

function removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
}

renderItems(cart);
cartList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const button = event.target;
        const buttonValue = button.innerText;

        const itemId = parseInt(button.dataset.itemId);
        const item = cart.find((item) => item.id === itemId);

        if (buttonValue === "+") {
            item.quantity += 1;
        } else if (buttonValue === "-") {
            if (item.quantity >= 1) {
                item.quantity -= 1;
            }
            if (item.quantity === 0) {
                removeItem(itemId);
            }
        } else if (buttonValue === "Restart") {
            localStorage.removeItem("cart");
            cart = structuredClone(initialCart);
        }
        renderItems(cart);
        saveCart();
    }
});

class MenuItem {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Restaurant {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.menu = [];
    }

    addMenuItem(item) {
        this.menu.push(item);
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        updateCartUI();
    }

    getTotal() {
        return this.items.reduce(
            (sum, item) => sum + item.price,
            0
        );
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.cart = new Cart();
        this.orderHistory = [];
    }
}

class DeliveryPartner {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.available = true;
    }
}

// Strategy Pattern

class PaymentStrategy {
    pay(amount) {}
}

class UPI extends PaymentStrategy {
    pay(amount) {
        return `UPI Payment Successful ₹${amount}`;
    }
}

class CreditCard extends PaymentStrategy {
    pay(amount) {
        return `Credit Card Payment Successful ₹${amount}`;
    }
}

class COD extends PaymentStrategy {
    pay(amount) {
        return `Cash On Delivery Selected ₹${amount}`;
    }
}

class Coupon {
    constructor(code, discount) {
        this.code = code;
        this.discount = discount;
    }

    apply(total) {
        return total - this.discount;
    }
}

class Order {
    constructor(id) {
        this.id = id;
        this.status = "Placed";
    }

    updateStatus(status) {
        this.status = status;
        logMessage(
            `Order #${this.id} Status: ${status}`
        );
    }
}



const user = new User("Surya");

const restaurants = [];

const kfc = new Restaurant(
    1,
    "KFC"
);

kfc.addMenuItem(
    new MenuItem(
        1,
        "Chicken Burger",
        180
    )
);

kfc.addMenuItem(
    new MenuItem(
        2,
        "French Fries",
        120
    )
);

const dominos = new Restaurant(
    2,
    "Dominos"
);

dominos.addMenuItem(
    new MenuItem(
        3,
        "Pepperoni Pizza",
        350
    )
);

dominos.addMenuItem(
    new MenuItem(
        4,
        "Cheese Burst Pizza",
        450
    )
);

restaurants.push(kfc);
restaurants.push(dominos);

const deliveryPartners = [
    new DeliveryPartner(1, "Arun"),
    new DeliveryPartner(2, "Karthik")
];

let finalAmount = 0;



function loadRestaurants() {

    const container =
        document.getElementById(
            "restaurantList"
        );

    restaurants.forEach(
        restaurant => {

            const card =
                document.createElement("div");

            card.classList.add(
                "restaurant-card"
            );

            let menuHTML = "";

            restaurant.menu.forEach(
                item => {

                    menuHTML += `
                        <div class="menu-item">
                            <span>
                                ${item.name}
                                (₹${item.price})
                            </span>

                            <button
                                onclick="addToCart(${item.id})">
                                Add
                            </button>
                        </div>
                    `;
                }
            );

            card.innerHTML = `
                <h3>${restaurant.name}</h3>
                ${menuHTML}
            `;

            container.appendChild(card);
        }
    );
}

function addToCart(itemId) {

    let selectedItem;

    restaurants.forEach(
        restaurant => {

            restaurant.menu.forEach(
                item => {

                    if(item.id === itemId){
                        selectedItem = item;
                    }
                }
            );
        }
    );

    user.cart.addItem(selectedItem);
}

function updateCartUI() {

    const cartList =
        document.getElementById(
            "cartItems"
        );

    cartList.innerHTML = "";

    user.cart.items.forEach(
        item => {

            cartList.innerHTML += `
                <li>
                    ${item.name}
                    - ₹${item.price}
                </li>
            `;
        }
    );

    document.getElementById(
        "totalPrice"
    ).innerText =
        user.cart.getTotal();
}

function applyCoupon() {

    const code =
        document.getElementById(
            "couponCode"
        ).value;

    let total =
        user.cart.getTotal();

    if(code === "SAVE50") {

        const coupon =
            new Coupon(
                "SAVE50",
                50
            );

        total =
            coupon.apply(total);

        finalAmount = total;

        document.getElementById(
            "totalPrice"
        ).innerText = total;

        alert(
            "Coupon Applied Successfully!"
        );
    }
}

function placeOrder() {

    let amount =
        finalAmount ||
        user.cart.getTotal();

    const paymentType =
        document.getElementById(
            "paymentMethod"
        ).value;

    let payment;

    if(paymentType === "upi") {
        payment = new UPI();
    }
    else if(paymentType === "credit") {
        payment =
            new CreditCard();
    }
    else {
        payment = new COD();
    }

    logMessage(
        payment.pay(amount)
    );

    const order =
        new Order(1001);

    logMessage(
        `Order #${order.id} Created`
    );

    const partner =
        deliveryPartners.find(
            p => p.available
        );

    if(partner) {

        partner.available = false;

        logMessage(
            `Delivery Partner Assigned: ${partner.name}`
        );
    }

    setTimeout(() => {
        logMessage(
            "Restaurant Accepted"
        );
        order.updateStatus(
            "Preparing"
        );
    }, 1000);

    setTimeout(() => {
        order.updateStatus(
            "Out For Delivery"
        );
    }, 3000);

    setTimeout(() => {
        order.updateStatus(
            "Delivered"
        );
    }, 5000);
}

function logMessage(message) {

    const output =
        document.getElementById(
            "orderOutput"
        );

    output.innerHTML += `
        <div class="order-log">
            ${message}
        </div>
    `;
}

loadRestaurants();
function placeOrder(callback) {
    setTimeout(() => {
        console.log("Order placed");
        callback();
    }, 2000);
}

function prepareFood(callback) {
    setTimeout(() => {
        console.log("Food prepared");
        callback();
    }, 3000);
}

function assignDelivery(callback) {
    setTimeout(() => {
        console.log("Delivery partner assigned");
        callback();
    }, 1500);
}

function deliverFood() {
    setTimeout(() => {
        console.log("Food delivered");
    }, 2000);
}

placeOrder(() => {
    prepareFood(() => {
        assignDelivery(() => {
            deliverFood();
        });
    });
});
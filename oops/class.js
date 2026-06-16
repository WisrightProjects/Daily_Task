class product {
    constructor(name,price){
        this.name = name;
        this.price = price;     
    }

    displayproduct(){
        console.log(`product : ${this.name}`,`->`, `price:${this.price}`);
    }

    calculatetotal(salestax){
        return this.price + (this.price * salestax);
    }
}

const salestax = 50;
const product1 = new product (`shirt`, '350.99₹');
const product2 = new product (`pant`, "500.89₹");
const product3 = new product (`T-Shirt`, "250₹");
const product4 = new product (`Track Pant`, "300₹");
const product5 = new product (`Under Ware`, "450₹");

product1.displayproduct();
product2.displayproduct();
product3.displayproduct();
product4.displayproduct();
product5.displayproduct();

const total  =  product3.calculatetotal(salestax); 
console.log(`totalprice with tax : ${total}`);
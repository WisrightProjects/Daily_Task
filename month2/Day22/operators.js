console.log(" DAY 22: JavaScript Operators, Coercion & Validation");

// Modulo Operator
console.log("10 % 3 =", 10 % 3);

//  == vs ===
let num = 5;
let str = "5";

console.log("5 == '5' →", num == str);
console.log("5 === '5' →", num === str);

// Type Coercion 
console.log("'10' + 5 =", "10" + 5);
console.log("'10' - 5 =", "10" - 5);

// Falsy and Truthy 
console.log("Boolean(0) →", Boolean(0));
console.log("Boolean([]) →", Boolean([]));
console.log("Boolean({}) →", Boolean({}));

// Logical Operators 
let userInput = "";
let displayValue = userInput || "No input provided";
console.log("OR default value:", displayValue);

console.log("AND short-circuit:", true && "Hello" && 42);

// Nullish Coalescing 
console.log("0 ?? 'Default' →", 0 ?? "Default");

// Even/Odd Check 
let number = 8;
let isEven = number % 2 === 0;
console.log("Is Even:", isEven);

// Validation Checks 

// Age validation
let age = 25;
let isValidAge =
  typeof age === "number" &&
  age > 0 &&
  age <= 120;

console.log("Valid Age:", isValidAge);

// Username validation
let username = "MachiDev";
let isValidUsername =
  typeof username === "string" &&
  username.trim().length >= 3 &&
  username.length <= 15;

console.log("Valid Username:", isValidUsername);

// Price validation
let price = 499.99;
let isValidPrice =
  typeof price === "number" &&
  price >= 0 &&
  isFinite(price);

console.log("Valid Price:", isValidPrice);
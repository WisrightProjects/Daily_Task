// ==============================
// Day 21 - JavaScript Fundamentals
// ==============================

console.log("Day 21 JavaScript Practice");

// ======================================
// Variables using const and let
// ======================================

const appName = "MyApp";
let userCount = 0;

userCount += 1;

console.log(appName);
console.log(userCount);

// ======================================
// Personal Information
// ======================================

const name = "Surya";
const birthYear = 2004;

let age = 21;
let city = "Chennai";

console.log(name);
console.log(birthYear);
console.log(age);
console.log(city);

// ======================================
// Primitive Data Types
// ======================================

const userName = "Surya";                 
const userAge = 21;                        
const isStudent = true;                   
let futureGoal;                           
const emptyValue = null;                  
const uniqueId = Symbol("id");            
const bigNumber = 1234567890123456789n;   

console.log(typeof userName);
console.log(typeof userAge);
console.log(typeof isStudent);
console.log(typeof futureGoal);
console.log(typeof emptyValue);
console.log(typeof uniqueId);
console.log(typeof bigNumber);


// Book Object

const book = {
  title: "Atomic Habits",
  author: "James Clear",
  year: 2018,
  isAvailable: true
};

console.log(book.title);
console.log(book["year"]);

// Person Object with Nested Object

const person = {
  firstName: "Surya",
  lastName: "Dinesh",
  age: 21,
  isStudent: true,
  hobbies: ["Coding", "Gaming", "Music"],

  address: {
    city: "Chennai",
    country: "India"
  }
};

console.log(person);


// Colors Array

const colors = ["Red", "Blue", "Green", "Yellow", "Black"];

console.log(colors[0]);
console.log(colors[colors.length - 1]);
console.log(colors.length);

// Favourite

const favoriteMovies = [
  "Leo",
  "Interstellar",
  "Master",
  "Avengers: Endgame",
  "The Dark Knight"
];

console.log(favoriteMovies[0]);
console.log(favoriteMovies[2]);
console.log(favoriteMovies.length);
console.log(favoriteMovies[favoriteMovies.length - 1]);


// Array Checking

const items = ["Pen", "Book", "Laptop"];

const data = {
  name: "Surya",
  age: 21
};

console.log(typeof items);
console.log(typeof data);

console.log(Array.isArray(items));
console.log(Array.isArray(data));


// Checking Types of Different Values

const values = [
  "Hello",
  25,
  true,
  undefined,
  null,
  [1, 2, 3],
  { role: "Developer" },
  function () {
    console.log("I am a function");
  }
];

for (let value of values) {

  if (Array.isArray(value)) {
    console.log(value, "=> array");
  }

  else {
    console.log(value, "=>", typeof value);
  }
}

// Console Methods

console.warn("This is a warning message");

console.table([
  { name: "Surya", age: 21 },
  { name: "Dinesh", age: 22 }
]);

console.log("Day 21 Task Completed Successfully");
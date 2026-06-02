let evenCount = 0;
let oddCount = 0;
let sum = 0;

console.log("Numbers from 1 to 100:");

for (let i = 1; i <= 100; i++) {

    sum += i;

    if (i % 2 === 0) {
        evenCount++;
    } else {
        oddCount++;
    }

    console.log(i);
}

console.log("\nSummary");
console.log("Total Sum:", sum);
console.log("Even Numbers:", evenCount);
console.log("Odd Numbers:", oddCount);
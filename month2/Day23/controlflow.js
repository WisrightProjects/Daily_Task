let students = [
    { name: "Arun", mark: 85 },
    { name: "Priya", mark: 72 },
    { name: "Kumar", mark: 45 },
    { name: "Divya", mark: 95 }
];

let passCount = 0;
let failCount = 0;

for (let student of students) {

    let grade;

    // Control Flow - if else
    if (student.mark >= 90) {
        grade = "A";
    } else if (student.mark >= 75) {
        grade = "B";
    } else if (student.mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    if (grade === "F") {
        failCount++;
    } else {
        passCount++;
    }

    let remark;

    switch (grade) {
        case "A":
            remark = "Excellent";
            break;

        case "B":
            remark = "Good Job";
            break;

        case "C":
            remark = "Need Improvement";
            break;

        case "F":
            remark = "Failed";
            break;

        default:
            remark = "Invalid Grade";
    }

    console.log(
        `${student.name} | Mark: ${student.mark} | Grade: ${grade} | ${remark}`
    );
}

console.log("\nClass Summary");
console.log("Passed counts:", passCount);
console.log("Failed counts:",failCount);
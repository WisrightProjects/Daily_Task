// arrow function

const greet = name => `Hello, ${name}`;

// temmplate literals

const name = "Surya";
console.log(`Hello ${name}`);

// destructuring

const person = { name: "Arun", age: 25 };
const { name, age } = person;

// spread operator

const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];



// Student Class
class Student {
    constructor(id, name, marks) {
        this.id = id;
        this.name = name;
        this.marks = marks;
    }
}

class StudentManager {

    constructor() {
        this.students = [];
    }

    addStudent = (id, name, marks = 0) => {
        const student = new Student(id, name, marks);

        this.students = [...this.students, student];

        console.log(`${name} added successfully.`);
    };

    displayStudents = () => {
        console.log("\nStudent List:");

        this.students.forEach(({ id, name, marks }) => {
            console.log(
                `ID: ${id} | Name: ${name} | Marks: ${marks}`
            );
        });
    };

    getPassedStudents = () => {
        return this.students.filter(
            student => student.marks >= 50
        );
    };

    getTopper = () => {
        return this.students.reduce(
            (topper, student) =>
                student.marks > topper.marks
                    ? student
                    : topper
        );
    };

    getAverageMarks = () => {

        const total = this.students.reduce(
            (sum, student) => sum + student.marks,
            0
        );

        return total / this.students.length;
    };
}

const manager = new StudentManager();

manager.addStudent(1, "Arun", 85);
manager.addStudent(2, "Priya", 92);
manager.addStudent(3, "Kumar", 45);
manager.addStudent(4, "Divya", 78);

manager.displayStudents();

console.log("\nPassed Students:");
console.log(manager.getPassedStudents());

console.log("\nTopper:");
console.log(manager.getTopper());

console.log(
    `\nAverage Marks: ${manager.getAverageMarks()}`
);
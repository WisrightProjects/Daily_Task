class Student {
  constructor(name, age, mark) {
    this.name = name;
    this.age = age;
    this.mark = mark;
  }

  displayDetails() {
    console.log(
      `Name: ${this.name}, Age: ${this.age}, Mark: ${this.mark}`
    );
  }

  isPassed() {
    return this.mark >= 35;
  }
}

const student1 = new Student("Surya", 22, 80);
const student2 = new Student("Selvam", 21, 30);

student1.displayDetails();
console.log(student1.isPassed());

student2.displayDetails();
console.log(student2.isPassed());
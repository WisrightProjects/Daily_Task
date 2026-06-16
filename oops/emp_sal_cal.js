class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  annualSalary() {
    return this.salary * 12;
  }
}

const emp1 = new Employee("Surya", 25000);

console.log(emp1.annualSalary());
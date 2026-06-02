const employees = [
    { id: 1, name: "Arun", salary: 45000, department: "IT" },
    { id: 2, name: "Priya", salary: 60000, department: "HR" },
    { id: 3, name: "Kumar", salary: 55000, department: "IT" },
    { id: 4, name: "Divya", salary: 70000, department: "Finance" },
    { id: 5, name: "Vijay", salary: 40000, department: "IT" }
];

// average salary

const averageSalary =
    employees.reduce((sum, emp) => sum + emp.salary, 0)
      employees.length;

console.log(averageSalary);

// get only employee name

const names = employees.map(emp => emp.name);

console.log(names);

// heighest salary employees

const highestPaid = employees.reduce(
    (highest, emp) =>
        emp.salary > highest.salary ? emp : highest
);

console.log(highestPaid);
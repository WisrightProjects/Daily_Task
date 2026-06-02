const expenseTracker = {

    expenses: [

        {
            id: 1,
            title: "Groceries",
            amount: 2500,
            category: "Food"
        },

        {
            id: 2,
            title: "Internet Bill",
            amount: 1000,
            category: "Utilities"
        },

        {
            id: 3,
            title: "Movie Ticket",
            amount: 500,
            category: "Entertainment"
        }
    ],

    addExpense(title, amount, category) {

        const newExpense = {
            id: this.expenses.length + 1,
            title,
            amount,
            category
        };

        this.expenses.push(newExpense);
    },

    showExpenses() {

        console.log("\nExpense List:");

        this.expenses.forEach(expense => {
            console.log(
                `${expense.title} - ₹${expense.amount} (${expense.category})`
            );
        });
    },

    getTotalExpense() {

        return this.expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );
    },

    getExpensesByCategory(category) {

        return this.expenses.filter(
            expense => expense.category === category
        );
    },

    getHighestExpense() {

        return this.expenses.reduce(
            (highest, expense) =>
                expense.amount > highest.amount
                    ? expense
                    : highest
        );
    }
};

expenseTracker.addExpense(
    "Petrol",
    1500,
    "Transport"
);

expenseTracker.showExpenses();

console.log(
    "\nTotal Spending: ₹",
    expenseTracker.getTotalExpense()
);

console.log(
    "\nFood Expenses:",
    expenseTracker.getExpensesByCategory("Food")
);

console.log(
    "\nHighest Expense:",
    expenseTracker.getHighestExpense()
);
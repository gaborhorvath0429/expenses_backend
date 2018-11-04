const Expense = require('../models/expense');

module.exports = {
    create: (req, res) => {
        const { amount, category } = req.body;
        const newExpense = new Expense({ amount, category });
        newExpense.save((e) => {
            if (e) return res.status(400).send('Saving expense failed');
            res.json(newExpense);
        });
    },

    getAll: (req, res) => {
        Expense.find({}, (e, expenses) => {
            if (e) return res.status(400).send('Getting all expenses failed');
            mapExpenses = {};
            expenses.forEach(item => {
                if (!mapExpenses[item.category]) mapExpenses[item.category] = [];
                mapExpenses[item.category].push(item.amount);
            });
            res.json(mapExpenses);
        })
    }
}
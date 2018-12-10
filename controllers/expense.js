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
            res.json(expenses);
        })
    },

    delete: (req, res) => {
        Expense.findByIdAndDelete(req.params.id, (e) => {
            if (e) return res.status(400).send('Removing expense failed');
            res.send('success');
        })
    }
}
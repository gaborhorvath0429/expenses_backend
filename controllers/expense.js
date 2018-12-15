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

    get: (req, res) => {
        let startDate = new Date(req.query.year, req.query.month - 1, req.query.day);
        let endDate = new Date(req.query.year, req.query.month - 1, Number(req.query.day) + 1);
        console.log('startDate', startDate);
        console.log('endDate', endDate);
        Expense.where('created_at').gt(startDate).where('created_at').lt(endDate).sort([['created_at', -1]]).exec((e, expenses) => {
            if (e) return res.status(400).send('Getting all expenses failed');
            res.json(expenses);
        })
    },

    getStatistics: (req, res) => {
        let startDate = new Date(req.query.year, req.query.month - 1, 1);
        let endDate = new Date(req.query.year, req.query.month, 1);
        console.log('startDate', startDate);
        console.log('endDate', endDate);
        Expense.aggregate(
        [
            {
                $match: {
                    created_at: {$gte: startDate, $lt: endDate}
                }
            },
            {
                $group: {
                    _id: '$category',
                   sum: { $sum: "$amount" }
                }
            }
        ],
        function (err, result) {
            if (err) {
                res.status(400).send('Getting statistics failed');
            } else {
                res.json(result);
            }
        }
        )
    },
    
    delete: (req, res) => {
        Expense.findByIdAndDelete(req.params.id, (e) => {
            if (e) return res.status(400).send('Removing expense failed');
            res.send('success');
        })
    }
}
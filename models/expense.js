const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    amount: {type: Number, required: true},
    category: {type: String, required: true}
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('expense', expenseSchema);
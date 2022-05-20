const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    expense_date: Date,
    category: String,
    description: String,
    amount: Number,
    rate: Number,
    total:Number,
}, 
{
    timestamps: true
});


module.exports = mongoose.model('Expense', expenseSchema);
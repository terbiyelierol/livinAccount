const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    revenue_date: Date,
    category: String,
    description: String,
    amount: Number,
    rate: Number,
    total:Number,
}, 
{
    timestamps: true
});


module.exports = mongoose.model('Revenue', revenueSchema);
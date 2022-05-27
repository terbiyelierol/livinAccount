const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    fullname: String,
    address: String,
    email: String,
    phone: String,
    business_id: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
  }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
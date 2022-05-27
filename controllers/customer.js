let User = require('../models/user');
let Customer = require('../models/customer');
let Revenue = require('../models/revenue');
var nodemailer = require('nodemailer')

module.exports = {
  customer,
  newCustomer,
  create,
  deleteCustomer,
  editCustomer,
  updateCustomer
}

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'erol.terbiyeli@gmail.com',
    pass: 'garzkkuhcornkksn'
  }
});

async function customer (req, res, next) {  
  let user = await User.findById(req.user._id)
  let customer = await Customer.find({createdBy:req.user.id})
  if(!user){
    res.redirect('/main')
  }else{
    res.render('../views/customer/customer.ejs', { title: 'Customer',user:user,customer:customer});
  }
}

 async function newCustomer (req, res, next) {
  let user = await User.findById(req.user._id)
  if(!user){
    res.redirect('/main')
  }else{
    res.render('../views/customer/customerForm.ejs', { title: 'New Customer',user:user});
  }
}

async function create (req, res, next) {
  let user = await User.findById(req.user)
  let customerObj = {
    fullname:req.body.fullname,
    address:req.body.address,
    email:req.body.email,
    phone: req.body.phone,
    business_id:req.body.business_id,
    createdBy:user
  }
  await Customer.create(customerObj)
  res.redirect('/customer')

  var mailOptions = {
    from: 'erol.terbiyeli@gmail.com',
    to: req.body.email,
    subject: "Form Info",
    text: `${req.body.fullname} were saved in ${req.user.name} customer list`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

async function deleteCustomer(req, res) {
  let customer = await Customer.findByIdAndDelete(req.params.id)  
  let revenue = await Revenue.deleteMany({customer:{$in:[customer._id]}})
  res.redirect('/customer')
}

async function editCustomer (req,res,next){
  let user = await User.findById(req.user._id)
  let customer = await Customer.findByIdAndUpdate(req.params.id)
  res.render('../views/customer/customerEdit.ejs',{title: 'Edit',user:user,customer:customer})
}

async function updateCustomer(req,res,next){
  let customer = await Customer.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/customer')
}
let User = require('../models/user');
let Supplier = require('../models/supplier');
let Expense = require('../models/expense');
var nodemailer = require('nodemailer')

module.exports = {
  supplier,
  newSupplier,
  create,
  deleteSupplier,
  editSupplier,
  updateSupplier
}

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'erol.terbiyeli@gmail.com',
    pass: 'garzkkuhcornkksn'
  }
});

async function supplier (req, res, next) {  
  let user = await User.findById(req.user._id)
  let supplier = await Supplier.find({createdBy:req.user.id})
  if(!user){
    res.redirect('/main')
  }else{
    res.render('../views/supplier/supplier.ejs', { title: 'Supplier',user:user,supplier:supplier});
  }
}

 async function newSupplier (req, res, next) {
  let user = await User.findById(req.user._id)
  if(!user){
    res.redirect('/main')
  }else{
    res.render('../views/supplier/supplierForm.ejs', { title: 'New Supplier',user:user});
  }
}

async function create (req, res, next) {
  let user = await User.findById(req.user)
  let supplierObj = {
    fullname:req.body.fullname,
    address:req.body.address,
    email:req.body.email,
    phone: req.body.phone,
    business_id:req.body.business_id,
    createdBy:user
  }
  await Supplier.create(supplierObj)
  res.redirect('/supplier')

  var mailOptions = {
    from: 'erol.terbiyeli@gmail.com',
    to: req.body.email,
    subject: "Form Info",
    text: `${req.body.fullname} were saved in ${req.user.name} supplier list`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

async function deleteSupplier(req, res) {
  let supplier = await Supplier.findByIdAndDelete(req.params.id)
  let expense = await Expense.deleteMany({supplier:{$in:[supplier._id]}})
  console.log(expense)
  res.redirect('/supplier')
}

async function editSupplier (req,res,next){
  let user = await User.findById(req.user._id)
  let supplier = await Supplier.findByIdAndUpdate(req.params.id)
  res.render('../views/supplier/supplierEdit.ejs',{title: 'Edit',user:user,supplier:supplier})
}

async function updateSupplier(req,res,next){
  let supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/supplier')
}
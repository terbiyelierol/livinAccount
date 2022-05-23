let User = require('../models/user');
let Supplier = require('../models/supplier');
let Expense = require('../models/expense');

module.exports = {
  show,
  addExpense,
  create,
  deleteExpense,
  editExpense,
  updateExpense,
}

async function show (req,res,next){
  let expenseSup = await Expense.find({createdBy:req.user.id}).populate('supplier')
  let user = await User.findById(req.user._id)
  let sum = 0
  for (let i=0;i<expenseSup.length;i++){
    sum+=expenseSup[i].amount
  }
  res.render('../views/expense/expense.ejs',{title:'Expenses',user:user,expenseSup:expenseSup,sum:sum})
}

async function addExpense (req,res,next){
  let supplier = await Supplier.find({createdBy:req.user.id})
  let expense = await Expense.find({createdBy:req.user.id})
  let user = await User.findById(req.user._id)
  res.render('../views/expense/expenseForm.ejs',{title:'Expenses',user:user,expense:expense,supplier:supplier})
}

async function create (req, res, next) {
  let user = await User.findById(req.user)
  let supplierId = await Supplier.findById(req.body.supplier)
  console.log(typeof req.body.rate)
  console.log(typeof req.body.amount)
  let expenseObj = {
    expense_date:req.body.expense_date,
    category:req.body.category,
    description: req.body.description,
    amount:req.body.amount,
    rate:req.body.rate,
    createdBy:user,
    supplier:supplierId,
    total:Number(req.body.amount)+(Number(req.body.amount)*Number(req.body.rate))
  }
  await Expense.create(expenseObj)
  res.redirect('/expense')
}


async function deleteExpense(req, res) {
  let expense = await Expense.findByIdAndDelete(req.params.id)
  res.redirect('/expense')
}

async function editExpense (req,res,next){
  let user = await User.findById(req.user._id)
  let supplier = await Supplier.find({createdBy:req.user.id})
  let expense = await Expense.findByIdAndUpdate(req.params.id).populate('supplier')
  res.render('../views/expense/expenseEdit.ejs',{title: 'Edit',user:user,expense:expense,supplier:supplier})
}

async function updateExpense(req,res,next){
  let expense = await Expense.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/expense')
}
let User = require('../models/user');
let Supplier = require('../models/supplier');
let Expense = require('../models/expense');
const unirest = require("unirest");
let quotes = {}
const req = unirest("GET", "https://quotes15.p.rapidapi.com/quotes/random/");

module.exports = {
  main,
  grabExpenseData,
  // grabSupplierData,
}

req.headers({
	"X-RapidAPI-Host": "quotes15.p.rapidapi.com",
	"X-RapidAPI-Key": "d9c5827051mshd9cd0d4f1e5b5efp1da83djsn815f5efb2ae8",
	"useQueryString": true
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);
  quotes = res.body
});

async function main(req, res,next) {
  let user = await User.findById(req.user._id)
  let expense = await Expense.find({createdBy:req.user.id}).select('category amount')
  let content = await quotes
  let name = await quotes.originator.name
  res.render('user.ejs', { title: 'Main Page' ,user:user,expense:expense,content:content,name:name});
}

async function grabExpenseData(req, res,next) {
  if(req.user){
    let expense = await Expense.find({createdBy:req.user.id})
    res.json(expense)
  };
}

// async function grabSupplierData(req, res,next) {
//   if(req.user){
//     let supplier = await Expense.find({createdBy:req.user.id}).populate('suuplier')
//     res.json(supplier)
//   };
// }

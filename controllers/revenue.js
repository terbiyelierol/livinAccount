let User = require('../models/user');
let Customer = require('../models/customer');
let Revenue = require('../models/revenue');

module.exports = {
  show,
  addRevenue,
  create,
  deleteRevenue,
  editRevenue,
  updateRevenue,
}

async function show (req,res,next){
  let revenueCus = await Revenue.find({createdBy:req.user.id}).populate('customer')
  let user = await User.findById(req.user._id)
  let sum = 0
  for (let i=0;i<revenueCus.length;i++){
    sum+=revenueCus[i].amount
  }
  res.render('../views/revenue/revenue.ejs',{title:'Revenue',user:user,revenueCus:revenueCus,sum:sum})
}

async function addRevenue (req,res,next){
  let customer = await Customer.find({createdBy:req.user.id})
  let revenue = await Revenue.find({createdBy:req.user.id})
  let user = await User.findById(req.user._id)
  res.render('../views/revenue/revenueForm.ejs',{title:'Revenues',user:user,revenue:revenue,customer:customer})
}

async function create (req, res, next) {
  let user = await User.findById(req.user)
  let customerId = await Customer.findById(req.body.customer)
  console.log(typeof req.body.rate)
  console.log(typeof req.body.amount)
  let revenueObj = {
    revenue_date:req.body.revenue_date,
    category:req.body.category,
    description: req.body.description,
    amount:req.body.amount,
    rate:req.body.rate,
    createdBy:user,
    customer:customerId,
    total:Number(req.body.amount)+(Number(req.body.amount)*Number(req.body.rate))
  }
  await Revenue.create(revenueObj)
  res.redirect('/revenue')
}


async function deleteRevenue(req, res) {
  let revenue = await Revenue.findByIdAndDelete(req.params.id)
  res.redirect('/revenue')
}

async function editRevenue (req,res,next){
  let user = await User.findById(req.user._id)
  let customer = await Customer.find({createdBy:req.user.id})
  let revenue = await Revenue.findByIdAndUpdate(req.params.id).populate('customer')
  res.render('../views/revenue/revenueEdit.ejs',{title: 'Edit',user:user,revenue:revenue,customer:customer})
}

async function updateRevenue(req,res,next){
  let revenue = await Revenue.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/revenue')
}
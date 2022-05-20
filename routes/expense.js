var express = require('express');
var router = express.Router();

let expenseCtrl = require('../controllers/expense.js')

router.get('/expense', expenseCtrl.show);

router.get('/expense/add', expenseCtrl.addExpense);

router.post('/expense', expenseCtrl.create);

router.delete('/expense/:id', expenseCtrl.deleteExpense);

router.get('/expense/:id/edit', expenseCtrl.editExpense);

router.put('/expense/:id', expenseCtrl.updateExpense);

module.exports = router;
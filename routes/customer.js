var express = require('express');
var router = express.Router();

let customerCtrl = require('../controllers/customer.js')

router.get('/customer', customerCtrl.customer);

router.get('/customer/add', customerCtrl.newCustomer);

router.post('/customer', customerCtrl.create);

router.delete('/customer/:id', customerCtrl.deleteCustomer);

router.get('/customer/:id/edit', customerCtrl.editCustomer);

router.put('/customer/:id', customerCtrl.updateCustomer);

module.exports = router;
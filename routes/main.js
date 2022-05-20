var express = require('express');
var router = express.Router();

let mainCtrl = require('../controllers/main')

/* GET home page. */
router.get('/main', mainCtrl.main);

router.get('/grabExpenseData', mainCtrl.grabExpenseData);


// router.get('/grabSupplierData', mainCtrl.grabSupplierData);

module.exports = router;
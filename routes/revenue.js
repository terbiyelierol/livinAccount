var express = require('express');
var router = express.Router();

let revenueCtrl = require('../controllers/revenue.js')

router.get('/revenue', revenueCtrl.show);

router.get('/revenue/add', revenueCtrl.addRevenue);

router.post('/revenue', revenueCtrl.create);

router.delete('/revenue/:id', revenueCtrl.deleteRevenue);

router.get('/revenue/:id/edit', revenueCtrl.editRevenue);

router.put('/revenue/:id', revenueCtrl.updateRevenue);

module.exports = router;
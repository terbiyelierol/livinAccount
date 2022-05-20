var express = require('express');
var router = express.Router();

let supplierCtrl = require('../controllers/supplier.js')

router.get('/supplier', supplierCtrl.supplier);

router.get('/supplier/add', supplierCtrl.newSupplier);

router.post('/supplier', supplierCtrl.create);

router.delete('/supplier/:id', supplierCtrl.deleteSupplier);

router.get('/supplier/:id/edit', supplierCtrl.editSupplier);

router.put('/supplier/:id', supplierCtrl.updateSupplier);

module.exports = router;
var express = require('express');
var router = express.Router();
var path = require('path');
var empController = require('../controllers/employee')();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/getAllEmpList', empController.getAllEmpList);
router.post('/createEmployee', empController.createEmp);
router.post('/getEmp', empController.getEmp);
router.delete('/deleteEmp', empController.deleteEmp);
router.put('/updateEmp', empController.updateEmp);
  

module.exports = router;
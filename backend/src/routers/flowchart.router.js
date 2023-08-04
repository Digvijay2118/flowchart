const express = require('express');
const router = express.Router();
const flowchart = require('../controllers/flowchart.controller');


router.get('/',flowchart.getAllDATA)
router.post('/insert',flowchart.insertFlowchartData)

module.exports = router;
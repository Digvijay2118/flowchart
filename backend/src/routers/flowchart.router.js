const express = require('express');
const router = express.Router();
const flowchart = require('../controllers/flowchart.controller');


router.get('/',flowchart.getAllDATA)

module.exports = router;
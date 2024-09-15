const express = require('express');
const { testController } = require('../controller/testController');

const router = express.Router();

router.route('/test-route').get(testController)


module.exports = router;
const express = require('express');
const router = express.Router();
const Schoolcontrol = require('../control/Schoolcontrol');

router.get('/', Schoolcontrol.getPaginatedSchools);

module.exports = router
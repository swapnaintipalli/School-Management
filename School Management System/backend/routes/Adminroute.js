const express = require('express');
const router = express.Router();
const Schoolcontrol = require('../control/Schoolcontrol');

router.post('/new', Schoolcontrol.createSchool);
router.put('/:id', Schoolcontrol.updateSchool);
router.delete('/:id', Schoolcontrol.deleteSchool);

module.exports = router;
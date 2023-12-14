const express = require('express');
const router = express.Router();


router.use('/posts', require('./post'));
router.use('/', require ('./auth'));

module.exports = router;

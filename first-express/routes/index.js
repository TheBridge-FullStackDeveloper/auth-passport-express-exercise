const express = require('express');
const router = express.Router();

const foodRoutes = require('./food');
const drinkRoutes = require('./drink');
const orderRoutes = require('./order');

router.use('/food', foodRoutes);
router.use('/drink', drinkRoutes);
router.use('/order', orderRoutes);
router.use('/auth', require('./auth'));

module.exports = router;

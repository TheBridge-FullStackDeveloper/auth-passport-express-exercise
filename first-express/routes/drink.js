const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('all drink');
})

router.post('/', (req, res) => {
  res.send('all drink');
})

router.put('/', (req, res) => {
  res.send('all drink');
})
router.delete('/', (req, res) => {
  res.send('all drink');
})

module.exports = router;

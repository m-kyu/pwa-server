
const testRouter2 = require('express').Router();


testRouter2.get('/', async function (req, res) {
  res.send('hello test2');
})


module.exports = testRouter2;



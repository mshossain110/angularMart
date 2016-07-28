var express = require('express');
var router = express.Router();
var blogs = require('./blogs')
var productCtrl= require('../controllers/product.controller');
var blogCtrl= require('../controllers/blog.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({massage: "welcome to NodeMart API"})
});
router.get('/product', productCtrl.getProducts);
router.post('/product', productCtrl.addProduct);
router.put('/product', productCtrl.getProducts);
router.delete('/product', productCtrl.getProducts);
router.use('/blog', blogs)

module.exports = router;

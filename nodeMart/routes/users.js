var express = require('express');
var router = express.Router();
var userController= require('../controllers/userController');
/* GET users listing. */
router.get('/', userController.getUsers);

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;

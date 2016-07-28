var express = require('express');
var router = express.Router();
var blogCtrl= require('../controllers/blog.controller');
router.get("/", blogCtrl.getBlogs);
router.post("/", blogCtrl.createBlog);
router.param("id", blogCtrl.param);
router.get("/:id", blogCtrl.getSingleBlog);
router.get("/:id/comment", blogCtrl.getComments);
router.post("/:id/comment", blogCtrl.createComments);

module.exports = router;

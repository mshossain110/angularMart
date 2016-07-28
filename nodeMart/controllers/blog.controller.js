var Blog=require('../models/models.blogs');
var Comment=require('../models/models.comments');

module.exports=(function(){
  'use strict';
  return{
    getBlogs:getBlogs,
    createBlog:createBlog,
    param:param,
    getSingleBlog:getSingleBlog,
    getComments:getComments,
    createComments:createComments
  }

  function getBlogs(req, res, next){
    Blog.find({}).populate('comments').populate('author').exec(function(error, blogs){
      if(error) res.json({error: error});

      res.json(blogs);
    });
  }
  function createBlog(req, res, next){
    var blog= {
      title: req.body.title,
      categories: req.body.categories.split(','),
      featureImage: req.body.featureImage,
      description:req.body.description,
      like:req.body.like,
      dislike:req.body.dislike,
      metaTag:req.body.metaTag.split(','),
      userRole:req.body.userRole,
      author:req.body.author,
    }
    var blog = new Blog(blog);
    blog.save(function(error){
      if(error){
        res.json({Error: error});
      }

      res.json({message:"Blog Created", data:blog});
    })
  };

  function param(req, res, next, id){
    req.id=id;
    next()
  }
  function getSingleBlog(req, res, next){
    Blog.findById(req.id, function(error, blog){
      if(error) res.json({error:error})
      res.json(blog)
    })

  }
  function getComments(req, res, next){

  }
  function createComments(req, res, next){
    var comment = new Comment(req.body);

    comment.save(function(error){
      if(error) res.json({error:error});

      Blog.findById(req.id, function(error, blog){
        if(error) res.json({error:error});
        blog.comments.push(comment);
        blog.save(function(error){
            if(error) res.json({error:error});

              res.json({message:"comment created"});
        })


      })

    })
  }


}())

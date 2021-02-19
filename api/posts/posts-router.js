const express = require('express');
const posts = require("./posts-model")

const router = express.Router();

router.get("/", (req, res) => {
  // DO YOUR MAGIC
    posts.get()
    .then((post)=> {
       res.json(post)
    })
    .catch((err)=> {
      console.log(err)
      res.status(500).json({
        message: "Something went wrong"
      })
    })
});

router.get('/api/posts/:id', (req, res) => {
  // DO YOUR MAGIC
  posts.getById(req.params.id)
   .then((post)=> {
     if (post){
      res.json(post)
     } else {
       res.status(400).json({
        message: "missing post data"
       })
     }
     
   })
   .catch((err)=> {
      console.log(err)
      res.status(500).json({
        message: "Something went wrong"
      })
   })
});

// do not forget to export the router
module.exports = router

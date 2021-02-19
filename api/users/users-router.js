const express = require('express');
const users = require("./users-model")
const { validateUserId, validateUser } = require("../middleware/middleware")

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
      users.get()
      .then((user)=> {
         res.json(user)
      })
      .catch((err)=>{
        console.log(err)
        res.status(500).json({
          message: "Something went wrong"
        })
      })
});

router.get('/api/users/:id', validateUserId(), (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id

  //user gets attached to the request in checkUserID
	res.json(req.user)
});

router.post("/api/users", validateUser(), (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
   users.insert(req.body)
   .then((user)=> {
      res.status(201).json(user)
   })
   .catch((err)=> {
     console.log(err)
     res.status(500).json({
       message: "Something went wrong"
     })
   })
});

router.put('/api/users/:id', validateUser(), validateUserId(), (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
   users.update(req.params.id, req.body)
    .then((user)=> {
      if (user){
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "user could not be found"
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "Something went wrong"
      })
    })
});

router.delete('/api/users/:id', validateUserId(), (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
    users.remove(req.params.id)
    .then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
    .catch((err) => {
			console.log(err)
			res.status(500).json({
				message: "something went wrong",
			})
    })
});

router.get('/api/users/:id/posts', validateUserId(), (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
   users.getUserPosts(req.params.id)
   .then((user) => {
      if (user){
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "user not found"
        })
      }
   })
   .catch(()=> {
     console.log(err)
     res.status(500).json({
       message: "something went wrong"
     })
   })
});

router.post('/api/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
//   if (!req.body.text) {
//     return  res.status(500).json({
//          message: "Please provide text in the body" 
//     })
// }
//     users.addUserPost(req.params.id, req.body)
//     .then((user)=> {
//       if (user){
//           res.status(200).json(user)
//       } else {
//           res.status(404).json({
//               message: "The user with the specified ID does not exist"
//           })
//       }
       
//     })
//     .catch(()=> {
//       console.log(err)
//       res.status(500).json({
//         message: "something went wrong"
//       })
//     })
      
    
});

// do not forget to export the router
module.exports = router
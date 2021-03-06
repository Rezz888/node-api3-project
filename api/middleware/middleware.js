const users = require("../users/users-model") 


function logger (req, res, next) {
  // DO YOUR MAGIC
   const time = new Date().toISOString()
    console.log(`[${time}] ${req.method} ${req.url}`)
    next()
}

function validateUserId() {

  return (req, res, next) => {
      users.getById(req.params.id)
  .then((user) => {
    if (user) {
      // res.status(200).json(user)
               req.user = user //make user available to later middleware functions
              next()
    } else {
      res.status(404).json({
        message: "User not found",
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Error retrieving the user",
    })
  })
  }
}

function validateUser() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    if (!req.body.name ) {
		return res.status(400).json({
			message: "missing user data",
		})
	}
    next()
   }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
   logger, 
   validateUserId,
   validateUser,
}

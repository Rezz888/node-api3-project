const express = require("express")
const server = express();
const usersRouter = require("./users/users-router")
const postsRouter = require("./posts/posts-router")
const { logger } = require("./middleware/middleware")

// remember express by default cannot parse JSON in request bodies
server.use(express.json())


// global middlewares and routes need to be connected here
server.use(logger)
server.use(postsRouter)
server.use(usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server
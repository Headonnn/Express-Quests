require('dotenv').config();
const express = require("express");
const user = process.env.DB_USER
const app = express();
app.use(express.json());
const { body, validationResult } = require('express-validator');

const validateMovies = [
  
  body("title").isLength({ max: 255 }),
  body("director").isLength({ max: 255 }),
  body("year").isLength({ max: 255 }),
  body("color").isLength({ max: 255 }),
  
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];
const validateUsers = [
  body("email").isEmail(),
  body("firstname").isLength({ max: 255 }),
  body("lastname").isLength({ max: 255 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];
const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandler= require("./userHandler")

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandler.getUser);
app.get("/api/users/:id", userHandler.getUserById);
app.post("/api/movies", validateMovies,movieHandlers.postMovie);
app.post("/api/users", validateUsers,userHandler.postUser);
app.put("/api/movies/:id",validateMovies, movieHandlers.updateMovie);
app.put("/api/users/:id",validateUsers, userHandler.updateUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie)
app.delete("/api/users/:id", userHandler.deleteUser);
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

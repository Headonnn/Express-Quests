require('dotenv').config();
const express = require("express");
const user = process.env.DB_USER
const app = express();
app.use(express.json());

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
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", userHandler.postUser);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", userHandler.updateUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie)
app.delete("/api/users/:id", userHandler.deleteUser);
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

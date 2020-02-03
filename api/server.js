const express = require("express");

const server = express();

const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");
const songsRouter = require("../songs/songs-router")

server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use("/api/songs", songsRouter)

server.get("/", (req, res) => {
  res.send('<h2>Its Working!!!</h2>');
});

module.exports = server;

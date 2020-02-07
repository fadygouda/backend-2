const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const server = express();

const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");
const songsRouter = require("../songs/songs-router")
const suggestedRouter = require("../suggested/suggested-router")

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use("/api/songs", songsRouter);
server.use("/api/suggested", suggestedRouter)

server.get("/", (req, res) => {
  res.send({ Greeting: 'Greetings from Port 5500!!!' });
});

module.exports = server;

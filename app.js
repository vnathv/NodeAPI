const express = require("express")
const db = require("./db")
const UserController = require("./Controllers/UserController");
const AuthController = require("./Auth/AuthController")

const app = express();
app.use('/user',UserController)
app.use('/auth',AuthController)

module.exports = app;
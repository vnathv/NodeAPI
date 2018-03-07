const express = require("express")
const db = require("./db")
const UserController = require("./Controllers/UserController")

const app = express();
app.use('/user',UserController)

module.exports = app;
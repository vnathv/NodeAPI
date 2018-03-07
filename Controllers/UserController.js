const User = require("./../Model/User")
const Router = require("express").Router();
const bodyParser = require("body-parser");

Router.use(bodyParser.json())

Router.get('/', (request, response) => {
    console.log("Get called")
    User.find({})
        .then(user => response.send(user))
        .catch(err => response.sendStatus(500).send(err));

});


Router.post('/', (request, response) => {

    User.create({
        Name: request.body.Name,
        Email: request.body.Email,
        Password: request.body.Password
    })
        .then(res => response.send(res))
        .catch(err => response.send(err))
});

module.exports = Router;
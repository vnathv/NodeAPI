const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = require("express").Router();
const user = require("../Model/User")
const config = require("../config")
const bodyparser = require("body-parser")

router.use(bodyparser.json());

router.post('/register', (request,response) =>{

    const hashedPassword = bcrypt.hashSync(request.body.Password,8);

    user.create({
        Name : request.body.Name,
        Email : request.body.Email,
        Password : hashedPassword
    })
    .then(user =>{

     const token =  jwt.sign({id: user._id},config.Secret,{
            expiresIn : 86400
        });


        response.status(200).send({auth:true, token : token})

    })
    .catch(err => response.status(500).send("error happened"))

});

module.exports = router;


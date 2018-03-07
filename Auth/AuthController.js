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


router.get('/verify', (request,response) =>{

    var token = request.headers["x-access-token"]

    if(!token)
    return response.status(403).send({auth : false, message : "No token provided"});

    jwt.verify(token,config.Secret, (err,decoded) =>{
        if(err)
        return response.status(500).send({auth : false, message : "Failed to authenticate token"})

        user.findById(decoded.id,{Password : 0})
        .then(user => response.status(200).send(user))

    });


});

module.exports = router;


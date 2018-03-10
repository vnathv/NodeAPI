const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = require("express").Router();
const user = require("../Model/User")
const config = require("../config")
const bodyparser = require("body-parser")

router.use(bodyParser.json());

router.post('/register', (req, resp) => {

    const { name, email, password } = req.body;

    const encodedPassword = bcrypt.hashSync(password, 8);

    user.create({
        name,
        email,
        encodedPassword
    })
    .then(user =>{

        const token = jwt.sign({id : user._id},config.Secret,{
            expiresIn : 86400
        });

        resp.status(200).send({auth : true, token : token})
    })


});


module.exports = router;



const jwt = require("jsonwebtoken")
const config = require("../config")

verifyToken = (req, resp, next) => {

    const token = req.headers['x-access-token'];

    if (!token)
        return resp.status(403).send({ auth: false, message: "No Token Provided" });

    jwt.verify(token, config.Secret,(err,decoded) =>{
        if(err){
          return  resp.status(500).send({auth:false, message : "Failed to authenticate token"})
        }

        req.userId = decoded.id;
        next();
    })
        

};

module.exports = verifyToken;


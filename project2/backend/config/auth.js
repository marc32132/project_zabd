require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = { authenticateToken: function(req, res, next){
    const token = req.cookies.jwt;
    if(token == null){ return console.log("token : ", token), res.sendStatus(401)}
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) {return console.log("user: ", user), res.sendStatus(403)}
        req.user = user;
        next();
    })
    }
}
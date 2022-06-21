const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
let User = require('../models/usermodel');

require('dotenv').config();


router.route('/').get((req, res) => {
    User.find().then(user => res.json(user)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findOne').get((req, res) => {
    const login = req.body.login;
    User.findOne({login: login}).then(user => res.json(user)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const login = req.body.login;
    const password = hash;
    const mail = req.body.mail;
    const position = req.body.position;
        const newUser = new User({login, password, mail, position});
        
        newUser.save().then(() => res.redirect('/')).catch(err => res.status(400).json('Error: ' + err));   
     });
    
});

router.route('/logout').get((req, res) =>{
    res.cookie('jwt','', {maxAge: 1});
    res.redirect('/');
})

router.route('/login').post((req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const position = req.body.position;
    
    User.findOne({login: login}).then((foundUser) =>{
        if(foundUser){
                bcrypt.compare(password, foundUser.password).then( function(result){
                   
                    if(result === true){
                        if(foundUser.position == 'admin'){
                        

                        const user = {name: login, position: foundUser.position}

                        const accessToken = generateAccessToken(user);
                        res.cookie('jwt', accessToken, {maxAge: 1000*60*10});
                        res.redirect('../admin-page-students.html');
                        }
                        else if(foundUser.position == position && position == 'Teacher'){
                        
                        const user = {name: login, position: foundUser.position}

                        const accessToken = generateAccessToken(user);
                        
                        res.cookie('jwt', accessToken, {maxAge: 1000*60*10});
                        res.redirect('../teacher-page.html');
                        }
                        else if(foundUser.position == position && position == 'Student'){
                        const user = {name: login, position: foundUser.position}

                        const accessToken = generateAccessToken(user);
                        res.cookie('jwt', accessToken, {maxAge: 1000*60*10});
                        res.redirect('../student-page.html');
                        }
                        else{
                            res.send("wrong position")
                        }
                    } 
                    else{
                        res.send("wrong password");
                    }
                });
            }
            else{
                res.send("wrong username");
            }
        }).catch(err => res.status(400).json('Error: ' + err));
    
});

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

router.route('/updateUser').post((req, res) =>{
    const userName = req.body.login;
    const password = req.body.password;
    const password2 = req.body.password2;
    const position = req.body.position;
    if(password==password2){
    User.findOne({login: userName, position: position}).then((foundUser) =>{
        if(foundUser){
            bcrypt.hash(password, saltRounds, function(err, hash){
            User.findOneAndUpdate({login: userName, position: position}, {password: hash}, 
                function(err, passw){
                    if(!err){
                        console.log("password changed for user: ", userName);
                        res.redirect('back');
                    } else {
                        res.send(err);
                    }
                });});
        } else{
            res.send("wrong username");
        }
    }).catch(err => res.status(400).json('Error: ' + err));
}else {
    res.send("passwords don't match");
};
});
 


module.exports = router;
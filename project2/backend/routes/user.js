const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
let Employee = require('../models/employee-model');
let Student = require('../models/student-model');

require('dotenv').config();


router.route('/Employee').get((req, res) => {
    Employee.find().then(employee => res.json(employee)).catch(err => res.status(400).json('Error: ' + err));
});
router.route('/Student').get((req, res) => {
    Student.find().then(employee => res.json(employee)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findOneEmployee').get((req, res) => {
    const login = req.body.login;
    Employee.findOne({login: login}).then(employee => res.json(employee)).catch(err => res.status(400).json('Error: ' + err));
});
router.route('/findOneStudent').get((req, res) => {
    const login = req.body.login;
    Student.findOne({login: login}).then(employee => res.json(employee)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    const position = req.body.position;
    if(position == 'Employee'){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const login = req.body.login;
    const password = hash;
    const mail = req.body.mail;
    const name = req.body.name;
    const surname = req.body.surname;
        const newEmployee = new Employee({login, password, mail, position, name, surname});
        
        newEmployee.save().then(() => res.redirect('/')).catch(err => res.status(400).json('Error: ' + err));   
     });
    } else if(position == 'Student') {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const login = req.body.login;
            const password = hash;
            const mail = req.body.mail;
            const name = req.body.name;
            const surname = req.body.surname;
            const year = req.body.year;
                const newStudent = new Student({login, password, mail, position, name, surname, year});
                
                newStudent.save().then(() => res.redirect('/')).catch(err => res.status(400).json('Error: ' + err));   
             });
    }

});

router.route('/logout').get((req, res) =>{
    res.cookie('jwt','', {maxAge: 1});
    res.redirect('/');
})

router.route('/login').post((req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const position = req.body.position;
    if(position == 'Employee'){
        Employee.findOne({login: login}).then((foundUser) =>{
            if(foundUser){
                    bcrypt.compare(password, foundUser.password).then( function(result){
                    
                        if(result === true){
                            if(foundUser.position == 'admin'){
                            

                            const user = {userName: login, position: foundUser.position}

                            const accessToken = generateAccessToken(user);
                            res.cookie('jwt', accessToken, {maxAge: 1000*60*20});
                            res.redirect('../admin-page-students.html');
                            }
                            else if(foundUser.position == position && position == 'Employee'){
                            
                            const user = {userName: login, position: foundUser.position, name: foundUser.name, surname: foundUser.surname, _id:foundUser._id}

                            const accessToken = generateAccessToken(user);
                            
                            res.cookie('jwt', accessToken, {maxAge: 1000*60*20});
                            res.redirect('/teacher-page.html');
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
    } else if(position == 'Student') {
        Student.findOne({login: login}).then((foundUser) =>{
            if(foundUser){
                    bcrypt.compare(password, foundUser.password).then( function(result){
                    
                        if(result === true){
                            if(foundUser.position == position && position == 'Student'){
                            const user = {userName: login, position: foundUser.position, name: foundUser.name, surname: foundUser.surname, _id:foundUser._id}

                            const accessToken = generateAccessToken(user);
                            res.cookie('jwt', accessToken, {maxAge: 1000*60*20});
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
        }   
});

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
}

router.route('/updateUser').post((req, res) =>{
    const userName = req.body.login;
    const password = req.body.password;
    const password2 = req.body.password2;
    const position = req.body.position;
    if(position == 'Employee'){
        if(password==password2){
            Employee.findOne({login: userName, position: position}).then((foundUser) =>{
            if(foundUser){
                bcrypt.hash(password, saltRounds, function(err, hash){
                    Employee.findOneAndUpdate({login: userName, position: position}, {password: hash}, 
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
    } else if(position == 'Student') {
        if(password==password2){
            Student.findOne({login: userName, position: position}).then((foundUser) =>{
            if(foundUser){
                bcrypt.hash(password, saltRounds, function(err, hash){
                    Student.findOneAndUpdate({login: userName, position: position}, {password: hash}, 
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
    }
});
 


module.exports = router;
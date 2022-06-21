const manage = require('express').Router();

let student = require('../models/student-model');
let employee = require('../models/employee-model')

manage.route("/allstudents")
.get(function(req, res){
  student.find(function(err, foundStudents){
    if (!err) {

        res.json(foundStudents);
    } else {
      res.send(err);
    }

  });
});
manage.route("/allemployees")
.get(function(req, res){
  employee.find(function(err, foundEmployees){
    if (!err) {

        res.json(foundEmployees);
    } else {
      res.send(err);
    }

  });
});

manage.route("/allstudentsDel")
.post(function(req, res){
  const login = req.body.login;
    student.findOneAndDelete(
      {login: login},
      function(err, user){
        if (!err){
          console.log("deleted student: ", user);
          res.redirect('back');
        } else {
          res.send(err);
        }
      }
    );
});
manage.route("/allemployeesDel")
.post(function(req, res){
  const login = req.body.login;
    employee.findOneAndDelete(
      {login: login},
      function(err, user){
        if (!err){
          console.log("deleted employee: ", user);
          res.redirect('back');
        } else {
          res.send(err);
        }
      }
    );
});

  // manage.route("/studentPosition")
  // .post(function(req,res){
  //   const login = req.body.login;
  //   const position = req.body.position;
  //   student.findOneAndUpdate({login: login}, {position: position}, function(err, posit){
  //     if(!err){
  //         console.log("position changed for: ", login, ", from: ", position, " to: ", posit);
  //         res.redirect('back');
  //     } else {
  //         res.send(err);
  //     }
  // });
  // });
  // manage.route("/employeePosition")
  // .post(function(req,res){
  //   const login = req.body.login;
  //   const position = req.body.position;
  //   employee.findOneAndUpdate({login: login}, {position: position}, function(err, posit){
  //     if(!err){
  //         console.log("position changed for: ", login, ", from: ", position, " to: ", posit);
  //         res.redirect('back');
  //     } else {
  //         res.send(err);
  //     }
  // });
  // });

module.exports = manage;
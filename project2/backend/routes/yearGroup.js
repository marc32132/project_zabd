const yearGroups = require('express').Router();

let years = require('../models/yearGroup-model');

yearGroups.route("/allyears")
.get(function(req, res){
  years.find(function(err, foundYears){
    if (!err) {
        res.json(foundYears);
    } else {
      res.send(err);
    }
  });
});

yearGroups.route("/allyearsDel")
.post(function(req, res){
  const groupName = req.body.groupName;
  const year = req.body.year;
  years.findOneAndDelete(
      {groupName: groupName, year: year},
      function(err, classes){
        if (!err){
          console.log("deleted year: ", classes);
          res.redirect('back');
        } else {
          res.send(err);
        }
      }
    );
});
yearGroups.route('/createYear').post((req, res) => {
    
    
    const groupName = req.body.groupName;
    const year = req.body.year;
    const students = req.body.students;
        const newYear = new years({groupName, students, year});
        
        newYear.save().then(() => res.redirect('back')).catch(err => res.status(400).json('Error: ' + err));   
});
yearGroups.route('/updateYear').post((req, res) =>{
  const groupName = req.body.groupName;
  const year = req.body.year;
  const students = req.body.students;
    years.findOneAndUpdate({groupName: groupName, year: year}, {$push:{students: students}}, 
        function(err, student){
            if(!err){
                console.log("added participant: ", student);
                res.redirect('back');
            } else {
                res.send(err);
            }
        });
});

yearGroups.route('/removeStudent').post((req,res) =>{
  const groupName = req.body.groupName;
  const year = req.body.year;
  const student = req.body.student;
  years.findOneAndUpdate({groupName: groupName, year: year}, { $pull:{students: student}} ,function(err, removedstudent){
    if(!err){
      console.log("removed participant: ", student);
      res.redirect('back');  
    } else {
      res.send(err);
    }

  })
})



module.exports = yearGroups;
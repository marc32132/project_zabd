const classesOp = require('express').Router();

let classes = require('../models/class-model');

classesOp.route("/allclasses")
.get(function(req, res){
  classes.find(function(err, foundClasses){
    if (!err) {
        res.json(foundClasses);
    } else {
      res.send(err);
    }
  });
});

classesOp.route("/allclassesDel")
.post(function(req, res){
  const className = req.body.className;
  const groupNumber = req.body.groupNumber;
    classes.findOneAndDelete(
      {className: className, groupNumber: groupNumber},
      function(err, classes){
        if (!err){
          console.log("deleted class: ", classes);
          res.redirect('back');
        } else {
          res.send(err);
        }
      }
    );
  });
classesOp.route('/createClass').post((req, res) => {
    
    
    const className = req.body.className;
    const groupNumber = req.body.groupNumber;
    const maxParticip = req.body.maxParticip;
    const participants = req.body.participants;
    const teacher = req.body.teacher;
        const newClass = new classes({className, groupNumber, maxParticip, participants, teacher});
        
        newClass.save().then(() => res.redirect('back')).catch(err => res.status(400).json('Error: ' + err));   
});
classesOp.route('/updateClass').post((req, res) =>{
    const className = req.body.className;
    const groupNumber = req.body.groupNumber;
    const participants = req.body.participants;
    classes.findOne({className: className, groupNumber: groupNumber}).then((foundClass)=>{
      if(foundClass){
          if(foundClass.participants.length < foundClass.maxParticip){
            classes.findOneAndUpdate({className: className, groupNumber: groupNumber}, {$push:{participants: participants,}}, 
                function(err, particip){
                    if(!err){
                        console.log("added participant: ", participants);
                        res.redirect('back');
                    } else {
                        res.send(err);
                    }
                });
            } else {
              res.send("Class reached limit of participants")
            }
        }
        }).catch(err => res.status(400).json('Error: ' + err));
});

classesOp.route('/removeParticipant').post((req,res) =>{
  const className = req.body.className;
  const groupNumber = req.body.groupNumber;
  const student = req.body.student;
  classes.findOneAndUpdate({className: className, groupNumber: groupNumber}, { $pull:{participants: student}} ,function(err, removedpart){
    if(!err){
      console.log("removed participant: ", student);
      res.redirect('back');  
    } else {
      res.send(err);
    }

  })
})



module.exports = classesOp;
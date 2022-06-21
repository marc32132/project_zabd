const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        unique : true,
        dropDups: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    mail: {
        type: String,
        required: true,
        unique : true,
        dropDups: true,
    },
    position: {
        type: String,
        enum: ['Student', 'Employee','admin'],
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
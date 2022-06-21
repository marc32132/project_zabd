const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique : true,
        dropDups: true,
        trim: true,
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
        enum: ['Student', 'Employee'],
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    year:{
        type: Number, min: 1995, max:2022
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
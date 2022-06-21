const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
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
    },
    position: {
        type: String,
        enum: ['Student', 'Teacher'],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
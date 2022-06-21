const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const yearGroupSchema = new Schema({
    groupName: {
        type: String,
        required: true,
        trim: true,
    },
    students: [String],
    year: {
        type: Number, min: 2000, max:2022,
        required: true,
    },    
});

const YearGroup = mongoose.model('YearGroup', yearGroupSchema);

module.exports = YearGroup;
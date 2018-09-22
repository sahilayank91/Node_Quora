var mongoose = require('mongoose');
var BRANCH = require(__BASE__ + "config/enums").branch;
var TYPE = require(__BASE__ + "config/enums").faculty_type;

var FacultySchema = new mongoose.Schema({
    _id: String,
    email: String,
    phone: String,
    post: {
        type: String
        // enum: [ROLES.ORGANISATION, ROLES.ADMINISTRATOR, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT]
    },
    secondary_email: String, // institite's email address for password resets
    secondary_phone: String, // parent's mobile number in case of students
    // TODO: make different default profile pics for different roles

    profilePic:{type:String,required:true},

    firstname: {type: String, required: true}, //change the keys whenever firstname changes
    lastname: {type: String}, //change the keys whenever lastname changes
    // for name prefix matching
    keys: [String],
    faculty_type:{type:String,enum:[TYPE.CONTRACT,TYPE.VISITING], required:true},
    publication:{type:String},
    achievement:{type:String},
    responsibility:{type:String},
    // flag for activation
    activated: {type: Boolean, default: false},
    created_at: {type: Date, default: new Date()},
    address: String,
    gender: String,
    about: String,
    education:String,
    branch :{type:String,enum: [BRANCH.CSE,BRANCH.ECE,BRANCH.ME]},
    job_title: String, // can write hindi Teacher or something like that -- too many to put in enum
}, {
    minimize: false
});


module.exports = mongoose.model('Faculty', FacultySchema);

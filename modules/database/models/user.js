var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var ROLES = ENUMS.roles;
var BRANCH = ENUMS.branch;
var CATEGORY = ENUMS.category;
var GENDER = ENUMS.gender;
var YEAR = ENUMS.year;
var UserSchema = new mongoose.Schema({
    _id: String,

	studentid:{type:String},
    // username: {type: String, index: true},
	firstname: {type: String, required: true}, //change the keys whenever firstname changes
	middlename:{type:String},
	lastname: {type: String}, //change the keys whenever lastname changes
	name:{type:String},
	branch:{
		type:String,

		enum:[BRANCH.CSE,BRANCH.ECE]
	},

	category:{type:String,enum:[CATEGORY.GENERAL,CATEGORY.OBC,CATEGORY.SC,CATEGORY.ST]},
	year:{type:String,enum:[YEAR.FIRST,YEAR.SECOND,YEAR.THIRD,YEAR.FOURTH]},

	phone: String,
	email: {type:String,unique:true},
	dob:{type:Date},
    password: {type: String, required: false},
	gender: {
		type:String,

		enum:[GENDER.MALE,GENDER.FEMALE,GENDER.OTHER]
	},
    expertise:{type:String},

  fathername:{type:String},
  mothername:{type:String},
  father_mobileno:{type:String},
  mother_mobileno:{type:String},
  parent_email:{type:String},
  permanent_address:{type:String},
  hosteller:{type:String},
  local_address:{type:String},
	guardian_name:{type:String},
	guardian_phone:{type:String},
	guardian_address:{type:String},
	guardian_email:{type:String},

    secondary_email: String, // institite's email address for password resets
    secondary_phone: String, // parent's mobile number in case of students
    // TODO: make different default profile pics for different roles
    profilePic: {type:String},

    interest:[{type:String,enum:['Technology','Science','Civics','Politics','Education','Websites','Android']}],
  // for name prefix matching
    keys: [String],
    // flag for activation
    activated: {type: Boolean, default: false},
    created_at: {type: Date, default: new Date()},
    created_by: {type: String, ref: 'User'},

    occupation:{type:String},
    address: String,

    about: String,

    follower:[{type:String,ref:'User'}],
    following:[{type:String,ref:'User'}],
    friends:{type:Number,default:0},
    savedPost:[{type:String,ref:'Post'}]


}, {
    minimize: false
});


module.exports = mongoose.model('User', UserSchema);

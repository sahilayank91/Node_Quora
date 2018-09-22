var mongoose = require('mongoose');
var ENUMS = require(__BASE__+"config/enums");
var ROLES = ENUMS.roles;
var FREQ = ENUMS.frequency;
var CATEG = ENUMS.category;

var feedbackQuestionsSchema = new mongoose.Schema({

    type: {type: String, enum: [CATEG.CUSTOM, CATEG.EXAM, CATEG.SUBJECT, CATEG.MISC]},

    name: {type: String},

    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],

    frequency: {type: String, enum: [FREQ.MONTHLY, FREQ.WEEKLY]},

    priority: {type: Number},

    noOfIterations: {type: Number},

    allow: [{type: String, enum: [ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT,ROLES.ADMINISTRATOR]}]

});

module.exports = mongoose.model('FeedbackCategories',feedbackQuestionsSchema);



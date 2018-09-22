var mongoose = require('mongoose');
var ENUMS = require(__BASE__+"config/enums");
var ROLES = ENUMS.roles;
var FREQ = ENUMS.frequency;
var CATEG = ENUMS.category;

var feedbackSurveySchema = new mongoose.Schema({

    posted_by: {type: String, required:true},

    title: {type:String},

    category_type: {type:String, enum: [CATEG.CUSTOM, CATEG.EXAM, CATEG.SUBJECT, CATEG.MISC]},

    category_name: {type: String},

    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],

    priority: {type: Number},

    tags: {type: mongoose.Schema.Types.ObjectId, ref: 'Tag'},

    noOfQuestions: {type: Number},

    frequency: {type:String, enum: [FREQ.WEEKLY, FREQ.MONTHLY]},

    noOfIterations: {type: Number},

    start_date: {type: String},

    expiry_date: {type: String},

    groups: [{type: String, ref: 'Group'}],

    allow: [{type: String, enum: [ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT,ROLES.ADMINISTRATOR]}],

    institutes: [{type: mongoose.Schema.Types.ObjectId}],

    sent: {
        count: {type: Number}
    },

    published: {type: Boolean, default:false},
    publishStatus: {type: Boolean, default:false},
    stopped: {type:Boolean, default:false},
    publishDate: {type: String},
    sendAnonymous: {type: Boolean, default:true},

    notification_options: {
         sms: {type: Boolean, default: false},
         email: {type: Boolean, default: false},
         noAppSms: {type: Boolean, default: false}
    }

});

module.exports = mongoose.model('FeedbackSurvey',feedbackSurveySchema);



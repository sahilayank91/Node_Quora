var mongoose = require('mongoose');
var POST_TYPES = require(__BASE__ + "config/enums").post_type;
var ENUMS = require(__BASE__ + "config/enums");
var IMAGE_TYPES = require(__BASE__+"config/enums").image_resolution_types;
var ROLES = ENUMS.roles;


var ReportedPostSchema = new mongoose.Schema(
    {

        _id:{type:String},
        reportedBy: {type: String, ref: 'User', required: true},


        create_time: {type: Date, required: true},

        post:{type:String, ref:'Post'},
        reason: {type: String},

    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('ReportedPost', ReportedPostSchema);

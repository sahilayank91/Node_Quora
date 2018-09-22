/*Created by Sahil */

var mongoose = require('mongoose');

var AttendenceSchema = new mongoose.Schema(
    {
        //_id: Object,

        attendenceReport: {type: mongoose.Schema.Types.ObjectId, ref: 'AttendenceReport'},

        user: {type: String, ref: 'User', required: true},

        type: {
            type: String,
            required: true,
            enum: ['ABSENT', 'LATE', 'PRESENT', 'LEAVE']
        },

        //type: {type: String, required: true},

        sender: {type: String, ref: 'User', required: true},

        date: {type: Date},

        group: {type: String, ref: 'Group', required: true},

        course_name:  {type: String},
        periodNo : {type : String},

        remarks: {type: String},

        created_at: {type: Date},
        updated_at: {type: Date},
        notifyParents : Boolean,

    },
    {
        minimize: false
    }
);
AttendenceSchema.index({user: 1});
AttendenceSchema.index({timestamp: -1});
AttendenceSchema.index({attendenceReport: 1});

module.exports = mongoose.model('Attendence', AttendenceSchema);

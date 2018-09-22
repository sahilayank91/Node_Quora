/**
 * Created by Sahil Ayank.
 */

var mongoose = require('mongoose');

var AttendenceReportSchema = new mongoose.Schema(
    {
        //_id: Object,

        sender: {type: String, ref: 'User', required: true},

        notification_options: {
            sms: {type: Boolean, default: false},
            email: {type: Boolean, default: false},
            noAppSms: {type: Boolean, default: false}
        },

        date: {type: Date},

        group: {type: String, ref: 'Group', required: true},

        course_name: {type: String},
        periodNo : {type : String},

        created_at: {type: Date},
        updated_at: {type: Date},

        absent_count: {type: Number, default:0},
        late_count: {type: Number, default:0},
        present_count: {type: Number, default:0},
        leave_count : {type : Number, default : 0},
        notifyParents : Boolean,
    },
    {
        minimize: false
    }
);

AttendenceReportSchema.index({group: 1});
AttendenceReportSchema.index({timestamp: -1});


module.exports = mongoose.model('AttendenceReport', AttendenceReportSchema);

var mongoose = require('mongoose');

var CalendarActivitySchema = new mongoose.Schema(
    {
        //_id: Object,
        userId: {type: String, ref: 'User'},
        
        type: {type: String, required: true},
        test: {type: mongoose.Schema.Types.ObjectId, ref: 'Test'},
        
        sender: {type: String, ref: 'User', required: true, index: true},
        
        calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'},
        
        group: {type: String, ref: 'Group', required: true},
        
        timestamp: {type: Date, required: true},
        
        going: {type: String},
        
        start_time: {type: Date},
        
        end_time: {type: Date},
        
        title: {type: String},
        
        message: {type: String},
        
        allDay: {type: Boolean},
        
        location: {type: String},
        
        //content: {type: Object},
        
        response_required: {type: Boolean},
        
        visibleToParent: Boolean,
        
        parentsOnly: Boolean,
        
        cancelled: {type: Boolean, default: false}
    },
    {
        minimize: false
    }
);

CalendarActivitySchema.index({userId: 1, calendar: 1}, {unique: true});
CalendarActivitySchema.index({start_time :1});
CalendarActivitySchema.index({end_time :1});



module.exports = mongoose.model('CalendarActivities', CalendarActivitySchema);

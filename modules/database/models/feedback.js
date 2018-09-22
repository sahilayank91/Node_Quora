/**
 * Created by shavi on 16/3/16.
 */
var mongoose = require('mongoose');


var Feedback = new mongoose.Schema(
    {
        
        
        posted_by: {type: String, ref: 'User', required: true},
        
        
        create_time: {type: Date, required: true},
        update_time: {type: Date, required: true},
        
        text: {type: String},
        
        tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
        
        allow: {type: false},
        
    },
    {
        minimize: false
    }
);


module.exports = mongoose.model('Feedback', Feedback);

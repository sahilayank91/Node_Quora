var mongoose = require('mongoose');
var BRANCH = require(__BASE__ + "config/enums").branch;

var BatchSchema = new mongoose.Schema(
    {
        _id: String,

        year: {type: String},

        type: {type:String, enum:['BTech','MTech']},

        branch :{type:String,enum: [BRANCH.CSE,BRANCH.ECE,BRANCH.ME]},

        current : {type:String, enum:['Current','Graduated']},

        create_time: {type: Date, required:true},

        students: [{
            //_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
            name: {type: String},
            college_id: {type: String}
        }]
    }
);
module.exports = mongoose.model('Batch', BatchSchema);
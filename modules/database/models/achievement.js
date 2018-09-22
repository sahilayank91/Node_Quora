var mongoose = require('mongoose');
var IMAGE_TYPES = require(__BASE__+"config/enums").image_resolution_types;

var AchievementSchema = new mongoose.Schema(
    {
        //_id: Object,
        type: {
            type: String,
            required: true
        },

        posted_by: {type: String, ref: 'User', required: true},
        //set these manually
        create_time: {type: Date, required: true},
        update_time: {type: Date, required: true},

        content: {
            title: {type: String}, // if not present copy first couple of words followed by ellipsis...
            text: {type: String},

            files: [{
                _id: {type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true},
                name: {type: String, required: true},
                mime_type: {type: String, required: true},
                image_resolution: {type: String, enum: [IMAGE_TYPES.IMAGE_MEDIUM, IMAGE_TYPES.IMAGE_HIGH]},
                url: {type: String, required: true},
                size: {type: Number}
            }]
        }
    },
    {
        minimize: false
    }
);
module.exports = mongoose.model('Achievement', AchievementSchema);
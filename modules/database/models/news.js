var mongoose = require('mongoose');
var NEWS_TYPE = require(__BASE__ + "config/enums").news_type;
var NewsSchema = new mongoose.Schema(
    {
        //_id: Object,
        type: {
            type: String,
            enum:[NEWS_TYPE.ACADEMICS,NEWS_TYPE.ADMISSION,NEWS_TYPE.CULTURAL,NEWS_TYPE.RECRUITMENT,NEWS_TYPE.RESEARCH,NEWS_TYPE.SCHOLARSHIP,NEWS_TYPE.SPORTS,NEWS_TYPE.OTHERS],
            required:true
        },

        posted_by: {type: String, ref: 'User', required: true},
        //set these manually
        create_time: {type: Date, required: true},

        content: {
            title: {type: String}, // if not present copy first couple of words followed by ellipsis...
            text: {type: String},
        },
        file:{type:String},
        link:{type:String},
        linkheader:{type:String},
        uploadTitle:{type:String},
    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('News', NewsSchema);

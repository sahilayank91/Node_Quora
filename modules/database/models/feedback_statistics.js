var mongoose = require('mongoose');

var feedbackStatisticsSchema = new mongoose.Schema({

    feedbackSurveyId: {type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackSurvey'},

    questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},

    iterationNo: {type: Number},

    option_statistics: [{
        optionId: {type: mongoose.Schema.Types.ObjectId},
        count: {type: Number}
    }],

    start_date: {type: String},

    end_date: {type: String}

});

module.exports = mongoose.model('FeedbackStatistics',feedbackStatisticsSchema);



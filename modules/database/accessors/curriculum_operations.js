var Curriculum = require(__BASE__ + 'modules/database/models/curriculum');
var customUUID = require(__BASE__ + "modules/utils/CustomUUID");
var Promise = require('bluebird');

//A template to input the data required at the registration of the user
var getCreateTemplate = function (parameters) {
    var template = {}
    for (var key in parameters) {
        switch (key) {
            case '_id':
            case 'subject':
            case 'credits':
            case 'semester':
            case 'file':
                template[key] = parameters[key];
                break;
        }
    }
    ;
    template.create_time = new Date();
    if (!template._id) {
        template._id = customUUID.getRandomAplhaNumeric();

        return template;
    }
    ;
}

var addSubject = function (parameters) {
    return new Promise(function (resolve, reject) {
        var template = getCreateTemplate(parameters);
        var curriculum = new Curriculum(template);
        curriculum.save(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createSubject failed'));
            }
        });

    });

};



var getSubjectList = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        Curriculum.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Users'));
            }
        });
    });
};



var deleteSubject = function(rule,fields,options){
    return new Promise(function (resolve,reject){
        Curriculum.remove(rule,fields, options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to delete Faculty"));
            }
        });
    });
};

var updateSubject = function(rule,fields){
    return new Promise(function(resolve,reject){
        Curriculum.findOneAndUpdate(rule,fields, {upsert: true}).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};

var getSubjectById = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Curriculum.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get User"));
            }
        });
    });
};

module.exports = {
    addSubject:addSubject,
    getSubjectList:getSubjectList,
    deleteSubject:deleteSubject,
    updateSubject:updateSubject,
    getSubjectById:getSubjectById
}
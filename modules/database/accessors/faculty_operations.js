var User = require(__BASE__ + 'modules/database/models/user');
var Faculty = require(__BASE__ + 'modules/database/models/faculty');

var customUUID = require(__BASE__ + "modules/utils/CustomUUID");
var Promise = require('bluebird');

//A template to input the data required at the registration of the user
var getCreateTemplate = function (parameters) {
    if ((!parameters.email && !parameters.phone)) {
        return {};
    }
    var template = {}
    for (var key in parameters) {
        switch (key) {
            case '_id':
            case 'username':
            case 'email':
            case 'phone':
            case 'post':
            case 'password':
            case 'role':
            case 'branch':
            case 'secondary_email':
            case 'secondary_phone':
            case 'firstname':
            case 'lastname':
            case 'keys':
            case 'education':
            case 'about':
            case 'gender':
            case 'profilePic':
            case 'faculty_type':
            case 'achievement':
            case 'publication':
            case 'responsibility':
                template[key] = parameters[key];
                break;
        }
    };


    template.created_at = new Date();

    if (!template._id) {
        template._id = customUUID.getRandomAplhaNumeric();
    }

    return template;
};


var createFaculty = function (parameters) {
    return new Promise(function (resolve, reject) {
        var template = getCreateTemplate(parameters);
        var faculty = new Faculty(template);
        faculty.save(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createFaculty failed'));
            }
        });

    });

};



var getFacultyList = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        Faculty.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Users'));
            }
        });
    });
};



var deleteFaculty = function(rule,fields,options){
    return new Promise(function (resolve,reject){
        Faculty.remove(rule,fields, options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to delete Faculty"));
            }
        });
    });
};

var updateFaculty = function(rule,fields){
    return new Promise(function(resolve,reject){
        Faculty.findOneAndUpdate(rule,fields, {upsert: true}).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};

var getFacultyById = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Faculty.find({_id:rule},fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get User"));
            }
        });
    });
};

module.exports = {
    getFacultyList: getFacultyList,
    createFaculty:createFaculty,
    getFacultyById:getFacultyById,
    updateFaculty:updateFaculty,
    deleteFaculty:deleteFaculty

};
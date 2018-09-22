var User = require(__BASE__ + 'modules/database/models/user');
var customUUID = require(__BASE__ + "modules/utils/CustomUUID");
var Promise = require('bluebird');
var Batch = require(__BASE__ + 'modules/database/models/batch');

//A template to input the data required at the registration of the user

var getCreateTemplate = function(parameters){
    var template = {};
    for(var key in parameters){
        switch(key){
            case 'year':
            case 'type':
            case 'branch':
            case 'students':
                 template[key] = parameters[key];
                 break;
        }
    }
    template.create_time = new Date();
    template.current = 'Current';

    if (!template._id) {
        template._id = customUUID.getRandomAplhaNumeric();
    }

    return template;
};



var getStudentList = function(rule,fields,options){
    return new Promise(function (resolve, reject) {
        Batch.find(rule, fields, options).lean().exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log("/getStudentList, some error occured", err);
                reject(new Error('Failed to get student and batch details'));
            }
        });
    });
};

var getBatchList = function(rule,fields,options){
    return new Promise(function (resolve, reject) {
        Batch.find(rule, fields, options).lean().exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log("/getBatchList, some error occured", err);
                reject(new Error('Failed to get batch details'));
            }
        });
    });
};


var addStudentList = function(parameters){
  return new Promise(function(resolve,reject){
      var template = getCreateTemplate(parameters);
      console.log("Template : ", template);
      var batch = new Batch(template);
      batch.save(function (err, data) {
          if (!err) {
              resolve(data);
          } else {
              console.log("Create Batch List, Some error occured", err);
              reject(new Error('Failed to create NewBatch'));
          }
      });
  });
};

var updateBatch = function(rule, newData , options){
    return new Promise(function(resolve, reject){
        Batch.findOneAndUpdate(rule,{$set:{students:newData}},options?options:{multi:true},function(err,data){
            if(!err){
                resolve(data);
            }else{
                console.log("Error in updating the Batch ",err);
                reject(err);
            }
        })
    }).catch(function(error){
        console.log(error);
    })
};

var updateBatchType = function(rule, newData , options){
    return new Promise(function(resolve, reject){
        Batch.findOneAndUpdate(rule,{$set:{current:newData}},options?options:{multi:true},function(err,data){
            if(!err){
                resolve(data);
            }else{
                console.log("Error in uodating batch as graduated.",err);
                reject(err);
            }
        })
    }).catch(function (error) {
        console.log(error);
    })
};

var removeBatchDetails = function(rule,fields,options){
    return new Promise(function (resolve, reject) {
        Batch.remove(rule, fields, options).lean().exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log("/removeBatchDetails, some error occured", err);
                reject(new Error('Failed to get batch details'));
            }
        });
    });
};

module.exports = {
    getStudentList: getStudentList,
    addStudentList: addStudentList,
    updateBatch: updateBatch,
    getBatchList: getBatchList,
    updateBatchType:updateBatchType,
    removeBatchDetails:removeBatchDetails
};
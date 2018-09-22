let User = require(__BASE__ + 'modules/database/models/user');
let Faculty = require(__BASE__ + 'modules/database/models/faculty');
let customUUID = require(__BASE__ + "modules/utils/CustomUUID");
let Promise = require('bluebird');
let Counter = require(__BASE__ + 'modules/database/models/counter');


//A template to input the data required at the registration of the user
let getCreateTemplate = function (parameters) {
    if ((!parameters.email && !parameters.phone)) {
        return {};
    }
    let template = {}
    for (let key in parameters) {
        switch (key) {
        	case '_id':
          case 'name':
					case 'studentid':
					case 'firstname':
					case 'middlename':
					case 'lastname':
					case 'branch':
					case 'category':
					case 'email':
					case 'phone':
					case 'password':
					case 'role':
					case 'profilePic':
					case 'secondary_email':
					case 'secondary_phone':
					case 'keys':
					case 'gender':
					case 'dob':
					case 'fathername':
					case 'mothername':
					case 'father_mobileno':
					case 'mother_mobileno':
					case 'parent_email':
					case 'permanent_address':
					case 'hosteller':
					case 'local_address':
					case 'guardian_name':
					case 'guardian_phone':
					case 'guardian_address':
					case 'guardian_email':
                template[key] = parameters[key];
                break;
        }
    }


    template.created_at = new Date();

    // if (parameters.password) {
    //     template.password = cryptographer.hashIt(parameters.password);
    // }

    if (!template._id) {
        template._id = customUUID.getRandomAplhaNumeric();
    }

    return template;
};




let getNextSequenceValue = function(sequencename,fields,options){
	return new Promise(function(resolve,reject) {
		Counter.findOneAndUpdate({ _id: sequencename }, { $inc: { sequence_value: 1 } }, { upsert: true }).exec(function(err, data) {
			if (!err) {
				console.log(data);
					resolve(data);
			} else {
				console.log("Error in generate id");
			}
		});
	});
};

let createUser = function (parameters) {
	return new Promise(function(resolve, reject) {
		var template = getCreateTemplate(parameters);


		/*TODO: add functionlities for other roles */


		if (template.role === "Student") {
			let date = new Date();

			/*Getting the current year*/
			let current_year = date.getFullYear();

			/*Get automatically incremented roll no*/
			let promise = getNextSequenceValue(current_year);

			let temp = (template.branch === "CSE") ? "KUCP" : "KUEC";

			promise.then(function(data) {

				template.studentid = current_year + temp + data.sequence_value;
				let user = new User(template);
				user.save(function(err, data) {
					if (!err) {
						resolve(data);
					} else {
						console.log(err);
						reject(new Error('createUser failed'));
					}
				});
			})


		} else {



			/*Store the user using the template*/
			let user = new User(template);
			user.save(function(err, data) {
				if (!err) {
					resolve(data);
				} else {
					console.log(err);
					reject(new Error('createUser failed'));
				}
			});


		}

	});
}

let createFaculty = function (parameters) {
    return new Promise(function (resolve, reject) {
        let template = getCreateTemplate(parameters);
        console.log(template);
        let faculty = new Faculty(template);
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


let getUsers = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        User.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Users'));
            }
        });
    });
};


let getUserFullDetail = function (rule, fields, options) {
	return new Promise(function (resolve, reject) {
		User.find(rule, fields, options).exec(function (err, data) {
			if (!err) {
				resolve(data);
			} else {
				reject(new Error('Failed to get Users'));
			}
		});
	});
};


let deleteUsers = function(rule,fields,options){
    return new Promise(function (resolve,reject){
            User.remove(rule,fields, options).exec(function(err,data){
                if(!err){
                    resolve(data);
                }else{
                    reject(new Error("Failed to delete Users"));
                }
            });
    });
};

let updateUser = function(rule,fields,options){
  return new Promise(function(resolve,reject){
    User.findOneAndUpdate(rule,fields,options).exec(function(err,data){
        if(!err){
            resolve(data);
        }else{
            reject(new Error("Failed to update Users"));
        }
    });
  });
};

let getUserById = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        User.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get User"));
            }
        });
    });
};

module.exports = {
    createUser: createUser,
    getUsers: getUsers,
    updateUser:updateUser,
    getUserById:getUserById,
		getUserFullDetail:getUserFullDetail,
    createFaculty:createFaculty
};
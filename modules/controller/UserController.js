let userOperations = require(__BASE__+"modules/database/accessors/user_operations");

let getUsers = function(parameters){
    return userOperations.getUsers({email: parameters.useremail, password: parameters.userpass})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
           console.log("Error in get Users: ",error);
        });

};
let getLoggedInUser = function(parameters){
    return userOperations.getUsers({email: parameters.useremail})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });

};

let registerUser = function(parameters){
    console.log(parameters);
    return userOperations.createUser(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant create user with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};

let updateProfilePic = function(parameters){
    console.log(parameters);

    return userOperations.updateProfilePic(parameters)
        .then(function(data){
            if(data){
                return data;
            }
        }).catch(function(err){
            console.log(err);

        })
}

let getUserFullDetail = function(parameters){
  console.log(parameters);
	return userOperations.getUsers(parameters)
		.then(function(data){
			if(data){
				return data;
			}else{
				throw new Error('No User exists with given useremail');
			}
		}).catch(function(error){
			console.log("Error in get Users: ",error);
		});
}



let registerFresherStudent = function(parameters){
	console.log(parameters);
	return userOperations.createUser(parameters)
		.then(function(data)
		{
			if(data)
			{
				return data;
			}
		})
}





module.exports = {
  getUsers:getUsers,
  getUserFullDetail:getUserFullDetail,
  getLoggedInUser:getLoggedInUser,
  registerUser:registerUser,
  updateProfilePic:updateProfilePic,
};
var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var ProfileOperations = require(__BASE__+"modules/database/accessors/profile_operations");
var path = require('path');
var cookieParser = require('cookie-parser');
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var DataValidator = require(__BASE__ + "modules/utils/DataValidator");
var client = require(__BASE__ + "modules/controller/handler/TokenHandler").REDIS_CLIENT;
var UserController = require(__BASE__ + "modules/controller/UserController");
var TokenHandler = require(__BASE__ + "modules/controller/handler/TokenHandler");

/* GET users listing. */
router.post('/login', function(req, res) {

	var userPass = req.body.password;
	var userEmail = req.body.email;
	if ((!DataValidator.isValidEmail(userEmail))  && !DataValidator.isValidPassword(userPass)){

		console.log("User input is not correct");
		RESPONSE.sendError(res,{success:false});

	}else {
		var parameters = {
			userpass: userPass  ,
			useremail: userEmail
		};

		UserController.getUsers(parameters)
			.then(function (data) {
				if (data.length >0) {

					/*Setting up session parameters*/
					// req.session.key = TokenHandler.generateAuthToken(data[0]._id,data[0].role);
					// req.session.email=data[0].email;
					// req.session.role = data[0].role;


					RESPONSE.sendOkay(res, {success: true, redirect: path.join("/" + 'dashboard'), data:data});
				} else {
					console.log("Some error occured while getting data from the database");
				}
			}).catch(function (err) {
			console.log(err);
		});
	}


});

router.post('/registerStudent',function(req,res) {
	var parameters = {
		email: req.body.email,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		middlename:req.body.middlename,
		name:req.body.name,
		branch:req.body.branch,
		category:req.body.category,
		phone:req.body.phone,
		dob:req.body.dob,
		year:req.body.year,
		role: req.body.role,
		gender:req.body.gender,
		profilePic:req.body.profilePic,
		fathername:req.body.fathername,
		mothername:req.body.mothername,
		father_mobileno:req.body.father_mobileno,
		mother_mobileno:req.body.mother_mobileno,
		parent_email:req.body.parent_email,
		permanent_address:req.body.permanent_address,
		hosteller:req.body.hosteller,
		local_address:req.body.local_address,
		guardian_name:req.body.guardian_name,
		guardian_phone:req.body.guardian_phone,
		guardian_address:req.body.guardian_address,
		guardian_email:req.body.guardian_email,
		created_by:req.body.created_by

	};
	console.log(parameters);
	UserController.registerUser(parameters)
		.then(function (data) {
			if (data) {
				RESPONSE.sendOkay(res, {success: true,data:data});
				// RESPONSE.sendOkay(res, parameters);
				return true;
			} else {
				console.log("Some error occured while getting data from the database");
				return false;
			}


		});
});

router.post('/updateUser',function(req,res){
	var promise = Promise.resolve(true);
	var parameters = {
		email: req.body.email,
		password: req.body.password,
		firstname : req.body.firstname,
		lastname : req.body.lastname,
		phone: req.body.phone,
		gender: req.body.gender,
		role: req.body.role
	};

	promise = userOperations.updateUser(parameters);
	promise.then(function(data){
		if(data){
			res.render('index', { title: 'Indian Institute of Information Technology, Kota' });
		}else{
			console.log("Some error occured while updating the users");
		}
	})



});
router.get('/getLoggedInUser',function(req,res){
	if (!req.session.key) {
		return;
	}
	var parameters = {
		useremail: req.session.email
	};
	UserController.getLoggedInUser(parameters)
		.then(function (data) {
			if (data.length > 0) {

				/*Setting up session parameters*/
				req.session.key = TokenHandler.generateAuthToken(data[0]._id, data[0].role);
				req.session.email = data[0].email;
				req.session.role = data[0].role;


				RESPONSE.sendOkay(res, {success: true, data: data});
			} else {
				console.log("Some error occured while getting data from the database");
			}
		}).catch(function (err) {
		console.log(err);
	});


});

router.get('/logout',function(req,res){



	req.session.destroy(function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});



module.exports = router;

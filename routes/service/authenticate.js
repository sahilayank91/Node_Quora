var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var profileOperations = require(__BASE__+"modules/database/accessors/profile_operations");
var path = require('path');
var cookieParser = require('cookie-parser');
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var DataValidator = require(__BASE__ + "modules/utils/DataValidator");
var client = require(__BASE__ + "modules/controller/handler/TokenHandler").REDIS_CLIENT;
var UserController = require(__BASE__ + "modules/controller/UserController");
var ProfileController = require(__BASE__ + "modules/controller/ProfileController");
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

router.post('/register',function(req,res) {
    var parameters = {
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    };
    console.log(parameters);
    UserController.registerUser(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true, redirect: path.join("/" + 'login')});
                // RESPONSE.sendOkay(res, parameters);
                return true;
            } else {
                console.log("Some error occured while getting data from the database");
                return false;
            }


        });
});

router.post('/updateUser',function(req,res){

    var parameters = {
        email: req.body.email,
        password: req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        phone: req.body.phone,
        gender: req.body.gender,
        occupation:req.body.occupation
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

router.post('/getProfile',function(req,res,next){
	var id = req.body._id;
console.log("id:",id);
	//req.session.user_id = id;
	profileOperations.getProfile(id)
		.then(function(data){
			if(data){
				RESPONSE.sendOkay(res, {success: true, data: data});
			}
		}).catch(function (error) {
		console.log("Error : ", error);
	});

});

router.post('/updateProfile', function (req, res, next) {
	var parameters = {
		_id:req.body._id,
		email: req.body.email,
		firstname: req.body.firstname,
		middlename: req.body.middlename,
		lastname: req.body.lastname,
		phone: req.body.phone,
		fathername: req.body.fathername,
		mothername: req.body.mothername,
        profilePic:req.body.profilePic,
        occupation:req.body.occupation,
		permanent_address: req.body.permanent_address,
        expertise:req.body.expertise
	};
	if(req.body.interest){
	    parameters.interest=req.body.interest;
    }
	ProfileController.updateProfile(parameters)
		.then(function (Data) {
			if (Data) {
				RESPONSE.sendOkay(res, {success: true});
			} else {
				console.log("Some error occured while updating data in the database");
			}
		}).catch(function(err){
		console.log(err);
	});


});

router.get('/forgotPassword',function(req,res){

    let parameters = {
        email: req.body.email
    };
    UserController.forgotPassword(parameters)
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

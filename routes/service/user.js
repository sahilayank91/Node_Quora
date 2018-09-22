var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var path = require('path');
var cookieParser = require('cookie-parser');
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var DataValidator = require(__BASE__ + "modules/utils/DataValidator");
var client = require(__BASE__ + "modules/controller/handler/TokenHandler").REDIS_CLIENT;
var UserController = require(__BASE__ + "modules/controller/UserController");
var TokenHandler = require(__BASE__ + "modules/controller/handler/TokenHandler");

router.post('/getUserDetail',function(req,res){

	var parameters = {
		_id: req.body._id
	};
	UserController.getUserFullDetail(parameters)
		.then(function (data) {
			if(data.length>0){
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

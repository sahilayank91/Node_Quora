var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var filename;


var storage = multer.diskStorage({ //multers disk storage settings



	destination: function (req, file, cb) {
		if (!fs.existsSync('./public/uploads/')){
			fs.mkdirSync('./public/uploads/');
			cb(null, './public/uploads/');

		}else{
			cb(null, './public/uploads/');
		}

	},

	filename: function (req, file, cb) {

		console.log(file);
		var datetimestamp = Date.now();
        // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        cb(null, file.originalname);
        // filename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        filename = file.originalname;
	}
});

var upload = multer({ //multer settings
	storage: storage
}).single('file');



var documentStorage = multer.diskStorage({ //multers disk storage settings

	destination: function (req, file, cb) {
		if (!fs.existsSync('./public/uploads/Document')){
			fs.mkdirSync('./public/uploads/Document');
			cb(null, './public/uploads/Document');

		}else{
			cb(null, './public/uploads/Document');
		}

	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		// cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
		cb(null, file.name);
		// filename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
		filename = file.name;
	}
});


var documentUpload = multer({ //multer settings
	storage: documentStorage
}).single('file');


router.post('/uploadProfilePic',function(req,res,next){
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0,err_desc:null,filename:filename});
    });
});

router.post('/uploadFile',function(req,res,next){
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0,err_desc:null,filename:filename});
    });
});



router.post('/uploadDocument',function(req,res,next){
	documentUpload(req,res,function(err){
		if(err){
			res.json({error_code:1,err_desc:err});
			return;
		}
		res.json({error_code:0,err_desc:null,filename:filename});
	});
});

module.exports = router;

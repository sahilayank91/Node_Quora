global.__BASE__ = __dirname + "/"
const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const mongoose = require("mongoose")
const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const LOGGER = require(__BASE__ + "modules/utils/Logger")
const session = require("express-session")
const redisClient = require("redis").createClient(
	process.env.REDIS_PORT,
	process.env.REDIS_HOST
)
const redisStore = require("connect-redis")(session)

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config()
}

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// app.set('view engine', 'pug');

//app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use("/bower", express.static(path.join(__dirname, "bower_components")))

/****************************************************/
/*************** Database Connection ****************/
/****************************************************/

const dbUrl =
	process.env.MONGO_URL ||
	`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${
		process.env.DB_NAME
	}`
mongoose.connect(
	dbUrl,
	function(err) {
		if (err) {
			LOGGER.log.error(
				LOGGER.PREFIX.DATABASE + "Database connection failed",
				err
			)
		} else {
			LOGGER.log.debug(
				LOGGER.PREFIX.DATABASE + "Database connection successful"
			)
		}
	}
)

mongoose.set("debug", true)

/****************************************************/
/**************** Session Management ****************/
/****************************************************/

if (process.env.REDIS_PASS) {
	redisClient.auth(process.env.REDIS_PASS, (err, reply) => {
		if (err) {
			LOGGER.log.error(`${LOGGER.PREFIX.REDIS} Redis auth error`, err)
		} else {
			LOGGER.log.debug(
				`${LOGGER.PREFIX.REDIS} Redis connected, reply: ${reply}`
			)
		}
	})
}

app.use(
	session({
		name: "ERP",
		secret: process.env.SECRET,
		store: new redisStore({
			client: redisClient
		}),
		resave: false,
		saveUninitialized: false,
		path: "/",
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 4 * 60 * 60 * 1000 // Sessions persist for 4 hrs
		}
	})
)

redisClient.on("error", function(err) {
	LOGGER.logErrorMessage("Redis error", err)
})

/****************************************************/
/******************* Routes Setup *******************/
/****************************************************/
var UI_INDEX = require(__BASE__ + "routes/index");
var SERVICE_authenticate = require(__BASE__ + "routes/service/authenticate");
var SERVICE_registration = require(__BASE__ + "routes/service/registration");
var SERVICE_user = require(__BASE__ + "routes/service/user");
var SERVICE_file = require(__BASE__ + "routes/service/fileHandler");
var SERVICE_post = require(__BASE__ + "routes/service/posts");

/****************************************************/
/****************** Routes Mapping ******************/
/****************************************************/
app.use('/', UI_INDEX);
app.use('/service/authenticate', SERVICE_authenticate);
app.use('/service/registration',SERVICE_registration);
app.use('/service/user',SERVICE_user);
app.use('/service/post/',SERVICE_post);
app.use('/service/file/',SERVICE_file);




app.use("/", indexRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

module.exports = app

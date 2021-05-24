var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const passport = require("passport");
const passportSetup = require("./auth/passport");

// set var for routes

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var bookedDayRouter = require("./routes/bookedDays");
var bookedDayMenuRouter = require("./routes/bookedDayMenus");
//var mealRouter = require("./routes/meals");
var menuRouter = require("./routes/menus");
var foodDayRouter = require("./routes/foodDays");
var foodDayMenuRouter = require("./routes/foodDayMenus");
//var starterRouter = require("./routes/starters");
//var mainEatRouter = require("./routes/mainEats");
//var dessertRouter = require("./routes/desserts");
var messageRouter = require("./routes/messages");

var app = express();

// Allow cross-origin requests
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
passportSetup(passport);

const passportOptions = { session: false, failWithError: true };

// app use for routes

app.use("/", indexRouter);
app.use("/user", usersRouter());
app.use("/bookedDay", bookedDayRouter());
app.use("/bookedDayMenu", bookedDayMenuRouter());
//app.use("/meal", mealRouter());
app.use("/menu", menuRouter());
app.use("/foodDay", foodDayRouter());
app.use("/foodDayMenu", foodDayMenuRouter());
app.use("/message", messageRouter());
//app.use("/starter", starterRouter());
//app.use("/mainEat", mainEatRouter());
//app.use("/dessert", dessertRouter());

// all routes inside api/login are protected by username/password
app.use(
  "/api/login",
  passport.authenticate("local", passportOptions),
  loginRouter()
);

// all routes inside api/users are protected by JWT
app.use(
  "/api/users",
  passport.authenticate("jwt", passportOptions),
  usersRouter()
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * error handler
 *
 * customized version of the express error handler.
 *
 * sends JSON bach when the original request had
 * content-type: application/json
 */

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // req.app.get("env") === "development"  tests NODE_ENV

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // error message

  res.status(err.status || 500);
  res.json({ message: res.locals.error.message });
});

module.exports = app;

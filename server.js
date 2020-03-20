// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var app = express();
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Requiring HandleBars
const exphbs = require("express-handlebars");

// eslint-disable-next-line no-unused-vars

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

//Handlebars connection
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set("view engine", "handlebars");

// Creating express app and configuring middleware needed for authentication

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
//run server with {force: true}) to drop and recreate the tables when models are edited
db.sequelize
  .sync
  //{ force: true }
  ()
  .then(function() {
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });

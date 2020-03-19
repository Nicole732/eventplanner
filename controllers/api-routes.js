// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  // sign up users
  app.post("/api/signup", function(req, res) {
    db.User.create({
      //add other attributes
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      interest: req.body.interest
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id, name and interest
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.body.name,
        interest: req.body.interest
      });
    }
  });
  //Events related routes
  //find all the Events and res in json
  app.get("/api/events", function(req, res) {
    db.Events.findAll({})
      .then(dbEvents => res.json(dbEvents))
      .catch(err => res.status(500).json(err));
  });

  // //find a Events with id and res in json
  // app.get("/api/events/:id", function(req, res) {
  //   db.Events.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(dbEvents => res.json(dbEvents))
  //     .catch(err => res.status(500).json(err));
  // });
  
  // //find all Events of a particular catagory
  // app.get("/api/events/category/:category", function(req, res) {
  //   db.Events.findAll({
  //     where: {
  //       category: req.params.category
  //     }
  //   })
  //     .then(dbEvents => res.json(dbEvents))
  //     .catch(err => res.status(500).json(err));
  // });
  //create an Events
  app.post("/api/events", function(req, res) {
    console.log(req.body);
    db.Events.create(req.body)
      .then(dbEvents => res.json(dbEvents))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // //delete a Events
  // app.delete("/api/events/:id", function(req, res) {
  //   db.Events.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(dbEvents => res.json(dbEvents))
  //     .catch(err => res.status(500).json(err));
  // });
  // //update a Events
  // app.put("/api/events/:id", function(req, res) {
  //   db.Events.update({
  //     where: {
  //       id: req.body.id
  //     }
  //   })
  //     .then(dbEvents => res.json(dbEvents))
  //     .catch(err => res.status(500).json(err));
  // });
};

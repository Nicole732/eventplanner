//all api routes for users model
const db = require("../models");

module.exports = function(app) {
  //find all the users and res in json
  app.get("/api/users", function(req, res) {
    db.User.findAll({})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(500).json(err));
  });
  //find a user with id and res in json
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(500).json(err));
  });
  //find all users with a particular interest
  app.get("/api/users/interest/:interest", function(req, res) {
    db.User.findAll({
      where: {
        interest: req.params.interest
      }
    })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(500).json(err));
  });
  //create a user
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(500).json(err));
  });
  //delete a user
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(500).json(err));
  });
  //update a user
  app.put("/api/users/:id", function(req, res) {
    db.User.update({
      where: {
        id: req.body.id
      }
    })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(500).json(err));
  });
};

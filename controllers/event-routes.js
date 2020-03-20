const Events = require("../models");

module.exports = function(app) {
  app.get("/api/events", function(req, res) {
    Events.findAll({}).then(function(results) {
      res.json(results);
    });
  });
  app.post("/api/new", function(req, res) {
    console.log("Events data:");
    console.log(req.body);
    Event.create({
      title: req.body.title,
      category: req.body.category,
      eventDate: req.body.eventDate,
      eventLink: req.body.eventlink,
      description: req.body.description,
      location: req.body.location
    }).then(function() {
      res.end();
    });
  });
};

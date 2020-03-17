const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/users", isAuthenticated, function(req, res) {
    //res.sendFile(path.join(__dirname,"../public/users.html"))
    // i am using testfile
    //handlebars. res.render
    res.sendFile(path.join(__dirname, "../public/testusers.html"));
  });
};

// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating an Admin model
// unique user with approval priviledges
module.exports = function(sequelize, DataTypes) {
  const Admin = sequelize.define("Admin", {
    // The email cannot be null, and must be a proper email before creation
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    // The password cannot be null and is a minimun of 8 characters
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: {
           args: [[1,8]],
           msg: "Please enter at least 8 characters"
          }
    },
    
    }

});


  // Creating a custom method for our Admin model. This will check if an unhashed password entered by the Admin can be compared to the hashed password stored in our database
  Admin.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the admin Model lifecycle
  // In this case, before a Admin is created, we will automatically hash their password
  Admin.addHook("beforeCreate", function(Admin) {
    Admin.password = bcrypt.hashSync(Admin.password, bcrypt.genSaltSync(10), null);
  });

  // associates an Admin with unique user
  Admin.associate = function(models) {
    Admin.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    })
  }

  //associates an Admin with many events
  Admin.associate = function(models) {
    Admin.hasMany(models.Events,{
      foreignKey:{
        allowNull: false
      }
    })
  }
  return Admin;
};

const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const Events = sequelize.define("Events", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    //suggest that category be canceled
    //correspond to user's interest
    category: {
      type: DataTypes.STRING
    },
    eventDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
      //defines current date and time as default value
    },
    eventLink: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "Please enter a valid URL with http protocol",
          args: [
            {
              protocols: ["https"],
              // eslint-disable-next-line camelcase
              require_valid_protocol: true,
              // eslint-disable-next-line camelcase
              require_protocol: true
            }
          ]
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    location: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
      //a location is required and cannot be null
    }
    // uploader: {
    //   type: DataTypes.STRING,
    //   notEmpty: true,
    //   allowNull: false
    // }
    // adminApproval: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
    // createdAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: Sequelize.NOW
    //   //defines current date and time as default value
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: Sequelize.NOW
    //   //defines current date and time as default value
    // }
  });

  // asscoiates one event with a unique User.
  //event can't be without a user: foreign key
  Events.associate = function(models) {
    Events.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Events;
};

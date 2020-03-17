const Sequelize = require("sequilize");

module.exports = function(sequelize, DataTypes){
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
        eventdate: {
            type: DataTypes.DATETIME,
            defaultValue: Sequelize.NOW
            //defines current date and time as default value
        },
        eventlink: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true, 
                msg: "Please enter a valid URL"
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
        },
        uploader: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        adminApproval: {
            type: Boolean,
            defaultValue: false
        }
        
    });

    // asscoiates one event with a unique User. event can't be without a user
    Events.associate = function(models){

        Events.belongsTo(models.User,{
            foreignKey:{
                allowNull: false

            }
        })
    }
    return Events;
}
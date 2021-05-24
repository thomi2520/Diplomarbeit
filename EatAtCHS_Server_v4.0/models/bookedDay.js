"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookedDay = sequelize.define(
    "BookedDay",
    {
      uID: {
        type: DataTypes.STRING,
        allowNull: false
      },
      loggedIn: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      consumed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {}
  );
  BookedDay.associate = function(models) {
    // associations can be defined here
    BookedDay.belongsTo(models.FoodDay, {
      foreignKey: { name: "foodDay_id", allowNull: true },
      targetKey: "id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });
  };
  return BookedDay;
};

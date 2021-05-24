"use strict";
module.exports = (sequelize, DataTypes) => {
  const FoodDay = sequelize.define(
    "FoodDay",
    {
      date: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  FoodDay.associate = function(models) {
    // associations can be defined here
    FoodDay.belongsTo(models.Menu, {
      foreignKey: { name: "menu_id", allowNull: true },
      targetKey: "id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });

    FoodDay.hasMany(models.BookedDay, {
      foreignKey: { name: "foodDay_id", allowNull: true },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      sourceKey: "id"
    });
  };
  return FoodDay;
};

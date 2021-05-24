"use strict";
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define(
    "Meal",
    {
      mealName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mealType: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  /*Meal.associate = function(models) {
    // associations can be defined here
    Meal.hasMany(models.Meal, {
      foreignKey: { name: "meal_id", allowNull: true },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      sourceKey: "id"
    });
  };*/
  return Meal;
};

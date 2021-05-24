"use strict";
module.exports = (sequelize, DataTypes) => {
  const Dessert = sequelize.define(
    "Dessert",
    {
      dName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  /*Dessert.associate = function(models) {
    // associations can be defined here
    Dessert.hasMany(models.Menu, {
      foreignKey: { name: "dessert_id", allowNull: false },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      sourceKey: "id"
    });
  };*/
  return Dessert;
};

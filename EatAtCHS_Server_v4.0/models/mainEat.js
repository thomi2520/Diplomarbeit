"use strict";
module.exports = (sequelize, DataTypes) => {
  const MainEat = sequelize.define(
    "MainEat",
    {
      mName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  /*MainEat.associate = function(models) {
    // associations can be defined here
    MainEat.hasMany(models.Menu, {
      foreignKey: { name: "main_id", allowNull: false },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      sourceKey: "id"
    });
  };*/
  return MainEat;
};

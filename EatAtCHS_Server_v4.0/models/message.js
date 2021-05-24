"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  );
  /*Starter.associate = function(models) {
    // associations can be defined here
    Starter.hasMany(models.Menu, {
      foreignKey: { name: "starter_id", allowNull: false },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      sourceKey: "id"
    });
  };*/
  return Message;
};

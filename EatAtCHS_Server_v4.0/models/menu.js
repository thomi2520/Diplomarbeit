"use strict";
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define("Menu", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    starter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    main: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dessert: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Menu.associate = function(models) {
    // associations can be defined here
    /* Menu.belongsTo(models.Starter, {
      foreignKey: { name: "starter_id", allowNull: false },
      targetKey: "id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });

    Menu.belongsTo(models.MainEat, {
      foreignKey: { name: "main_id", allowNull: false },
      targetKey: "id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });

    Menu.belongsTo(models.Dessert, {
      foreignKey: { name: "dessert_id", allowNull: false },
      targetKey: "id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });*/

    Menu.hasMany(models.FoodDay, {
      foreignKey: { name: "menu_id", allowNull: true },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      sourceKey: "id"
    });
  };
  return Menu;
};

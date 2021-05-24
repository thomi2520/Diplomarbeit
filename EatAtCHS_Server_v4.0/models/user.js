"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: DataTypes.STRING
  });
  
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Role, {
      foreignKey: { name: "role_id", allowNull: false },
      targetKey: "id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });

    /*User.belongsToMany(models.Department, {
      through: "DepartmentUser",
      foreignKey: {
        name: "user_id"
      }
    });

    User.belongsTo(models.DepartmentUser, {
      as: "UserDepartment",
      foreignKey: {
        name: "user_id"
      },
      sourceKey: "id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });*/
  };
  return User;
};

const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        minLength: 3,
        maxLength: 50,
      },
      telephone: {
        type: DataTypes.STRING,
        minLength: 9,
      },
      direction: {
        type: DataTypes.STRING,
        minLength: 9,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      roll: {
        type: DataTypes.STRING,
        enum: ["client", "admin"],
        defaultValue: "client",
      },
      active: {
        type: DataTypes.STRING,
        enum: ["valid", "invalid"],
        defaultValue: "valid",
      },
    },
    { timestamps: false }
  );
};

const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "food",
    {
      id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      reviews: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "New dish",
      },
      fat: {
        type: DataTypes.STRING,
        defaultValue: "Not specified",
      },
      sodium: {
        type: DataTypes.STRING,
        defaultValue: "Not specified",
      },
      sugar: {
        type: DataTypes.STRING,
        defaultValue: "Not specified",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      qualification: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

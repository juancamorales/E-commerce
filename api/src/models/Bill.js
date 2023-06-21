const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('bill', {
    billId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    products: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    value: {
        type: DataTypes.FLOAT
    },
    discount: { //en porcentaje
        type: DataTypes.INTEGER
    },    
    status: {
        type: DataTypes.STRING
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    qualify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
   });
};
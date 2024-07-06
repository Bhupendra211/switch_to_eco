const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConnection.js');

const product = require('./product.model');


const RefferalModels = sequelize.define('images', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    platform_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    refferal_url: {
        type: DataTypes.STRING,
        allowNull: false
    },

    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: product,
            key: "id"
        },
        allowNull: false
    },
}, {
    tableName: "refferals"
})


module.exports = RefferalModels;
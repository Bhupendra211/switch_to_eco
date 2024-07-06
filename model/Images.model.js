const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('../dbConnection.js');

const product = require('./product.model');


const ImageModels = sequelize.define('images', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    img_url: {
        type: DataTypes.STRING,
        allowNull: false
    },

    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: product,
            key: id
        },
        allowNull: false
    },
})


module.exports = ImageModels;
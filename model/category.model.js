const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnection');

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'category'
});

module.exports = Category;

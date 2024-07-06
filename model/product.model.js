const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnection');
const category = require('./category.model');


const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    product_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: category,
            key: 'id'
        },
        allowNull: false
    },

    product_img: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName: 'products',
})


Product.belongsTo(category, { foreignKey: 'category_id' });
category.hasMany(Product, { foreignKey: 'id' });



module.exports = Product;
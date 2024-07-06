const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Connection for Localhost
// const sequelize = new Sequelize(process.env.DBNAME, "root" || process.env.USERNAME, process.env.PASSWORD, {
//     host: process.env.HOST,
//     dialect: 'mysql',
//     port: process.env.DB_PORT || 3307
// });

// Connection for Aiven
const sequelize = new Sequelize(process.env.DBNAME, "avnadmin" || process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    port: 25853
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
};

connectDB();

module.exports = sequelize;


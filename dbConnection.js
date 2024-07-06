const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// const sequelize = new Sequelize(process.env.DBNAME, "root" || process.env.USERNAME, process.env.PASSWORD, {
//     host: process.env.HOST,
//     dialect: 'mysql',
//     port: process.env.DB_PORT || 3307
// });

const sequelize = new Sequelize("defaultdb", "avnadmin", "AVNS_yWjVxyX3kAX5cOly0b8", {
    host: "mysql-208c69f9-bhupendrabisht488-99eb.l.aivencloud.com",
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


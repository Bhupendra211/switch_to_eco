const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./dbConnection');

dotenv.config();
const productRoutes = require('./route/product.route');
const categoryRoutes = require('./route/category.route');


sequelize.sync().then(() => {
    console.log('Database synced');
})
    .catch(err => {
        console.error('Error syncing database:', err);
    });



const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Product Route
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);

// Test
app.use('/api/v1/test', (req, res) => {
    res.status(200).json({ message: "Welcome to Node APIs" });
});




app.listen(port, () => { console.log(`Server is running on Port ${port}`) })

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const products = require('../controller/product.controller');

// Product Routes
router.post('/add-product', [
    body('product_name').notEmpty().withMessage("Product name is required"),
    body('product_description').notEmpty().withMessage("Product description is required"),
    body('category_id').notEmpty().withMessage("Category Id is required"),
], products.addNewProduct);

router.get('/latest-10', products.latest10);

router.get('/search', products.searchProducts)

router.get('/prodcut-details', products.productDetails);

module.exports = router;

const productModel = require('../model/product.model');
const refferalModel = require('../model/Refferal.model');
const category = require('../model/category.model');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const RefferalModels = require('../model/Refferal.model');

// Add New Product
const addNewProduct = async (req, res) => {
    const data = validationResult(req);

    if (!data.isEmpty()) {
        return res.status(400).json({ errors: data });
    }
    try {

        const product_name = req.body.product_name;
        const product_description = req.body.product_description;
        const category_id = req.body.category_id;
        const product_img = req.body.product_img;

        const product = await productModel.create({ product_name, product_description, category_id, product_img });

        const referral = req.body.refferal;

        const referralPromises = Object.values(referral).map(async (e) => {
            return refferalModel.create({
                platform_name: e['platform_name'],
                refferal_url: e['refferal_url'],
                product_id: product.id,
                product_price: e['product_price']
            });
        });

        await Promise.all(referralPromises);


        res.status(201).json({ message: 'Product Added Successfully' });

    } catch (error) {
        res.status(500).json("something went wrong");
        console.log("something went wrong", error.message)
    }
}


// Get Product Data
const latest10 = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const product = await productModel.findAll({
            limit,
            offset,
        });

        res.status(200).json({ products: product })
    } catch (error) {
        res.status(500).json("Data is not available");
    }
}

const productDetails = async (req, res) => {
    const id = req.query.id;

    try {
        const product = await productModel.findByPk(id, {
            include: [
                {
                    model: RefferalModels,

                }
            ]
        });


        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Success', data: product });


    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Get Search Products
const searchProducts = async (req, res) => {
    const searchTerm = req.query.query;

    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    try {
        const results = await productModel.findAll({
            include: [{
                model: category,
                where: {
                    category_name: {
                        [Op.like]: `%${searchTerm}%`
                    }
                }
            }],
            where: {
                [Op.or]: [
                    { product_name: { [Op.like]: `%${searchTerm}%` } },
                    { '$category.category_name$': { [Op.like]: `%${searchTerm}%` } }
                ]
            }
        });

        if (results.length === 0) {
            return res.status(200).json({ message: 'Data not found' });
        }

        res.status(200).json({ message: 'Success', data: results });


    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addNewProduct, latest10, searchProducts, productDetails };
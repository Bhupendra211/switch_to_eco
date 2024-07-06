const productModel = require('../model/product.model');
const refferalModel = require('../model/Refferal.model');
const { validationResult } = require('express-validator');


const addNewProduct = async (req, res) => {
    const data = validationResult(req);

    if (!data.isEmpty()) {
        return res.status(400).json({ errors: data });
    }
    try {

        const product_name = req.body.product_name;
        const product_description = req.body.product_description;
        const category_id = req.body.category_id;

        const product = await productModel.create({ product_name, product_description, category_id });

        const referral = req.body.refferal;

        const referralPromises = Object.values(referral).map(async (e) => {
            return refferalModel.create({
                platform_name: e['platform_name'],
                refferal_url: e['refferal_url'],
                product_id: product.id
            });
        });

        await Promise.all(referralPromises);


        res.status(201).json({ message: 'Product Added Successfully' });

    } catch (error) {
        res.status(500).json("something went wrong");
        console.log("something went wrong", error.message)
    }
}



module.exports = { addNewProduct };
const Category = require('../model/category.model');
const { validationResult } = require('express-validator');

const addCategory = async (req, res) => {
    const data = validationResult(req);

    if (!data.isEmpty()) {
        return res.status(400).json({ errors: data });
    }
    try {

        const category_name = req.body.category_name;

        const category = await Category.create({ category_name });
        res.status(201).json(category);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log("something went wrong", error.message);
    }
}


module.exports = { addCategory };
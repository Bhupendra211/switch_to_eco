const app = require('express');
const categoryController = require('../controller/category.controller');
const { body } = require('express-validator');


const router = app.Router();

router.post('/add-category', [body("category_name").notEmpty().withMessage("Name is Required")], categoryController.addCategory);



module.exports = router;
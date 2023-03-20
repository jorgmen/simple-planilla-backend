/* 
    Deduction Routes
    host + /api/deduction
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validationMiddleware');
const { validateJWT } = require('../middlewares/tokenMiddleware');
const { 
    createNewDeduction,
    readAllDeductions

} = require('../controllers/deductionController');


const router = Router();

router.post(
    '/new',
    [
        check('name', 'Name is required!').notEmpty(),
        check('percentage', 'Percentage is required!').notEmpty(),
        check('percentage', 'Percentage should be a number between 1 and 100').isNumeric(),
        check('category', 'Category is required!').notEmpty(),
        validateFields,
        validateJWT
    ], 
    createNewDeduction); 

router.get(
    '/all',
    [ validateJWT ],
    readAllDeductions
    );


 module.exports = router;   
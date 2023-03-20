/*
    Payroll Routes
    host + /api/payroll
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validationMiddleware');
const { calculate } = require('../controllers/calculatorController');

const router = Router();

//Routes
router.post(
    '/calculate',
    [
    check('grossSalary').notEmpty(),
    check('grossSalary').isNumeric(),
    validateFields
    ],
    calculate
);

module.exports = router;

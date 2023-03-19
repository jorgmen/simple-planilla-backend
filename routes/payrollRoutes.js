/*
    Payroll Routes
    host + /api/payroll
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validationMiddleware');

const {
    getAllPayrolls,  
    createPayroll,
    updatePayroll,
    removePayroll
} = require('../controllers/payrollController');

const router = Router();

//Routes
router.get(
    '/All',
    [],
    getAllPayrolls
);


router.post(
    '/',
    [
        check('name', 'Name is required!').notEmpty(),
        check('name', 'Name Should be at least 6 characters long!').isLength({min: 6}),
        validateFields
    ],
    createPayroll
);

router.put(
    '/:id',
    [
        //check('name', 'Name is required!').notEmpty(),
       //check('name', 'Name Should be at least 6 characters long!').isLength({min: 6}),
        validateFields
    ],
    updatePayroll
);

router.delete(
    '/:id',
    [
        //check('name', 'Name is required!').notEmpty(),
       //check('name', 'Name Should be at least 6 characters long!').isLength({min: 6}),
        validateFields
    ],
    removePayroll
);


module.exports = router;
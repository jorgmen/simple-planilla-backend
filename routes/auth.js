/* 
    Auth Routes
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validationMiddleware');
const {
    createUser, 
    logUserIn,
    renewToken
} = require('../controllers/authController');

const router = Router();

//Routes
router.post(
    '/new',
    [
        check('name', 'Name is required!').notEmpty(),
        check('username', 'Username is required!').notEmpty(),
        check('email', 'Email is required!').isEmail(),
        check('password', 'Password should have at least 8 characters').isStrongPassword(),
        validateFields
    ], 
    createUser); 

//
router.post(
    '/',
    [
        check('username', 'username is Required!').notEmpty(),
        check('password', 'password is Required!').notEmpty(),
        validateFields
    ], 
    logUserIn);

//
router.get(
    '/renew', 
    [
        check("token", 'Token is required').notEmpty()
    ],
    renewToken);


module.exports = router;
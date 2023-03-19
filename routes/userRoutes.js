/* 
    User Routes
    host + /api/user
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validationMiddleware');
const { createUser } = require('../controllers/userController');


const router = Router();

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

 module.exports = router;   
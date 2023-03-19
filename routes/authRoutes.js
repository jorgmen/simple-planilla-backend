/* 
    Auth Routes
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validationMiddleware');
const { validateJWT } = require('../middlewares/tokenMiddleware');
const {
    logUserIn,
    renewToken
} = require('../controllers/authController');


const router = Router();

//Routes
router.post(
    '/',
    [
        check('username', 'username is Required!').notEmpty(),
        check('password', 'password is Required!').notEmpty(),
        validateFields
    ], 
    logUserIn);

//
router.get('/renew', validateJWT, renewToken);


module.exports = router;
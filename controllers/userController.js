const { response } = require('express');
const User = require('../models/User');
const { createUserIfNotExists } = require('../services/userService');


const createUser = async (req, res = response) => {

    try {
        const newUser = new User(req.body);

        var message = 'User Created';
        var status = 201;

        const { id, name, email, token } = await createUserIfNotExists(newUser);

        if (!id) {
            status = 400;
            message = "An user with this username or email already exists, try loging in";
        }

        // response
        res.status(status).json({
            msg: message,
            id,
            name,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
};


module.exports = {
    createUser
};
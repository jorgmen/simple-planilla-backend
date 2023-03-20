const express = require('express');
const {
    generateJWT,
} = require('../helpers/tokens');
const {validateUsernameAndPassword} = require('../services/userService');

const renewToken = async (req, res = express.response) => {
    const { uid, name } = req;

    try {
        //Generate new JWT 
        token = await generateJWT(uid, name);

        res.status(200).json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
};


const logUserIn = async (req, res = response) => {
    const { username, password } = req.body;
    try {
        var message = 'The username or password are incorrect!';
        var status = 400; //bad request
        var token;

        const { id, name } = await validateUsernameAndPassword(username, password);
        
        if (id) {
            status = 200;
            token = await generateJWT(id, name);
            message = "User has been logged in!"
        }

        res.status(status).json({
            ok: true,
            msg: message,
            id,
            name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
};

module.exports = {
    renewToken,
    logUserIn
};

const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const createUser = async (req, res = express.response) => {
    //const {username, email, password} = req.body;
    try {
        var message = 'Registered';
        var status = 201;

        const user = new User(req.body);
        var exists = await checkIfUserExists(user);

        if(!exists){
            // encrypt password
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);

            await user.save();
        }else{
            status = 400;
            message = "An user with this username or email already exists, try loging in";
        }

        // response
        res.status(status).json({
            msg: message,
            uid: user.id,
            username: user.name,
            email: user.email
        });

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
};

const logUserIn = (req, res = express.response) => {

    res.json({
        "200": "OK",
        "msg": "Log User In"
    });

};


const renewToken = (req, res = express.response) => {

    res.json({
        "200": "OK",
        "msg": "token renew"
    });

};


const checkIfUserExists = async(user) =>{
    
    let found = await User.findOne(
        { $or: 
            [
                {username: user.username}, 
                {email: user.email}
            ] 
        });
    return !!found;
}



module.exports = {
    createUser,
    logUserIn,
    renewToken
};

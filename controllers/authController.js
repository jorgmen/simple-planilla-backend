const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { geberateJWT, generateJWT } = require('../helpers/tokens');

const createUser = async (req, res = express.response) => {
    
    try {
        const newUser = new User(req.body);
        
        var message = 'Registered';
        var status = 201;
        
        const user = await checkIfUserExists(newUser);

        var token;
        
        if(!user){
            // encrypt password
            const salt = bcrypt.genSaltSync();
            newUser.password = bcrypt.hashSync(newUser.password, salt);

            await newUser.save();

            //Generate JWT 
            token = await generateJWT(newUser.id, newUser.name);

        }else{
            status = 400;
            message = "An user with this username or email already exists, try loging in";
        }

        // response
        res.status(status).json({
            msg: message,
            uid: newUser.id,
            username: newUser.name,
            email: newUser.email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
};

const logUserIn = async(req, res = express.response) => {
    const {username, password} = req.body;
    
    try {
        var message = 'The username or password are incorrect!';
        var status = 400; //bad request
        var token;

        const user = await User.findOne({username});

        if(user){
            
            const validPassword = bcrypt.compareSync( password, user.password);
            
            if(validPassword){
                status = 200;
                token = await generateJWT(user.id, user.name);
                message = "User has been logged in!"
            }
        }

        res.status(status).json({
            ok: true,
            msg: message,
            uid: status == 200 ? user.id : null,
            name: status == 200 ? user.name : '',
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
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

    return !!found ? found : false;
};



module.exports = {
    createUser,
    logUserIn,
    renewToken
};

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/tokens');

const createUserIfNotExists = async(user) => {

    const userFound = await checkIfUserExists(user);

    if (!userFound) {
        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        await user.save();

        //Generate JWT 
        //user.token = await generateJWT(user.id, user.name);

        return user;
    }else{
        return {};
    }

};



const checkIfUserExists = async (user) => {

    let found = await User.findOne(
        {
            $or:
                [
                    { username: user.username },
                    { email: user.email }
                ]
        });

    return !!found ? found : false;
};


const getUserByUsername = async (username) => {

    const user = await User.findOne({ username });

    return user;

};

const validateUsernameAndPassword = async(username, password)=>{

    const user = await User.findOne({ username });
    //console.log((!!user && bcrypt.compareSync(password, user.password)));
    return (!!user && bcrypt.compareSync(password, user.password)) 
        ? user
        : {};
};

module.exports = {
    createUserIfNotExists,
    checkIfUserExists,
    getUserByUsername,
    validateUsernameAndPassword
};
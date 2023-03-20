const {response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) =>{
    var msg = 'Invalid Token';
    
    //x-toke headers
    const token = req.header('x-token');
    
    try {
    
        if(token){
            const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

            req.uid = payload.uid;
            req.name = payload.name;

        }else{
            res.status(401).json({
                ok: false,
                msg
            });

        }        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg
        });
    }

    next();
};

module.exports = {
    validateJWT
};
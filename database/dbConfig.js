const mongoose = require('mongoose');

const dbConnection = async => {
    try {
        
        mongoose.connect(process.env.DB_CNN,{});
        console.log('DB Connected');

    } catch (error) {
        console.log(error);
        throw new Error('Error trying to connect to the database');
    }
}

module.exports = {
    dbConnection
};
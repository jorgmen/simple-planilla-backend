const { Schema, model } = require('mongoose');

const DeductionSchema = Schema({
    name:{
        type: String,
        required: true
    },
    porcentage:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
    }
});

module.exports = model('Deduction', DeductionSchema);
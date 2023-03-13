const { Schema, model } = require('mongoose');

const PayrollSchema = Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    company:{
        type: String,
        required: false,
        unique: false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        unique: false
    },
    dateCreated:{
        type: Date,
        required: true,
        unique: false
    }
});

module.exports = model('Payroll', PayrollSchema);
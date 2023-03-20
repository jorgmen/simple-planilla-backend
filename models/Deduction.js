const { Schema, model } = require('mongoose');

const DeductionSchema = Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    percentage:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
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

module.exports = model('Deduction', DeductionSchema);
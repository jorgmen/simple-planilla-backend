const Deduction = require('../models/Deduction');


const getAllDeductions = async () => {

    const deductions = await Deduction.find();
    return deductions;

};

module.exports = {
    getAllDeductions
};
const { response } = require('express');
const Deduction = require('../models/Deduction');


const calculate = async (req, res = response) => {
    try {

        const { grossSalary } = req.body;

        console.log(`Gross Salary: ${grossSalary}`);

        res.status(200).json({
            grossSalary
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
};

module.exports = {
    calculate
};


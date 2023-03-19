const express = require('express');
const { getAllDeductions } = require('../services/deductionService');

const getAll = async(req, res = express.response)=>{

    try {
        
        const deductions = await getAllDeductions();

        res.status(200).json({
            deductions
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
};

module.exports = {
    getAllDeductions
};



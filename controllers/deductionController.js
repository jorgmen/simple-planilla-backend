const { response } = require('express');
const { 
    createDeduction,
    readDeductions,
    updateDeduction,
    deleteDeduction 
} = require('../services/deductionService');
const Deduction = require('../models/Deduction');



const createNewDeduction = async(req, res = response) => {

    try {
        var message = 'Dedction Created!';
        var status = 200;

        req.body.dateCreated = Date();
        
        const newDeduction = new Deduction(req.body);
        
        newDeduction.user = req.uid;

        var deduction = await createDeduction(newDeduction);

        if(!deduction){
            status = 400;
            message = 'A Payroll with this name already exists!';
        }

        res.status(status).json({
            msg: message,
            data: deduction
        });

    } catch (error) {
        req.status(500).json({
            msg: error
        });
    }
}

const readAllDeductions = async(req, res = response)=>{

    try {
        
        const deductions = await readDeductions();

        res.status(200).json({
            msg: "Dedictions Listed",
            data: deductions
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
};


const updateExistingDeduction = async(req, res = response) => {

    console.log(req.body);
    res.status(200).json({
        ok: "OK"
    });
}

const deleteExistingDeduction = async(req, res = response) => {

    console.log(req.body);
    res.status(200).json({
        ok: "OK"
    });
}


module.exports = {
    createNewDeduction,
    readAllDeductions,
    updateExistingDeduction,
    deleteExistingDeduction
};



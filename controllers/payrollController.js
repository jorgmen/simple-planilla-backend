const express = require('express');
const Payroll = require('../models/Payroll');


const createPayroll = async(req, res = express.response) =>{

    try {
        var message = 'Created!';
        var status = 200;

        req.body.dateCreated = Date();
        console.log(req.uid);
        const payroll = new Payroll(req.body);
        var exists = await checkIfPayrollExists(payroll);

        if(!exists){
            await payroll.save();
        }else{
            status = 400;
            message = 'A Payroll with this name already exists!';
        }

        res.status(status).json({
            msg: message,
            pid: payroll.id,
            name: payroll.name,
            company: payroll.company
        });

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}

const readPayrolls = async(req, res = express.response)=>{
    try {

        const payrolls = await Payroll.find().populate('user', 'name');

        res.status(200).json({
            payrolls
        });

    } catch (error) {
        res.status(500).json({
           error 
        });        
    }
};

const updatePayroll = async(req, res = express.response) =>{

    try {


        
        res.status(200).json({
            ok: true,
            msg: 'updated'
        });

    } catch (error) {
        res.status(500).json({
            ok: false
        });
    }
};


const removePayroll = async(req, res = express.response) =>{

    try {


        
        res.status(200).json({
            ok: true,
            msg: 'removed'
        });

    } catch (error) {
        res.status(500).json({
            ok: false
        });
    }
};



const checkIfPayrollExists = async(payroll) => {
    
    let found = await Payroll.findOne({ name: payroll.name });
    return !!found;
};

module.exports = {
    readPayrolls,
    createPayroll,
    updatePayroll,
    removePayroll
};
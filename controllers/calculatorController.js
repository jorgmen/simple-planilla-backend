const { response } = require('express');
const { 
    calculateNetSalary ,
    calculateDetailedNetSalary
} = require('../services/calculatorService');

const calculate = async (req, res = response) => {
    try {

        const { grossSalary } = req.body;

        const netSalary = await calculateNetSalary(grossSalary);

        res.status(200).json({
            netSalary
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
};

const calculateDetailed = async(req, res =  response)=>{
    try {
        
        const {grossSalary} = req.body

        const details = await calculateDetailedNetSalary(grossSalary);
        console.log(details);
        res.status(200).json({
            data: details
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error at calculateDetailed",
            error
        });
    }
}

module.exports = {
    calculate,
    calculateDetailed
};


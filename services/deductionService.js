const Deduction = require('../models/Deduction');

const createDeduction = async (deduction) => {

    const exists = await deductionExists(deduction);

    if(!exists){
        await deduction.save();
        return deduction;
    }else{
        return {};
    }
};

const readDeductions = async () => {

    const deductions = await Deduction.find();
    return deductions;

};

const updateDeduction = async (deduction) => {

    console.log(req.body);
    res.status(200).json({
        ok: "OK"
    });
};

const deleteDeduction = async (id) => {

    console.log(req.body);
    res.status(200).json({
        ok: "OK"
    });
};

const deductionExists = async(deduction) => {
    let found = await Deduction.findOne({ name: deduction.name});
    return !!found;
}  



module.exports = {
    createDeduction,
    readDeductions,
    updateDeduction,
    deleteDeduction
};
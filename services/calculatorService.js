const { readDeductions } = require('../services/deductionService');

const calculateNetSalary = async(grossSalary) => {

    const deductions = await readDeductions();
    var deductionAmounts = [];

    deductions.forEach(deduction => {
        deductionAmounts.push(grossSalary * deduction.percentage / 100);  
    });
    
    var totalDeductions = deductionAmounts.reduce((acum, currentAmount) => acum + currentAmount, 0);
    
    return grossSalary - totalDeductions;

};

const calculateDetailedNetSalary = async(grossSalary) =>{
    const deductions = await readDeductions();
    
    var deductionAmounts = [];

    deductions.forEach(deduction => {
        var amount = grossSalary * deduction.percentage / 100;
        var {name, category, description, percentage} = deduction;
        deductionAmounts.push(
            {
                name,
                category,
                description,
                percentage,
                amountsTo: amount
            });  
    });
    
    var totalDeductions = deductionAmounts.reduce((acum, elem) => acum + elem.amountsTo, 0);
    
    var netSalary = grossSalary - totalDeductions;
    return {
        grossSalary,
        deductions: deductionAmounts,
        deductionsTotal: totalDeductions,
        netSalary
    };
}


module.exports = {
    calculateNetSalary,
    calculateDetailedNetSalary
};
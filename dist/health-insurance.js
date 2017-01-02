/* health-insurance v0.1.0 https://github.com/hochzehn/health-insurance */
var healthInsurance = function(record) {
    var healthInsuranceBaseRate = 14;
    var healthInsuranceWithSickPayRate = 14.6;
    var MINIMUM_INCOME = 2231.25;
    var MAXIMUM_INCOME = 4350;
    function getRates(company) {
        var healthInsuranceAdditionalRate;
        var nursingCareInsurance;
        var nursingCareInsuranceWithPenalty;
        switch (company) {
          case "tk":
            healthInsuranceAdditionalRate = 1;
            nursingCareInsurance = 2.55;
            nursingCareInsuranceWithPenalty = 2.8;
            break;
        }
        return {
            healthInsuranceAdditionalRate: healthInsuranceAdditionalRate,
            nursingCareInsurance: nursingCareInsurance,
            nursingCareInsuranceWithPenalty: nursingCareInsuranceWithPenalty
        };
    }
    function hasToPayNursingCarePenalty(record) {
        return record.age >= 23 && !record.hasChildren;
    }
    function calculate(record) {
        var rates = getRates(record.insuranceCompany);
        var nursingCareRate = hasToPayNursingCarePenalty(record) ? rates.nursingCareInsuranceWithPenalty : rates.nursingCareInsurance;
        var healthInsuranceRate = record.withSickPay ? healthInsuranceWithSickPayRate : healthInsuranceBaseRate;
        var healthInsuranceAdditionalRate = rates.healthInsuranceAdditionalRate;
        var income = record.income;
        income = Math.max(income, MINIMUM_INCOME);
        income = Math.min(income, MAXIMUM_INCOME);
        return calculateContributions(income, nursingCareRate, healthInsuranceRate, healthInsuranceAdditionalRate);
    }
    function calculateContributions(income, nursingCareRate, healthInsuranceRate, healthInsuranceAdditionalRate) {
        var nursingCareInsuranceContribution = calculateContribution(income, nursingCareRate);
        var healthInsuranceContribution = calculateContribution(income, healthInsuranceRate) + calculateContribution(income, healthInsuranceAdditionalRate);
        return {
            totalContribution: round(healthInsuranceContribution + nursingCareInsuranceContribution),
            nursingCareInsuranceContribution: nursingCareInsuranceContribution,
            healthInsuranceContribution: healthInsuranceContribution
        };
    }
    function calculateContribution(income, rate) {
        var result = income * rate / 100;
        result = round(result);
        return result;
    }
    function round(result) {
        return Math.round(result * 100) / 100;
    }
    return calculate(record);
};
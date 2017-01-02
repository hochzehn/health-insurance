var healthInsurance = function (record) {

    var healthInsuranceBaseRate = 14.0;
    var healthInsuranceWithSickPayRate = 14.6;

    var MINIMUM_INCOME = 2231.25;
    var MAXIMUM_INCOME = 4350.00;

    /**
     * Return health insurance rates for a given health insurance company.
     *
     * Note that rates are returned as percentages, e.g. return value of 15.0 means 15% or 0.015.
     *
     * @param company
     *
     * @returns {{healthInsuranceAdditionalRate: *, nursingCareInsurance: *, nursingCareInsuranceWithPenalty: *}}
     */
    function getRates(company) {
        var healthInsuranceAdditionalRate;
        var nursingCareInsurance;
        var nursingCareInsuranceWithPenalty;

        switch (company) {
            case 'tk':
                // https://www.tk.de/tk/versichert-als-selbststaendige/beitraege-selbststaendige/beitragssaetze-und-beitraege-selbststaendige/816202
                healthInsuranceAdditionalRate = 1.0;
                nursingCareInsurance = 2.55;
                nursingCareInsuranceWithPenalty = 2.8;
                break;
        }

        return {
            healthInsuranceAdditionalRate: healthInsuranceAdditionalRate,
            nursingCareInsurance: nursingCareInsurance,
            nursingCareInsuranceWithPenalty: nursingCareInsuranceWithPenalty
        }
    }

    /**
     * Return whether given record has to pay nursing care penalty.
     *
     * @param record
     *
     * @returns {boolean}
     */
    function hasToPayNursingCarePenalty(record) {
        return (record.age >= 23 && !record.hasChildren);
    }

    /**
     * Calculate contributions for given record.
     *
     * @param record
     *
     * @returns {{totalContribution, nursingCareInsuranceContribution, healthInsuranceContribution}|{totalContribution: number, nursingCareInsuranceContribution: number, healthInsuranceContribution: number}}
     */
    function calculate(record) {
        var rates = getRates(record.insuranceCompany);

        var nursingCareRate = hasToPayNursingCarePenalty(record) ? rates.nursingCareInsuranceWithPenalty : rates.nursingCareInsurance;

        var healthInsuranceRate = (record.withSickPay) ? healthInsuranceWithSickPayRate : healthInsuranceBaseRate;
        var healthInsuranceAdditionalRate = rates.healthInsuranceAdditionalRate;

        var income = record.income;
        income = Math.max(income, MINIMUM_INCOME);
        income = Math.min(income, MAXIMUM_INCOME);

        return calculateContributions(income, nursingCareRate, healthInsuranceRate, healthInsuranceAdditionalRate);
    }

    /**
     * Calculate contributions for given rates.
     *
     * @param income
     * @param nursingCareRate
     * @param healthInsuranceRate
     * @param healthInsuranceAdditionalRate
     *
     * @returns {{totalContribution: number, nursingCareInsuranceContribution: number, healthInsuranceContribution: number}}
     */
    function calculateContributions(income, nursingCareRate, healthInsuranceRate, healthInsuranceAdditionalRate) {
        var nursingCareInsuranceContribution = calculateContribution(income, nursingCareRate);
        var healthInsuranceContribution = calculateContribution(income, healthInsuranceRate) + calculateContribution(income, healthInsuranceAdditionalRate);

        return {
            totalContribution: round(healthInsuranceContribution + nursingCareInsuranceContribution),
            nursingCareInsuranceContribution: nursingCareInsuranceContribution,
            healthInsuranceContribution: healthInsuranceContribution
        };
    }

    /**
     *
     *
     * @param income
     * @param rate
     *
     * @returns {number}
     */
    function calculateContribution(income, rate) {
        var result = income * rate / 100;
        result = round(result);
        return result;
    }

    /**
     * There might be rounding problems in here as mentioned in http://stackoverflow.com/a/11832950/1824988
     *
     * @param result
     * @returns {number}
     */
    function round(result) {
        return Math.round(result * 100) / 100;
    }

    return calculate(record);
};

var healthInsurance = function (record) {

    /**
     * Return health insurance rates for a given health insurance company.
     *
     * Note that rates are returned as percentages, e.g. return value of 15.0 means 15% or 0.015.
     *
     * @param company
     *
     * @returns {{healthInsuranceWithSickPay: *, healthInsuranceWithoutSickPay: *, nursingCareInsurance: *, nursingCareInsuranceWithPenalty: *}}
     */
    function getRates(company) {
        var healthInsuranceWithSickPay;
        var healthInsuranceWithoutSickPay;
        var nursingCareInsurance;
        var nursingCareInsuranceWithPenalty;

        switch (company) {
            case 'tk':
                // https://www.tk.de/tk/versichert-als-selbststaendige/beitraege-selbststaendige/beitragssaetze-und-beitraege-selbststaendige/816202
                healthInsuranceWithSickPay = 15.6;
                healthInsuranceWithoutSickPay = 15.0;
                nursingCareInsurance = 2.55;
                nursingCareInsuranceWithPenalty = 2.8;
                break;
        }

        return {
            healthInsuranceWithSickPay: healthInsuranceWithSickPay,
            healthInsuranceWithoutSickPay: healthInsuranceWithoutSickPay,
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
        var healthInsuranceRate = rates.healthInsuranceWithoutSickPay;

        return calculateContributions(record.income, nursingCareRate, healthInsuranceRate);
    }

    /**
     * Calculate contributions for given rates.
     *
     * @param income
     * @param nursingCareRate
     * @param healthInsuranceRate
     *
     * @returns {{totalContribution: number, nursingCareInsuranceContribution: number, healthInsuranceContribution: number}}
     */
    function calculateContributions(income, nursingCareRate, healthInsuranceRate) {
        var nursingCareInsuranceContribution = calculateContribution(income, nursingCareRate);
        var healthInsuranceContribution = calculateContribution(income, healthInsuranceRate);

        return {
            totalContribution: healthInsuranceContribution + nursingCareInsuranceContribution,
            nursingCareInsuranceContribution: nursingCareInsuranceContribution,
            healthInsuranceContribution: healthInsuranceContribution
        };
    }

    /**
     * There might be rounding problems in here as mentioned in http://stackoverflow.com/a/11832950/1824988
     *
     * @param income
     * @param rate
     *
     * @returns {number}
     */
    function calculateContribution(income, rate) {
        var result = income * rate;
        result = Math.round(result) / 100;
        return result;
    }

    return calculate(record);
};

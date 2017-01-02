describe("healthInsurance", function () {
    var subject = healthInsurance;

    const MINIMUM_INCOME = 2231.25;

    it("should calculate health insurance contribution for minimum income", function () {
        var result = subject({
            income: MINIMUM_INCOME,
            age: 25,
            hasChildren: false,
            insuranceCompany: 'tk'
        });

        expect(result).toEqual({
            totalContribution: 397.17,
            nursingCareInsuranceContribution: 62.48,
            healthInsuranceContribution: 334.69
        });
    });

});

describe("healthInsurance", function () {
    var subject = healthInsurance;

    const MINIMUM_INCOME = 2231.25;

    describe("when earning minimum income", function() {

        it("should calculate health insurance contribution without sick pay", function () {
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

        it("should calculate health insurance contribution with sick pay", function () {
            var result = subject({
                income: MINIMUM_INCOME,
                age: 25,
                hasChildren: false,
                withSickPay: true,
                insuranceCompany: 'tk'
            });

            expect(result).toEqual({
                totalContribution: 410.55,
                nursingCareInsuranceContribution: 62.48,
                healthInsuranceContribution: 348.07
            });
        });

        it("should calculate health insurance contribution with children", function () {
            var result = subject({
                income: MINIMUM_INCOME,
                age: 25,
                hasChildren: true,
                insuranceCompany: 'tk'
            });

            expect(result).toEqual({
                totalContribution: 391.59,
                nursingCareInsuranceContribution: 56.90,
                healthInsuranceContribution: 334.69
            });
        });

        it("should calculate health insurance contribution younger than 23", function () {
            var result = subject({
                income: MINIMUM_INCOME,
                age: 22,
                hasChildren: false,
                insuranceCompany: 'tk'
            });

            expect(result).toEqual({
                totalContribution: 391.59,
                nursingCareInsuranceContribution: 56.90,
                healthInsuranceContribution: 334.69
            });
        });
    });

});

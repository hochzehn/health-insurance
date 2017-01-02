describe("healthInsurance", function () {
    var subject = healthInsurance;

    const MINIMUM_INCOME = 2231.25;
    const MAXIMUM_INCOME = 4350.00;

    var income;

    describe("when earning less than minimum income", function() {
        beforeEach(function() {
            income = MINIMUM_INCOME - 1000;
        });

        it("should calculate health insurance contribution without sick pay", function () {
            var result = subject({
                income: income,
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
                income: income,
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
                income: income,
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
                income: income,
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

    describe("when earning minimum income", function() {
        beforeEach(function() {
            income = MINIMUM_INCOME;
        });

        it("should calculate health insurance contribution without sick pay", function () {
            var result = subject({
                income: income,
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
                income: income,
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
                income: income,
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
                income: income,
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

    describe("when earning maximum income", function() {
        beforeEach(function() {
            income = MAXIMUM_INCOME;
        });

        it("should calculate health insurance contribution without sick pay", function () {
            var result = subject({
                income: income,
                age: 25,
                hasChildren: false,
                insuranceCompany: 'tk'
            });

            expect(result).toEqual({
                totalContribution: 774.30,
                nursingCareInsuranceContribution: 121.80,
                healthInsuranceContribution: 652.50
            });
        });

        it("should calculate health insurance contribution with sick pay", function () {
            var result = subject({
                income: income,
                age: 25,
                hasChildren: false,
                withSickPay: true,
                insuranceCompany: 'tk'
            });

            expect(result).toEqual({
                totalContribution: 800.40,
                nursingCareInsuranceContribution: 121.80,
                healthInsuranceContribution: 678.60
            });
        });

        it("should calculate health insurance contribution with children", function () {
            var result = subject({
                income: income,
                age: 25,
                hasChildren: true,
                insuranceCompany: 'tk'
            });

            expect(result).toEqual({
                totalContribution: 763.43,
                nursingCareInsuranceContribution: 110.93,
                healthInsuranceContribution: 652.50
            });
        });

        it("should calculate health insurance contribution younger than 23", function () {
            var result = subject({
                income: income,
                age: 22,
                hasChildren: false,
                insuranceCompany: 'tk'
            });

            expect(result).toEqual({
                totalContribution: 763.43,
                nursingCareInsuranceContribution: 110.93,
                healthInsuranceContribution: 652.50
            });
        });
    });

});

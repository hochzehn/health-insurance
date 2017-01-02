# health-insurance

Calculate health insurance contribution for self-employed workers in Germany.

## Installation

### Bower

    bower install --save health-insurance

## Usage

Include `bower_components/health-insurance/dist/health-insurance.min.js`.

    var record = {
        income: 1234.56,
        age: 25,
        hasChildren: false,
        withSickPay: true,
        insuranceCompany: 'tk'
    };
    
    var insuranceContributions = healthInsurance(record);
    console.log(insuranceContributions);

    /* Prints:
    {
        totalContribution: 397.17,
        nursingCareInsuranceContribution: 62.48,
        healthInsuranceContribution: 334.69
    }
    */

`record` is a container for these calculation options:

- `income`: _Monthly_ income relevant for health insurance tax calculation
- `age`: age in years
- `hasChildren`: `boolean` whether person has children (default `false`)
- `withSickPay`: `boolean` whether insurance includes sick pay (default `false`)
- `insuranceCompany`: `string` code of an insurance company (see below)

### Insurance companies

Supported insurance companies are

| Code    | Name                   | Website        | Rates description |
| ------- | ---------------------- | -------------- | ----------------- |
| `tk`    | Techniker Krankenkasse | [here][tk-web] | [here][tk-rates]  |

## Run tests

    bin/test.sh
    
Code coverage report can be found in `coverage/PhantomJS 2.1.1 (Linux 0.0.0)/index.html` (HTML) as well as `coverage/clover.xml` (Clover XML).

## Publish
    
    bin/dist/dist.sh

[tk-web]: https://www.tk.de/
[tk-rates]: https://www.tk.de/tk/versichert-als-selbststaendige/beitraege-selbststaendige/beitragssaetze-und-beitraege-selbststaendige/816202

const casual = require('casual-browserify');

const helpers = require('../helpers');

const birth_dt_provider = {
    birth_dt: function () {
        let fakeDate = casual.date('MM-DD-YYYY');
        let year = fakeDate.substr(6);

        if (year > 1970 && year < 2000) {
            return fakeDate;

        } else {
            let fixedDate = fakeDate.split('-', 3);
            fixedDate[2] = '1980';
            fixedDate = fixedDate[0] + '-' + fixedDate[1] + '-' + fixedDate[2];
            return fixedDate;
        }
    }
}
casual.register_provider(birth_dt_provider);

/**
 * States List Base on Snap Finance Knowledge Page: https://knowledge.snapfinance.com/Content/General/Products-by-State.htm
 * Sales Tax Types: https://confluence.snapfinance.com/pages/viewpage.action?spaceKey=AC&title=Sales+and+Lease+Tax+Rules
 */
const state_provider = {
    custom_state: function (product, enableTax) {

        let ricStates;
        let rtoStates;
        let sslStates;
        let slnStates;
        let tabStates;

        if (enableTax) {
            ricStates = ['California', 'Nevada', 'Pensilvania'];

            rtoStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Indiana', 'Iowa', 'Kansas',
                'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Mexico', 'New York',
                'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Utah',
                'Vermont', 'Washington', 'Washington', 'West Virginia', 'Wyoming', 'Virgin Islands'];

            sslStates = ['Alaska', 'Arkansas', 'Arizona', 'California', 'Delaware', 'Idaho', 'Kentucky', 'New Hampshire', 'New Mexico', 'Nevada', 'Missouri', 'Oregon', 'Pennsylvania', 'South Carolina', 'Utah', 'Virginia', 'Washintong', 'Wisconsin'];

            slnStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Delaware', 'Florida', 'Idaho', 'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Michigan', 'Minnesota', 'Mississippi',
                'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'North Dakota', 'Oklahoma', 'Oregon', 'Rhode Island', 'South Carolina',
                'South Dakota', 'Tennessee', 'Utah', 'Washington', 'Washington', 'Wisconsin'];
            
            tabStates = ['Alabama', 'Alaska', 'Arizona', 'District of Columbia', 'Florida', 'Indiana', 'Kansas','Louisiana','Michigan', 'Minnesota',
                'Mississippi', 'Montana','Nebraska','New Jersey', 'North Dakota', 'Tennessee', 'Virginia'];

        } else {
            /**
             * States with Snap Collect Sales Tax: Connecticut, Illinois, Pennsylvania, Texas, Virginia
             */
            ricStates = ['Pensilvania'];

            rtoStates = ['Connecticut', 'Illinois', 'Pennsylvania', 'Texas', 'Virginia'];

            sslStates = ['Pennsylvania', 'Virginia'];

            slnStates = ['Pennsylvania', 'Virginia'];

            tabStates = ['Virginia'];
        }

        switch (product) {
            case "RIC":
                return casual.populate_one_of(ricStates);

            case "RTO":
                return casual.populate_one_of(rtoStates);

            case "SSL":
                return casual.populate_one_of(sslStates);

            case "SLN":
                return casual.populate_one_of(slnStates);
            
            case "TAB":
                return casual.populate_one_of(tabStates);

            default:
                cy.log('Product Type no recognized: [' + product + ']');
                break;
        }
    }
}
casual.register_provider(state_provider);

casual.define('customer', function (product, salesTaxType) {
    //State store here because we are using this value for Search the ZipCode by State.
    //enableTax: True provide states with tax input box enable, FALSE provide states with disable input box
    const stateName = casual.custom_state(product, salesTaxType);
    console.log('stateName '+ stateName);
    return {
        first_name: casual.first_name,
        social_security_number: casual.integer(111111111, 999999999),
        birth_dt: casual.birth_dt,
        last_name: casual.last_name,
        email_1: casual.email,
        street_address: helpers.getStreetByState(stateName),
        aparmentOrSuite: "#1" || "#2" || "#3" || "#4",
        city: helpers.getCitytByState(stateName),
        state: stateName,
        state_abbreviation: helpers.getStateAbbreviationByName(stateName),
        zip_code: helpers.getZipCodeByState(stateName),
        years_at_current_residence: casual.integer(2, 5) + " Years" || "Under 1 Year" || "1 Year" || "5 or More Years",
        months_at_current_residence: casual.integer(0, 11).toString(),
        rent_or_own: "Rent" || "Own",
        drivers_license_numb: casual.integer(111111111, 999999999),
        reference1_first_name: casual.first_name,
        reference1_last_name: casual.last_name,
        reference1_mobile_number: casual.phone,
        reference2_first_name: casual.first_name,
        reference2_last_name: casual.last_name,
        reference2_mobile_number: casual.phone
    };
});

/**
 * This method provides States by Product Type and by Default only States that allows Sales Tax Enable
 */
const customer = function (product) {
    return casual.customer(product, true);
}

/**
 * This method provides Customer Faker with custom State, Street, City and Zip Code.
 */
const customerBySalesTaxes = function (product, isSalesTaxEnable) {
    let faker = casual.customer(product, isSalesTaxEnable);

    if (faker.state.length == 2) {
        faker.state = helpers.getStateNameByAbbreviation(state);
    }

    faker.street_address = helpers.getStreetByState(faker.state);
    faker.city = helpers.getCitytByState(faker.state);
    faker.zip_code = helpers.getZipCodeByState(faker.state);

    return faker;
}

/**
 * This method provides Customer Faker with custom State.
 */
const customerByState = function (product, state) {
    let faker = casual.customer(product, true);
    // Example: If State is 'TX' it will find the Full Name State 'Texas'
    if (faker.state.length == 2) {
        faker.state = helpers.getStateNameByAbbreviation(state);
    }

    faker.state = helpers.getStateNameByAbbreviation(state);
    faker.street_address = helpers.getStreetByState(state);
    faker.city = helpers.getCitytByState(state);
    faker.zip_code = helpers.getZipCodeByState(state);

    return faker;
}

/**
 * This method provides States By Product Type and Sales Tax Enable/Disable feature
 */
const customerTaxes = function (product, isSalesTaxEnable) {
    return casual.customer(product, isSalesTaxEnable);
}

module.exports.customer = customer;
module.exports.customerBySalesTaxes = customerBySalesTaxes;
module.exports.customerByState = customerByState;
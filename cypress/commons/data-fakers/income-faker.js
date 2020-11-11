const casual = require('casual-browserify');
const helpers = require('../helpers');

function getLastWeeklyPaydate(frequency) {
    switch (frequency) {
        case 'string:WEEKLY':
        case 'string:BI_WEEKLY':
        case 'string:SEMI_MONTHLY':
            var today = new Date();
            return helpers.formatDateIncome(today);
        case 'string:MONTHLY':
            var d = new Date();
            d.setDate(1);
            return helpers.formatDateIncome(d);
        case 'string:MONTHLY_WEEK':
            var d = new Date();
            d.setDate(1);
            // Get the first Monday in the month
            while (d.getDay() !== 1) {
                d.setDate(d.getDate() + 1);
            }
            return helpers.formatDateIncome(d);
    }
}

function getNextWeeklyPaydate(frequency) {
    switch (frequency) {
        case 'string:WEEKLY':
            var date = new Date();
            date.setDate(date.getDate() + 7);
            return helpers.formatDateIncome(date);
        case 'string:BI_WEEKLY':
        case 'string:SEMI_MONTHLY':
            var date = new Date();
            date.setDate(date.getDate() + 14);
            return helpers.formatDateIncome(date);
        case 'string:MONTHLY':
            var d = new Date();
            d.setDate(1);
            d.setMonth(d.getMonth()+1);
            return helpers.formatDateIncome(d);
        case 'string:MONTHLY_WEEK':
            var d = new Date();
            d.setDate(1);
            d.setMonth(d.getMonth()+1);
            // Get the first Monday in the month
            while (d.getDay() !== 1) {
                d.setDate(d.getDate() + 1);
            }
            return helpers.formatDateIncome(d);
        default:
            break;
    }
}

const pay_last_week_provider = {
    last_week: function () {
        const week = ["Last Week", "Next Week"];
        return casual.populate_one_of(week);
    }
}
casual.register_provider(pay_last_week_provider);

casual.define('income', (incomeType, freq) => {
    return {
        employer_name: casual.name,
        income_amt: casual.integer(1000, 2000),
        income_type: incomeType,
        frequency: freq,
        last_paid_dt: getLastWeeklyPaydate(freq),
        pay_date_meta: getNextWeeklyPaydate(freq),
        position_held: casual.short_description,
        start_dt: casual.date('MM/DD/2016'),
        phone: casual.phone,
        //One Page Application Fields
        pay_last_week: casual.last_week,
        random_int: casual.integer(1, 10)
    };
});

const income = (incomeType, freq) => {
    return casual.income(incomeType, freq);
}

module.exports.income = income;
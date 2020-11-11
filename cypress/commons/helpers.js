/**
 * Function the format any date specified.
 * @param {date} date Specify a date
 * @returns {string} with Format YYYY-MM-DD
 */
const formatDate = (date, format) => {//date, format
    var dateFormat = require('dateformat');
    let newDate = new Date(date);
    return dateFormat(new Date(newDate.getTime() - newDate.getTimezoneOffset() * -60000), format);
}

/**
 * Clearing Number Amount: Deletes Letters, Blank Spaces, Special Characters, 
 * Leave only Number with decimals
 */
const cleanNumber = (number) => {
    return number
        .replace('%', '') //Remove % Percentajes Characters
        .replace('$', '') //Remove Dolar Symbols
        .replace(',', '') //Remove Commas
        .replace('-', '')
        .replace(')', '')
        .replace('(', '')
        .replace(/[^0-9.]+/, '') //Remove Any Remain Letters
        .replace(' ', '') //Remove Blank Spaces
        ;
}

/**
 * Function that formats the date received as parameter into MM/DD/YYYY
 * @param {date} date Specify a date
 * @returns {date} with Format MM/DD/YYYY
 */
const formatDateIncome = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    return date = mm + '/' + dd + '/' + yyyy;
}

const getToday = () => {
    var dateFormat = require('dateformat');
    var date = new Date();
    return dateFormat(date, "mm-dd-yyyy");
}

const getRamdomNumber = () => {
    return Math.floor(Math.random() * 10000001);
}

const getLast4Digits = (text) => {
    return text.slice(text.length - 4);
}

/**
 * Zip Code by States provided by Page: http://www.structnet.com/instructions/zip_min_max_by_state.html
 * @param {String} stateName 
 */
var states = [
    { name: "Alaska", code: "AK", zipcode: "99518", street: "2751  Blackwell Street", city: "Anchorage" },
    { name: "Alabama", code: "AL", zipcode: "35203", street: "1528  Strother Street", city: "Birmingham" },
    { name: "Arkansas", code: "AR", zipcode: "72401", street: "2876  Edgewood Road", city: "Jonesboro" },
    { name: "Arizona", code: "AZ", zipcode: "85001", street: "4277  Hamill Avenue", city: "Phoenix" },
    { name: "California", code: "CA", zipcode: "94306", street: "2596  Rardin Drive", city: "Palo Alto" },
    { name: "Colorado", code: "CO", zipcode: "81212", street: "3781  Clover Drive", city: "Canon City" },
    { name: "Connecticut", code: "CT", zipcode: "06002", street: "2184  Airplane Avenue", city: "Bloomfield" },
    { name: "District of Columbia", code: "DC", zipcode: "20009", street: "464  Massachusetts Avenue", city: "Washington" },
    { name: "Delaware", code: "DE", zipcode: "19809", street: "4682  Columbia Road", city: "Holly Oak" },
    { name: "Florida", code: "FL", zipcode: "33881", street: "1867  Tetrick Road", city: "Winter Haven" },
    { name: "Georgia", code: "GA", zipcode: "31707", street: "2061  Private Lane", city: "Albany" },
    { name: "Hawaii", code: "HI", zipcode: "96797", street: "4877  Indiana Avenue", city: "Waipahu" },
    { name: "Iowa", code: "IA", zipcode: "50001", street: "3322  Joanne Lane", city: "Ackworth" },
    { name: "Idaho", code: "ID", zipcode: "83832", street: "559  Fantages Way", city: "Genesee" },
    { name: "Illinois", code: "IL", zipcode: "60963", street: "1714  Scenic Way", city: "Rossville" },
    { name: "Indiana", code: "IN", zipcode: "47408", street: "2522  Conaway Street", city: "Bloomington" },
    { name: "Kansas", code: "KS", zipcode: "66970", street: "3952  Dog Hill Lane", city: "Webber" },
    { name: "Kentucky", code: "KY", zipcode: "40003", street: "942  Roguski Road", city: "Bagdad" },
    { name: "Louisiana", code: "LA", zipcode: "70181", street: "3759  Ventura Drive", city: "New Orleands" },
    { name: "Massachusetts", code: "MA", zipcode: "02173", street: "4514  Hampton Meadows", city: "Lexington" },
    { name: "Maryland", code: "MD", zipcode: "21030", street: "3131  Marshall Street", city: "Cockeysville" },
    { name: "Maine", code: "ME", zipcode: "04101", street: "980  Retreat Avenue", city: "Portland" },
    { name: "Michigan", code: "MI", zipcode: "48075", street: "4028  Eagle Drive", city: "Southfield" },
    { name: "Minnesota", code: "MN", zipcode: "55001", street: "2801  Irish Lane", city: "Afton" },
    { name: "Mississippi", code: "MS", zipcode: "38039", street: "568  Rafe Lane", city: "Grand Junction" },
    { name: "Montana", code: "MT", zipcode: "59601", street: "4516  Meadow Drive", city: "Helena" },
    { name: "North Carolina", code: "NC", zipcode: "27609", street: "638  Rockford Mountain Lane", city: "Raleigh" },
    { name: "North Dakota", code: "ND", zipcode: "58078", street: "1299  Catherine Drive", city: "West Fargo" },
    { name: "Nebraska", code: "NE", zipcode: "68760", street: "938  Bungalow Road", city: "Niobrara" },
    { name: "New Hampshire", code: "NH", zipcode: "03101", street: "3158  Elliott Street", city: "Manchester" },
    { name: "New Jersey", code: "NJ", zipcode: "08046", street: "1041  Whiteman Street", city: "Willingboro" },
    { name: "New Mexico", code: "NM", zipcode: "87001", street: "1973  Dola Mine Road", city: "Algodones" },
    { name: "Nevada", code: "NV", zipcode: "88901", street: "2755  Smith Road", city: "The Lakes" },
    { name: "New York", code: "NY", zipcode: "10014", street: "1224  Briercliff Road", city: "New York" },
    { name: "Ohio", code: "OH", zipcode: "44266", street: "622  Briarhill Lane", city: "Ravenna" },
    { name: "Oklahoma", code: "OK", zipcode: "74727", street: "2057  Simpson Square", city: "Boswell" },
    { name: "Oregon", code: "OR", zipcode: "97232", street: "4835  Gateway Road", city: "Portland" },
    { name: "Pennsylvania", code: "PA", zipcode: "19044", street: "572  Spring Avenue", city: "Horsham" },
    { name: "Puerto Rico", code: "PR", zipcode: "00925", street: "952 Eider Cty Club", city: "Rio Piedras" },
    { name: "Rhode Island", code: "RI", zipcode: "02801", street: "512  Hudson Street", city: "Adamsville" },
    { name: "South Carolina", code: "SC", zipcode: "29325", street: "3716  Brown Avenue", city: "Clinton" },
    { name: "South Dakota", code: "SD", zipcode: "57070", street: "1062  Elsie Drive", city: "Viborg" },
    { name: "Tennessee", code: "TN", zipcode: "37921", street: "1145  Corbin Branch Road", city: "Knoxville" },
    { name: "Texas", code: "TX", zipcode: "75207", street: "2677  Oakridge Lane", city: "Dallas" },
    { name: "Utah", code: "UT", zipcode: "84104", street: "2135  Buck Drive", city: "Salt Lake City" },
    { name: "Virginia", code: "VA", zipcode: "24011", street: "3337  Maxwell Farm Road", city: "Roanoke" },
    { name: "Virgin Islands", code: "VI", zipcode: "00840", street: "141 Stokes Rest", city: "Frederiksted" },     
    { name: "Vermont", code: "VT", zipcode: "05701", street: "2430  Hardman Road", city: "Rutland" },
    { name: "Washington", code: "WA", zipcode: "98503", street: "3095  Boone Crockett Lane", city: "Lacey" },
    { name: "Wisconsin", code: "WI", zipcode: "53085", street: "1934  Joseph Street", city: "Sheboygan Falls" },
    { name: "West Virginia", code: "WV", zipcode: "26003", street: "3661  Froe Street", city: "Wheeling" },
    { name: "Wyoming", code: "WY", zipcode: "82930", street: "2277  Archwood Avenue", city: "Evanston" }
]

/**
 * @return {String} Returns The State Name Corresponding to the State Abbreviation. 
 * Example: AL -> Alabama 
 */
const getStateNameByAbbreviation = (abbreviation) => {
    try {
        let country = states.find(el => el.code === abbreviation);
        return country['name'];
    } catch (err) {
        console.log("State Abbreviation not found or missing: " + err.message);
    }
};

/**
 * @return {String} Returns The State Name Corresponding to the State Abbreviation. 
 * Example:  Alabama -> AL 
 */
const getStateAbbreviationByName = (name) => {
    try {
        let country = states.find(el => el.name === name);
        return country['code'];
    } catch (err) {
        console.log("State Name not found or missing: " + err.message);
    }
};

/**
 * @return {String} Returns a Zip Code Corresponding to the State Provided 
 * Example: Wyoming -> 82001
 */
const getZipCodeByState = (state) => {
    try {
        // Example: If State is 'TX' it will find the Full Name State 'Texas'
        if (state.length == 2) {
            state = getStateNameByAbbreviation(state);
        }

        let country = states.find(el => el.name === state);
        return country['zipcode'];
    } catch (err) {
        console.log("State Abbreviation not found or missing: " + err.message);
    }
};

/**
 * @return {String} Returns a Street Corresponding to the State Provided 
 * Example: Florida -> 1867  Tetrick Road
 */
const getStreetByState = (state) => {
    try {
        // Example: If State is 'TX' it will find the Full Name State 'Texas'
        if (state.length == 2) {
            state = getStateNameByAbbreviation(state);
        }

        let country = states.find(el => el.name === state);
        return country['street'];
    } catch (err) {
        console.log("Street not found or missing: " + err.message);
    }
};

/**
 * @return {String} Returns a City Corresponding to the State Provided 
 * Example: Florida -> Winter Haven
 */
const getCitytByState = (state) => {
    try {
        // Example: If State is 'TX' it will find the Full Name State 'Texas'
        if (state.length == 2) {
            state = getStateNameByAbbreviation(state);
        }

        let country = states.find(el => el.name === state);
        return country['city'];
    } catch (err) {
        console.log("City not found or missing: " + err.message);
    }
};

exports.formatDate = formatDate;
exports.cleanNumber = cleanNumber;
exports.formatDateIncome = formatDateIncome;
exports.getToday = getToday;
exports.getRamdomNumber = getRamdomNumber;
exports.getLast4Digits = getLast4Digits;
exports.getStateNameByAbbreviation = getStateNameByAbbreviation;
exports.getZipCodeByState = getZipCodeByState;
exports.getStreetByState = getStreetByState;
exports.getCitytByState = getCitytByState;
exports.getStateAbbreviationByName = getStateAbbreviationByName;
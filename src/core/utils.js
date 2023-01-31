// Logger
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info";

// Filtered Values
export function filterByField(array, field) {
    const filteredArray = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const value = element[field];

        // Insert into the filtered array using the name of the field
        filteredArray.push({[field]: value});
    }
    return filteredArray;
}
export function filterByFields(array, fields) {
    const filteredArray = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const values = {};
        for (let index = 0; index < fields.length; index++) {
            const field = fields[index];
            values[field]= element[field];
        }
        filteredArray.push(values);
    }
    return filteredArray;
}

export function isOneLineText(text) {
    return !/\r|\n/.test(text);
}
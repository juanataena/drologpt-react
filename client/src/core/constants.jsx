// APP CONSTANTS
export const APP_DEFAULT_ICON = 'cog-alt';

// URL CONSTANTS
export const URL_HOME = window.location.href;
export const URL_PARTNERS_SELECTOR_END = `?callBackURL=${URL_HOME}&callBackAppName=Deploy+Global+Config`;

// CONSOLE LOG ELEMENTS
export const textTemplate = 'font-weight: bold; color: #7ebf99;';
export const textBlack = 'color: black;font-weight: normal;';
export const textBlue = 'font-weight: normal; color: #0000b773;';

// ALGORITHM SELECTOR
export const algorithms = [
    {label:'HS256', value:'HS256'},
    {label:'HS384', value:'HS384'},
    {label:'HS512', value:'HS512'},
    {label:'RS256', value:'RS256'},
    {label:'RS384', value:'RS384'},
    {label:'RS512', value:'RS512'},
    {label:'ES256', value:'ES256'},
    {label:'ES384', value:'ES384'},
    {label:'ES512', value:'ES512'}
    //
    // {label:'PS256', value:'PS256'},
    // {label:'PS384', value:'PS384'}
];

// ALGORITHM SELECTOR
export const operations = [
    {label:'Sign', value:'sign'},
    {label:'Validate', value:'validate'}
];

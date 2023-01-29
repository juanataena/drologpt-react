var request = require('request');

// Scrap the data from the given url using the selector 
export const readValueFromWebsite = (url, selector) => {
    return new Promise((resolve, reject) => {


        var options = {
          'method': 'GET',
          'url': url,
          'headers': {
            'Cookie': 'meteored_app_banner=0'
          }
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
        });
        

        resolve(35);
    });
}

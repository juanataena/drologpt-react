import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  host: 'smtp.dreamhost.com',
  port: 587,
  secure: false,
  auth: {
    user: 'juan.andres@morenorub.io',
    pass: 'P1u1m1s1nu!',
  }
});
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  
export const imapConfig = {
    user: 'juan.andres@morenorub.io',
    password: 'P1u1m1s1nu!',
    host: 'imap.dreamhost.com',
    port: 993,
    tls: true,
  };
  
export const extractInfoBTC = (text) => {
    console.log(text);
    // const BTCKeys = text.match(/^BINANCE.*BTC[ ]*/gm);
    const BTCKeys = text.match(/=BINANCE.*BTC]/gm);
    const BTCKeysCleanSpaces = [];
    const BTCKeysCleanBinance = [];
    const BTCKeysWithSlash = [];

    // Remove spaces
    if (BTCKeys) {

      BTCKeys.forEach(BTCKey => {
          BTCKeysCleanSpaces.push(BTCKey.split(" ")[0]);
      });
      console.log(BTCKeysCleanSpaces);
      
      // Remove Binance
      BTCKeysCleanSpaces.forEach(BTCKey => {
          // BTCKeysCleanBinance.push(BTCKey.split("BINANCE:")[1]);
          BTCKeysCleanBinance.push(BTCKey.split("=BINANCE%3A")[1]);
      });
      console.log(BTCKeysCleanBinance);
  
      // Add medium slash before BTC
      BTCKeysCleanBinance.forEach(BTCKey => {
        const BTCKeyWithSlash = BTCKey.split("BTC")[0] + '/BTC';
        BTCKeysWithSlash.push(BTCKeyWithSlash);
    });
    }
  console.log(BTCKeysWithSlash);
  
    return BTCKeysWithSlash;
}

export const sendResultsEmail = (who, results) => {


  var mailOptions = {
    from: 'juan.andres@morenorub.io',
    to: process.env.NOTIFICATION_EMAILS,
    subject: `[freqtrade] - ${who} Deploy Successful`,	
    html: results
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export const sendNoResultsEmail = (who, results) => {

  var mailOptions = {
    from: 'juan.andres@morenorub.io',
    to: process.env.NOTIFICATION_EMAILS,
    subject: `[freqtrade] - ${who} Deploy Failed`,	
    html: results
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
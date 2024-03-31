const ema = require('exponential-moving-average');

//-----------------------Function to calculate Exponential Moving Average------------------------------


function calculateEMA(data, ndaysEMA) {

    let emaValues = ema(data,ndaysEMA)
    return emaValues;
  }

module.exports ={calculateEMA}
const ema = require('exponential-moving-average');

//-----------------------Function to calculate Exponential Moving Average------------------------------


function calculateEMA(data, ndaysEMA) {

  let emaValues = []; 
  let EMAValues = ema(data,ndaysEMA);
  
  for(let value in EMAValues){
      emaValues.push(Number(EMAValues[value]))
  }
    return emaValues;
  }

module.exports ={calculateEMA}
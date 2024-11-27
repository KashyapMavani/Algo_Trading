//-----------------------Function to calculate Simple Moving Average------------------------------

function calculateSMA(data, ndays) {
    const sma = [];

    if (data.length < ndays) {
      console.log(`Not enough data points to calculate ${length}-day SMA`);
      return smaValues;
  }

    for (let i = ndays - 1; i < data.length; i++) {
      const window = data.slice(i - ndays + 1, i + 1);
      const average = window.reduce((sum, price) => sum + price, 0) / ndays;
      // const average = data.reduce((sum, price) => sum + price, 0) / ndays;
      sma.push(average);
    }
    return sma;
  }
module.exports = {calculateSMA};
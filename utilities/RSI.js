function calculateRSI(closingPrices, period = 14) {
    if (closingPrices.length < period) {
      throw new Error("The list of closing prices must be longer than the period.");
    }
  
    // Calculate daily price changes
    const priceChanges = closingPrices.slice(1).map((price, index) => price - closingPrices[index]);
  
    // Separate gains and losses
    const gains = priceChanges.map(change => (change > 0 ? change : 0));
    const losses = priceChanges.map(change => (change < 0 ? -change : 0));
  
    // Calculate the average gain and loss for the initial period
    let avgGain = gains.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
    let avgLoss = losses.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
  
    // Initialize an array to hold RSI values
    const rsiValues = [];
  
    // Calculate RSI for the first period
    let rs = avgGain / avgLoss || 0;
    let rsi = 100 - 100 / (1 + rs);
    rsiValues.push(rsi);
  
    // Calculate RSI for the remaining periods
    for (let i = period; i < closingPrices.length - 1; i++) {
      const currentGain = gains[i];
      const currentLoss = losses[i];
  
      // Update the average gain and loss using the smoothing technique
      avgGain = ((avgGain * (period - 1)) + currentGain) / period;
      avgLoss = ((avgLoss * (period - 1)) + currentLoss) / period;
  
      // Calculate RSI
      rs = avgGain / avgLoss || 0;
      rsi = 100 - 100 / (1 + rs);
  
      rsiValues.push(rsi);
    }
  
    return rsiValues;
  }  
module.exports = { calculateRSI };
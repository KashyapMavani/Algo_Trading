function detectRSIDivergence(prices, timestamps, rsiValues, options = {}) {
    // Default options matching TradingView's defaults
    const {
        leftLookback = 5,      // Pivot Lookback Left
        rightLookback = 5,     // Pivot Lookback Right
        rangeLower = 5,        // Min of Lookback Range
        rangeUpper = 60,       // Max of Lookback Range
        plotBull = true,       // Plot Regular Bullish
        plotBear = true,       // Plot Regular Bearish
        plotHiddenBull = true,// Plot Hidden Bullish
        plotHiddenBear = true // Plot Hidden Bearish
    } = options;

    if (prices.length !== timestamps.length || prices.length !== rsiValues.length) {
        throw new Error('Prices, timestamps, and RSI values arrays must be of equal length');
    }

    // Find pivot high
    function findPivotHigh(arr, leftBars, rightBars, index) {
        const start = Math.max(0, index - leftBars);
        const end = Math.min(arr.length - 1, index + rightBars);
        const value = arr[index];

        for (let i = start; i <= end; i++) {
            if (i !== index && arr[i] > value) {
                return false;
            }
        }
        return true;
    }

    // Find pivot low
    function findPivotLow(arr, leftBars, rightBars, index) {
        const start = Math.max(0, index - leftBars);
        const end = Math.min(arr.length - 1, index + rightBars);
        const value = arr[index];

        for (let i = start; i <= end; i++) {
            if (i !== index && arr[i] < value) {
                return false;
            }
        }
        return true;
    }

    // Check if bars since last condition is within range
    function isInRange(barsSince) {
        return barsSince >= rangeLower && barsSince <= rangeUpper;
    }

    const divergences = [];
    let lastPivotLowIdx = -1;
    let lastPivotHighIdx = -1;
    let lastPivotLowPrice = null;
    let lastPivotHighPrice = null;
    let lastPivotLowRSI = null;
    let lastPivotHighRSI = null;

    // Scan for divergences
    for (let i = leftLookback; i < prices.length - rightLookback; i++) {
        const pivotLow = findPivotLow(rsiValues, leftLookback, rightLookback, i);
        const pivotHigh = findPivotHigh(rsiValues, leftLookback, rightLookback, i);

        // Regular Bullish Divergence
        if (pivotLow && plotBull && lastPivotLowIdx !== -1) {
            const barsSince = i - lastPivotLowIdx;
            if (isInRange(barsSince)) {
                // Price: Lower Low, RSI: Higher Low
                if (prices[i] < lastPivotLowPrice && rsiValues[i] > lastPivotLowRSI) {
                    divergences.push({
                        type: 'bullish',
                        timestamp: timestamps[i],
                        price: prices[i],
                        rsi: rsiValues[i],
                        prevTimestamp: timestamps[lastPivotLowIdx],
                        prevPrice: lastPivotLowPrice,
                        prevRSI: lastPivotLowRSI
                    });
                }
            }
        }

        // Hidden Bullish Divergence
        if (pivotLow && plotHiddenBull && lastPivotLowIdx !== -1) {
            const barsSince = i - lastPivotLowIdx;
            if (isInRange(barsSince)) {
                // Price: Higher Low, RSI: Lower Low
                if (prices[i] > lastPivotLowPrice && rsiValues[i] < lastPivotLowRSI) {
                    divergences.push({
                        type: 'hidden_bullish',
                        timestamp: timestamps[i],
                        price: prices[i],
                        rsi: rsiValues[i],
                        prevTimestamp: timestamps[lastPivotLowIdx],
                        prevPrice: lastPivotLowPrice,
                        prevRSI: lastPivotLowRSI
                    });
                }
            }
        }

        // Regular Bearish Divergence
        if (pivotHigh && plotBear && lastPivotHighIdx !== -1) {
            const barsSince = i - lastPivotHighIdx;
            if (isInRange(barsSince)) {
                // Price: Higher High, RSI: Lower High
                if (prices[i] > lastPivotHighPrice && rsiValues[i] < lastPivotHighRSI) {
                    divergences.push({
                        type: 'bearish',
                        timestamp: timestamps[i],
                        price: prices[i],
                        rsi: rsiValues[i],
                        prevTimestamp: timestamps[lastPivotHighIdx],
                        prevPrice: lastPivotHighPrice,
                        prevRSI: lastPivotHighRSI
                    });
                }
            }
        }

        // Hidden Bearish Divergence
        if (pivotHigh && plotHiddenBear && lastPivotHighIdx !== -1) {
            const barsSince = i - lastPivotHighIdx;
            if (isInRange(barsSince)) {
                // Price: Lower High, RSI: Higher High
                if (prices[i] < lastPivotHighPrice && rsiValues[i] > lastPivotHighRSI) {
                    divergences.push({
                        type: 'hidden_bearish',
                        timestamp: timestamps[i],
                        price: prices[i],
                        rsi: rsiValues[i],
                        prevTimestamp: timestamps[lastPivotHighIdx],
                        prevPrice: lastPivotHighPrice,
                        prevRSI: lastPivotHighRSI
                    });
                }
            }
        }

        // Update pivot points
        if (pivotLow) {
            lastPivotLowIdx = i;
            lastPivotLowPrice = prices[i];
            lastPivotLowRSI = rsiValues[i];
        }
        if (pivotHigh) {
            lastPivotHighIdx = i;
            lastPivotHighPrice = prices[i];
            lastPivotHighRSI = rsiValues[i];
        }
    }

    return divergences;
}

module.exports = {detectRSIDivergence};
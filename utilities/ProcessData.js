const { calculateSMA } = require('./SMA');
const { calculateEMA } = require('./EMA');
const { TimeStampCoverter } = require('./TimeStampConverter');
const { SMA_EMA_Algo } = require('./SMA_EMA_Algo');
const { LIVE_SMA_EMA_Algo } = require('./LIVE_SMA_EMA_ALGO');

async function processDataAndRunAlgo(Data) {

    let OpenValues = [];
    let CloseValues = [];
    let HighValues = [];
    let LowValues = [];
    let TimeStamp =[];

    setTimeout(() => {
        const { Open, Close, High, Low } = Data; // destructuring Data object

        //------- storing TimeStamp values in array----------------------------------------------
        for (const key in Open) {
            const value = TimeStampCoverter(key);
            TimeStamp.push(value);
        }

        //------- storing Open values in array----------------------------------------------
        for (const key in Open) {
            const value = Open[key];
            OpenValues.push(value);
        }

        //------- storing Close values in array----------------------------------------------
        for (const key in Close) {
            const value = Close[key];
            CloseValues.push(value);
        }

        //------- storing High values in array----------------------------------------------
        for (const key in High) {
            const value = High[key];
            HighValues.push(value);
        }

        //------- storing Low values in array----------------------------------------------
        for (const key in Low) {
            const value = Low[key];
            LowValues.push(value);
        }

        const ndaysSMA = 15;
        const ndaysEMA = 5;
        const smaSeries = calculateSMA(CloseValues, ndaysSMA);
        const emaSeries = calculateEMA(CloseValues, ndaysEMA);

        SMA_EMA_Algo(smaSeries, emaSeries, TimeStamp);
        // LIVE_SMA_EMA_Algo(smaSeries, emaSeries, TimeStamp)

    }, 3000);
}

module.exports = {processDataAndRunAlgo};
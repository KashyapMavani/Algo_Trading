const { calculateSMA } = require('./SMA');
const { calculateEMA } = require('./EMA');
const { TimeStampCoverter } = require('./TimeStampConverter');
const { SMA_EMA_Algo } = require('../Algorithms/SMA_EMA_Algo');
const { LIVE_SMA_EMA_Algo } = require('../Algorithms/LIVE_SMA_EMA_ALGO');
const { EMA_Algo } = require('../Algorithms/EMA(5)_Algo');
const { calculateRSI } = require('./RSI');
const { RSI_Algo } = require('../Algorithms/RSI_Algo');
const { calculateSMA200 } = require('./SMA200');
const { detectRSIDivergence } = require('../Algorithms/RSI_Divergence');
// const  {detectRSIDivergence} = require('../Algorithms/expRSIDivergence');

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

//------------------------Interval & Period--------------//

        const ndaysSMA = 15;
        const SMA200 = 200;
        const ndaysEMA = 5;
        const period = 14;

//------------------------Calculating Values--------------//


        // const smaSeries = calculateSMA(CloseValues, ndaysSMA);
        // const smaSeries200 = calculateSMA200(CloseValues, SMA200); // The difference between the number of closing values passed and SMA values generated will always be 199.
        // const emaSeries = calculateEMA(CloseValues, ndaysEMA);
        const RSI_Values = calculateRSI(CloseValues,period); //the difference between the number of closing values and RSI values generated will be equal to the period used for the RSI calculation (e.g., 14).
        // const divergences = calculateRSIDivergence(CloseValues, RSI_Values);
        //------------------------Tailed Values--------------//
        
        // const smaSeries200_Tailed = smaSeries200.slice(-50); 
        const RSI_Values_Tailed = RSI_Values.slice(-400); // -75 values for 5 min 2 day , -300 values for 5 min 5 day
        const Close_Values_Tailed = CloseValues.slice(-400); // -75 values for 5 min 2 day , -300 values for 5 min 5 day
        const TimeStamp_Tailed = TimeStamp.slice(-400); // -75 values for 5 min 2 day , -300 values for 5 min 5 day 
        
        //------------------------Consoling values--------------//
        
        // console.log(RSI_Values.length);
        // console.log(CloseValues.length);
        
        
        // console.log(smaSeries_Tailed);
        // console.log(OpenValues); // total 75 values for 5 min 1 day
        // console.log(CloseValues); // total 75 values for 5 min 1 day
        // console.log(HighValues); // total 75 values for 5 min 1 day
        // console.log(LowValues); // total 75 values for 5 min 1 day
        // console.log(smaSeries); // total 71 values for 5 min 1 day
        
        // console.log(smaSeries200_Tailed);
        // console.log(emaSeries) // total 71 values for 5 min 1 day
        // console.log(RSI_Values_Tailed); // total 61 values for 5 min 1 day
        // console.log(Close_Values_Tailed);
        // console.log(TimeStamp_Tailed);




// ------------------CALLING ALGORITHMS---------------------------------//


        // SMA_EMA_Algo(smaSeries, emaSeries, TimeStamp);
        // LIVE_SMA_EMA_Algo(smaSeries, emaSeries, TimeStamp)
        // EMA_Algo(CloseValues,OpenValues,HighValues, LowValues, emaSeries, TimeStamp)
        // RSI_Algo(RSI_Values_Tailed, TimeStamp_Tailed);
        // const divergences = calculateRSIDivergence(Close_Values_Tailed, RSI_Values_Tailed);
        const divergences = detectRSIDivergence(Close_Values_Tailed,TimeStamp_Tailed, RSI_Values_Tailed);
        console.log(divergences);

    }, 3000);
}

module.exports = {processDataAndRunAlgo};
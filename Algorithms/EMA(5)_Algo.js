const { sendMessage } = require('../Tele-Bot/bot');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function EMA_Algo(CloseValues,OpenValues,HighValues,LowValues, emaSeries, TimeStamp){

    // let LsmaSeries = [];
    // let LemaSeries = [];
    // let LTimeStamp = [];

    // for(let i = 1;i < 4; i++){
    //     LsmaSeries.push(smaSeries[smaSeries.length-4+i])
    //     LemaSeries.push(emaSeries[emaSeries.length-4+i])
    //     LTimeStamp.push(TimeStamp[TimeStamp.length-4+i])
    // }
    // console.log(LsmaSeries)
    // console.log(LemaSeries)
    // console.log(LTimeStamp)

    for(let i = 0; i < emaSeries.length-2; i++){

// For Bullish

        if (
            (emaSeries[i] <= OpenValues[i+4]) &
            (emaSeries[i+1] >= HighValues[i+1+4]) & (LowValues[i+1+4] < LowValues[i+4]) &
            (emaSeries[i+2] > OpenValues[i+2+4] & HighValues[i+2+4] > HighValues[i+4] & emaSeries[i+2] < CloseValues[i+2+4]) & 
            (LowValues[i+1+4] < LowValues[i+2+4]) & 
            (OpenValues[i+4] > HighValues[i+1+4] & CloseValues[i+2+4] > HighValues[i+4]) 
        ) 
        // emaSeries[i] <= HighValues[i+4] & emaSeries[i+1] >= HighValues[i+1+4] & emaSeries[i+2] <= HighValues[i+2+4] & HighValues[i+2+4] > HighValues[i+4] & LowValues[i+1+4] < LowValues[i+2+4])
        {
            
            // sendMessage(`Bullish Market.
            //     From : `+ String(HighValues[i+2+4])+ '\nTime : ' + String(TimeStamp[i+1+1+4])
            // )
            console.log(`Bullish Market.
                From : `+ String(HighValues[i+2+4])+ '\nTime : ' + String(TimeStamp[i+1+1+4]));
            console.log();
            await sleep(1000);
        }

        // if (emaSeries[i] <= HighValues[i+4] & emaSeries[i+1] >= HighValues[i+1+4] & emaSeries[i+2] <= HighValues[i+2+4] & HighValues[i+2+4] > HighValues[i+4] & LowValues[i+1+4] < LowValues[i+2+4]){
            
        //     sendMessage(`Bullish Market.
        //         From : `+ String(HighValues[i+2+4])+ '\nTime : ' + String(TimeStamp[i+1+1+4])
        //     )
        //     console.log(`Bullish Market.
        //         From : `+ String(HighValues[i+2+4])+ '\nTime : ' + String(TimeStamp[i+1+1+4]));
        //     console.log();
        //     await sleep(1000);
        // }

// For Bearish
        if(emaSeries[i] >= LowValues[i+4] & emaSeries[i+1] <= LowValues[i+1+4] & emaSeries[i+2] >= LowValues[i+2+4] & LowValues[i+2+4] < LowValues[i+4] & HighValues[i+1+4] > HighValues[i+2+4]){
           
            sendMessage(`Bearish Market.
                From : `+ String(LowValues[i+2+4]) +'\nTime : '+ String(TimeStamp[i+1+1+4])
            )
            console.log(`Bearish Market.
                From : `+ String(LowValues[i+2+4]) +'\nTime : '+ String(TimeStamp[i+1+1+4]));
            console.log();
            await sleep(1000);
            
        }

    }

}

module.exports = { EMA_Algo };
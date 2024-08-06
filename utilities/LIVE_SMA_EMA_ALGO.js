const { sendMessage } = require('../Tele-Bot/bot')
require('dotenv').config();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function LIVE_SMA_EMA_Algo(smaSeries, emaSeries, TimeStamp){

    let LsmaSeries = [];
    let LemaSeries = [];
    let LTimeStamp = [];

    for(let i = 1;i < 4; i++){
        LsmaSeries.push(smaSeries[smaSeries.length-4+i])
        LemaSeries.push(emaSeries[emaSeries.length-4+i])
        LTimeStamp.push(TimeStamp[TimeStamp.length-4+i])
    }
    console.log(LsmaSeries)
    console.log(LemaSeries)
    console.log(LTimeStamp)

    for(let i = 1; i < 4; i++){

// For Bullish
        if (LsmaSeries[i] > LemaSeries[i] & LemaSeries[i+1] > LsmaSeries[i+1]){
            
            sendMessage(`Bullish Market.
                From : `+ String(LsmaSeries[i+1])+ '\nTime : ' + String(LTimeStamp[i+1])
            )
            console.log(`Bullish Market.
                From : `+ String(LsmaSeries[i+1])+ '\nTime : ' + String(LTimeStamp[i+1]));
            console.log();
            await sleep(1000);
           
        }

// For Bearish
        if(LemaSeries[i] > LsmaSeries[i] & LsmaSeries[i+1] > LemaSeries[i+1]){
           
            sendMessage(`Bearish Market.
                From : `+ String(LemaSeries[i+1]) +'\nTime : '+ String(LTimeStamp[i+1])
            )
            console.log(`Bearish Market.
                From : `+ String(LemaSeries[i+1]) +'\nTime : '+ String(LTimeStamp[i+1]));
            console.log();
            await sleep(1000);
            
        }

    }

}

module.exports = { LIVE_SMA_EMA_Algo };
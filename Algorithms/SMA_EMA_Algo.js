const { sendMessage } = require('../Tele-Bot/bot')
require('dotenv').config();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function SMA_EMA_Algo(smaSeries, emaSeries, TimeStamp){

    for(let i = 0; i < emaSeries.length-1; i++){

// For Bullish
        if (smaSeries[i] > emaSeries[i+10] & emaSeries[i+1+10] > smaSeries[i+1]){
            
            sendMessage(`Bullish Market.
                From : `+ String(smaSeries[i+1])+ '\nTime : ' + String(TimeStamp[i+1+10+4])
            )
            console.log(`Bullish Market.
                From : `+ String(smaSeries[i+1])+ '\nTime : ' + String(TimeStamp[i+1+10+4]));
            console.log();
            await sleep(1000);
           
        }

// For Bearish
        if(emaSeries[i+10] > smaSeries[i] & smaSeries[i+1] > emaSeries[i+1+10]){
           
            sendMessage(`Bearish Market.
                From : `+ String(emaSeries[i+1+10]) +'\nTime : '+ String(TimeStamp[i+1+10+4])
            )
            console.log(`Bearish Market.
                From : `+ String(emaSeries[i+1+10]) +'\nTime : '+ String(TimeStamp[i+1+10+4]));
            console.log();
            await sleep(1000);
            
        }

    }

}

module.exports = { SMA_EMA_Algo };
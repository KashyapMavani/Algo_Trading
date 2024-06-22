const { sendMessage } = require('./Tele-Bot/bot')
require('dotenv').config();

function SMA_EMA_Algo(smaSeries, emaSeries, TimeStamp){

    // console.log(`Elements in SMA are ${smaSeries.length}`);
    // console.log(`Elements in EMA are ${emaSeries.length}`);
    // console.log(`Elements in TimeStamp are ${TimeStamp.length}`);
    // console.log();
    for(let i = 0; i < emaSeries.length-1; i++){

// For Bullish
        if (smaSeries[i] > emaSeries[i+10] & emaSeries[i+1+10] > smaSeries[i+1]){
            sendMessage(`Bullish Market.
                From : `+ String(smaSeries[i+1])+ '\nTime : ' + String(TimeStamp[i+1+10+4])
            )
            // console.log("Bullish Market.");
            // console.log("From : " + String(smaSeries[i+1])+ '\nTime : ' + String(TimeStamp[i+1+10+4]))
            // console.log();
            // send_message(" Bullish Market.\n" + "From : " + str(smaSeries[i+1])+ '\nTime : ' + str(TimeStamp[i+1]))
        }

// For Bearish
        if(emaSeries[i+10] > smaSeries[i] & smaSeries[i+1] > emaSeries[i+1+10]){
            sendMessage(`Bearish Market.
                From : `+ String(emaSeries[i+1+10]) +'\nTime : '+ String(TimeStamp[i+1+10+4]))
            // console.log("Bearish Market.")
            // console.log("From : " + String(emaSeries[i+1+10]) +'\nTime : '+ String(TimeStamp[i+1+10+4]))
            // console.log();
            // send_message(" Bearish Market.\n"+ "From : " + str(emaSeries[i+1]) +'\nTime : '+ str(TimeStamp[i+1]))
        }
    }

}

module.exports = { SMA_EMA_Algo };
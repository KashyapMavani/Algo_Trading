const { sendMessage } = require('../Tele-Bot/bot')
require('dotenv').config();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function RSI_Algo(RSI_Values, TimeStamp){

    for(let i = 0; i < RSI_Values.length-1; i++){

// For Bullish
        if (RSI_Values[i] < 30){
            
            // sendMessage(`Bullish Market.
            //     From : `+ String(CloseValues[i+4]) + '\nTime : ' + String(TimeStamp[i+1+10+4]) + 
            //         "With RSI Value : " + String(RSI_Values[i])
            // )
            // console.log(`Bullish Market.
            //     From : `+ String(CloseValues[i]) + '\nTime : ' + String(TimeStamp[i]) + 
            //         " With RSI Value : " + String(RSI_Values[i]));
            console.log(`Bullish Market.
                        From : `+ String(TimeStamp[i]) + 
                            " With RSI Value : " + String(RSI_Values[i]));
            console.log();
            await sleep(1000);
           
        }

// For Bearish
        if(RSI_Values[i] > 70){
           
            // sendMessage(`Bearish Market.
            //     From : `+ String(emaSeries[i+1+10]) +'\nTime : '+ String(TimeStamp[i+1+10+4])
            // )
            // console.log(`Bearish Market.
            //     From : `+ String(CloseValues[i]) + '\nTime : ' + String(TimeStamp[i]) + 
            //         " With RSI Value : " + String(RSI_Values[i]));
            console.log(`Bearish Market.
                        From : ` + String(TimeStamp[i]) + 
                            " With RSI Value : " + String(RSI_Values[i]));
            console.log();
            await sleep(1000);
            
        }

    }

}

module.exports = { RSI_Algo };
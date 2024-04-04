const WebSocket = require('ws');
const { calculateSMA } = require('./SMA');
const { calculateEMA } = require('./EMA');
const { TimeStampCoverter } = require('./TimeStampConverter')

let Data;
let OpenData;
let CloseData;
let HighData;
let LowData;
const OpenValues = [];
const CloseValues = [];
const HighValues = [];
const LowValues = [];
const TimeStamp =[];


const ws = new WebSocket("ws://localhost:3000/"); // Replace with your server URL and port

ws.onopen = function() {
    console.log("WebSocket connection opened!");
    // You can send data to the server now
    ws.send("Hello from JavaScript!");
};


ws.onmessage = async function(event) {
    let message = await event.data;
    message = await JSON.parse(message)
    Data = message
    // console.log(Data);
};

setTimeout(

    ()=>{

        const {Open, Close, High, Low} = Data; // destructuring Data object

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
        console.log(smaSeries);
        console.log(emaSeries);
        console.log(TimeStamp);
        console.log(OpenValues);
        console.log(CloseValues);
        console.log(HighValues);
        console.log(LowValues);
    }
    ,2000)


// ws.onerror = function(error) {
//     console.error("WebSocket error:", error);
// };

// ws.onclose = function(event) {
//     const reason = event.reason;
//     console.log("WebSocket connection closed:", reason);
// };

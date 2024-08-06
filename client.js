const WebSocket = require('ws');
const { processDataAndRunAlgo } = require('./utilities/ProcessData')
 
let Data;


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
    await processDataAndRunAlgo(Data)
};

// ws.onerror = function(error) {
//     console.error("WebSocket error:", error);
// };

// ws.onclose = function(event) {
//     const reason = event.reason;
//     console.log("WebSocket connection closed:", reason);
// };

import asyncio
import websockets
import pandas as pd
import yfinance as yf
import time


async def handler(websocket):
    async for message in websocket:
        print(f"Received message from client: {message}")

        SYMBOL = "^NSEI" # any symbol from yahoo finance "^NSEI","^NSEBANK","BTC-USD"
        while True:
            data = yf.download(SYMBOL,period ="2d",interval = "5m")
            print(data)
            data = data.to_json()
        
            await websocket.send(data)
            min = 5 # 1440 minutes <- 1d ,  
            time.sleep(60 * min)

start_server = websockets.serve(handler, "localhost", 3000)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

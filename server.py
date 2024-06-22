import asyncio
import websockets
import pandas as pd
import yfinance as yf

#---------------------------------------------------------------

# SYMBOL = "^NSEI" # any symbol from yahoo finance
# data = yf.download(SYMBOL,period ="3d",interval = "15m")
# data = data.to_json()

#---------------------------------------------------------------


async def handler(websocket):
    async for message in websocket:
        print(f"Received message from client: {message}")

        SYMBOL = "^NSEI" # any symbol from yahoo finance "^NSEI","^NSEBANK"
        data = yf.download(SYMBOL,period ="200d",interval = "1d")
        # print(data)
        data = data.to_json()
        
        await websocket.send(data)

start_server = websockets.serve(handler, "localhost", 3000)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');


// Replace with your actual bot TOKEN
// const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TOKEN = '6387199944:AAGhfpZ8pnt5kUW74ANNlyYJ8rjg9Ri4fv0';
// const chatId = process.env.TELEGRAM_chatId;

// Create a new Telegram bot instance
const bot = new TelegramBot(TOKEN,{polling: true});
// bot.on("message", (msg) => {
//     console.log(msg);
// });

// ----------------------------------------------

// // Function to handle incoming messages

// function handleUpdate(message) {
//   const chatId = message.chat.id;
//   const text = message.text;

//   // Simple echo functionality (replace with your desired logic)
//   bot.sendMessage(chatId, text);
// }

// ----------------------------------------------------

// Function to handle incoming messages

function sendMessage(message) {
    const chatId = 494298168;
    bot.sendMessage(chatId, message)
      .then(() => {
        console.log('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }

module.exports = {sendMessage};


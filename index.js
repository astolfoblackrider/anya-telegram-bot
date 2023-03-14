require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const PIN = process.env.PIN;
const bot = new TelegramApi(token, {polling: true});
let pinCode = '';
const chatStartKeyboard = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'about', callback_data: '/about'}],
                [{text: 'kus', callback_data: '/kus'}],
                [{text: 'for Alice', callback_data: '/video'}],
                [{text: 'game', callback_data: '/startgame'}],
                [{text: 'stiker set', callback_data: '/stikerset'}],
            ]
        })
}
const chatPinKeybard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}],
            [{text: 'enter', callback_data: 'enter'}]
        ]
    })
}

const  letGame = () => {
    bot.sendMessage(chatId, 'throw dice')
    bot.sendDice(chatId, {emoji: '🎲'})
}

const start = () => {
    
   bot.setMyCommands([
        {command:'/start', description:'first greeting'},
        {command:'/menu', description: 'open menu'},
        {command:'/keyboard', description: 'open keyboard'}

    ], )

    bot.on('message', async (msg) => {

        const text = msg.text;
        const chatId = msg.chat.id;
        const userName = msg.from.first_name;
        console.log(msg)
        
        if (text === '/start') {
             bot.sendMessage(chatId, `Hello ${userName}, anyaBot greeting you`)
            return bot.sendSticker(chatId, 'CAACAgIAAxkBAAIFUGPt9DXfBhNV6c2xvBO6IXvgX4T-AAJIGgAC-juRSsO_fgQ2R6IWLgQ')
        }

        if (text === '/menu'){
            return bot.sendMessage(chatId,'menu', chatStartKeyboard)
        }

        if (msg.hasOwnProperty('dice') === true && msg.dice.emoji === '🎲' ) {
            await bot.sendMessage(chatId, 'throw dice')
            const botScore = await bot.sendDice(chatId, {emoji: '🎲'})


            if (botScore.dice.value < msg.dice.value){
                 bot.sendMessage(chatId, `${userName}, you win`)
                 return bot.sendSticker(chatId,'CAACAgIAAxkBAAIFZWPt9VfnBA70A1xLIEC1fa8sJX3pAAKXGwACKqSISn-P3xwM72siLgQ')
            }

            if (botScore.dice.value > msg.dice.value){
                bot.sendMessage(chatId,`${userName}, you loose`)
                return bot.sendSticker(chatId, 'CAACAgIAAxkBAAIFX2Pt9P_BQrVxnO4RQdPQP6_64emfAAL3GgACtAyJSmrAfl9lFUK2LgQ')
            }

            else {
                bot.sendMessage(chatId, 'DRAW')
                return bot.sendSticker(chatId, 'CAACAgIAAxkBAAIFYWPt9SEqoYHNmpoYihWomSga_w3RAAKWHAACgJ2ISnpFIj5WMT7YLgQ')
            }
            
        }

    if (text === '/keyboard'){
            return bot.sendMessage(chatId,'keyboard', chatPinKeybard) 
        }
        else
        bot.sendMessage(chatId, 'unkown command, please try again')
    })

    
    bot.on('callback_query',   async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const userName = msg.from.first_name;
        console.log(msg)

        if (data === '/about'){
            bot.sendMessage(chatId,`Heloo ${userName}, it is anya chat bot. `)
            bot.sendSticker(chatId,'CAACAgIAAxkBAAIFUGPt9DXfBhNV6c2xvBO6IXvgX4T-AAJIGgAC-juRSsO_fgQ2R6IWLgQ')
        }

        if (data === '/kus'){
            return bot.sendSticker(chatId, 'CAACAgIAAxkBAAIFVWPt9GuMcu9EXniT-frXglYJ5JckAALrGgACgUjpS6ga_mU9cgjBLgQ')
        }

        if (data === '/startgame'){
            letGame()
        }
        
        if (data === '/video'){
            return bot.sendVideo(chatId, 'BAACAgUAAxkBAAIFNmPt8Oqa4V4cpBf6rdSTV-b0Su_mAAIHCAACh7ppVyj_Bhg7XFZ5LgQ')
        }
        
        if (data === '/stikerset'){
        
        }
    })

    bot.on('callback_query',    (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const userName = msg.from.first_name;
        console.log(msg)
        

    if (data != 'enter'){
        pinCode += data
    }
    if (data === 'enter' && pinCode === PIN){
        pinCode = ''
        bot.sendMessage(chatId, 'pin ok')

    }
    
    console.log(pinCode)
    

       
        
    })
}

start()



const {Client, GatewayIntentBits, Emoji} = require("discord.js");
require('dotenv/config')

var weatherOut;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})



client.on('ready', () => {
    console.log('Bot is ready.')
})

client.on('messageCreate', message => {
    if (message.content == 'ping') {
        message.reply('pong')
    }
    else if (message.content == 'weather'){
        FetchWeather('6167865 ')
        console.log(weatherOut)
        message.reply('Weather')
    }
})

function FetchWeather(_cityName) {
    var key = '25222afb74d1e9f508fe4c2a71c21d12'
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + _cityName + '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log(data)
    })
    .catch(function() {
        // catch any errors
    });
}


client.login(process.env.TOKEN)
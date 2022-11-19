require('dotenv/config')

const {Client, GatewayIntentBits} = require("discord.js");

var OWMapiKey = '25222afb74d1e9f508fe4c2a71c21d12'

const prefix = '/'

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

    if(!message.content.startsWith(prefix) || message.author.bot) 
    {
        //return;
    }

    if (message.content == 'ping') {
        message.reply('pong')
    }
    else if (message.content == 'weather'){
        _cityName = 'Cape Town, South Africa'
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + _cityName + '&appid=' + OWMapiKey)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            message.channel.send(data.weather[0].description + data.name)
        })
        .catch(function() {
            message.channel.send('Could not retieve Weather Data for ' + _cityName)
        });
    }
})

function GetDescription(d) {
    return d.weather[0].description;
}


client.login(process.env.TOKEN)
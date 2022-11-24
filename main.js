require('dotenv/config')

const {Client, GatewayIntentBits, Collection} = require("discord.js");

const fs = require('node:fs');
const path = require('node:path');
const { fileURLToPath } = require('node:url');

const OWMapiKey = '25222afb74d1e9f508fe4c2a71c21d12'
const prefix = '!'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot online.')
})

client.on('messageCreate', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) 
    {
        return;
    }
    if (message.content == '!ping') {
        message.reply('pong')
    }
    else if (message.content == '!weather'){
        message.channel.send('Weather.')
    }

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Cape,Town,South,Africa' + '&appid=' + OWMapiKey)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            message.channel.send('First: ' + data.weather[0].description)
        })
        .catch(function() {
            message.channel.send('Could not retrieve Weather Data for ' + args[0])  
        });

    if(client.commands.has(command)) {
        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.channel.send('An error occured: ' + error)
        }
    }else{
        console.log("Doesn't Exist.")
    }

    console.log(args)
})


client.login(process.env.TOKEN)
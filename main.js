//Find a way to not commit node_modules to git
require('dotenv/config')

const {Client, GatewayIntentBits, Collection} = require("discord.js");

const fs = require('node:fs');
const path = require('node:path');

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
    console.log('Bot online.');
})

client.on('messageCreate', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) 
    {
        return;
    }
    if (message.content == '!ping') {
        message.reply('pong');
    }
    else if (message.content == '!weather'){
        message.channel.send('Weather.');
    }

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    if(client.commands.has(command)) {
        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.channel.send('An error occured: ' + error);
        }
    }else{
        message.channel.send('That command does not exist. Try another one.');
    }
})


client.login(process.env.TOKEN)
key = '25222afb74d1e9f508fe4c2a71c21d12';
var result;
const returnTypes = ['description', 'desc', 'temp', 'temperature', ]
var dataRaw;


module.exports = {
	name: 'weather',
    description: 'Weather Command',
    execute(message, args){
        
        if (!args[0] == undefined && !returnTypes.includes(args[0].toLowerCase()))
        {
            result = args[0];
        }

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + args + '&appid=' + key)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            message.channel.send(data.weather[0].description);
        })
        .catch(function() {
            message.channel.send('Could not retrieve Weather Data for ' + args)
        });
    }
};
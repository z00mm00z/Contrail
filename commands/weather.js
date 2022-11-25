key = '25222afb74d1e9f508fe4c2a71c21d12';
var request;
const returnTypes = ['description', 'desc', 'temp', 'temperature', ]
var dataRaw;


module.exports = {
	name: 'weather',
    description: 'Weather Command',
    execute(message, args){
        
        if (args[0] != undefined && !returnTypes.includes(args[0].toLowerCase()))
        {
            request = args.join(' ');
            console.log(request);
        }

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + request + '&appid=' + key)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            message.channel.send(data.weather[0].description);
            console.log(data.name)
        })
        .catch(function() {
            message.channel.send('Could not retrieve Weather Data for ' + request)
        });
    }
};

/*
{
  coord: { lon: 18.4232, lat: -33.9258 },
  weather: [
    { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' }
  ],
  base: 'stations',
  main: {
    temp: 288.97,
    feels_like: 288.04,
    temp_min: 288.08,
    temp_max: 289.87,
    pressure: 1022,
    humidity: 55
  },
  visibility: 10000,
  wind: { speed: 5.66, deg: 170 },
  clouds: { all: 20 },
  dt: 1669319229,
  sys: {
    type: 2,
    id: 2073005,
    country: 'ZA',
    sunrise: 1669260622,
    sunset: 1669311353
  },
  timezone: 7200,
  id: 3369157,
  name: 'Cape Town',
  cod: 200
}
*/
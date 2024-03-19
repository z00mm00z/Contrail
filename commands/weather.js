require('dotenv/config')

var request, requestType, result;
const requestTypes = ['description', 'desc', 'temp', 'temperature', ]

module.exports = {
	name: 'weather',
    description: 'Weather Command',
    execute(message, args){
        if (args[0] != undefined && !requestTypes.includes(args[0].toLowerCase()))  {
            request = args.join(' ');
            requestType = 'desc';
        } else if (requestTypes.includes(args[0].toLowerCase())) {
            request = args.join(' ');
            requestType = request.split(' ')[0];
            request = request.replace(requestType + ' ', '');
        }

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + request + '&appid=' + process.env.API_KEY)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            if (requestType == requestTypes[0] || requestType == requestTypes[1]) {
              result = 'Conditions in ' + data.name + ': **' + data.weather[0].description + ' with ' + (data.wind.speed).toString() + ' m/s winds in a ' + degToCompass(data.wind.deg).toString() +'ern direction.**';
            } else if (requestType == requestTypes[2] || requestType == requestTypes[3]) {
              result = 'Temperature in ' + data.name + ': **' + (data.main.temp - 273.15).toFixed(0) + ' °C**';
            }
            message.channel.send(result);
        })
        .catch(function(error) {
            message.channel.send('Could not retrieve Weather Data for "' + request + '".');
            console.log(error);
        });
    }
};

//Returns a wind direction from an angle in degrees
function degToCompass(angle) {
  _directions = ["North","North Northeast","Northeast","East Northeast","East","East Southeast", "Southeast", "South Southeast","South","South Southwest","South West","West Southwest","West","West Northwest","Northwest","North Northwest"];
  return _directions[Math.round(angle / 45) % 8];
}



/*

This is just an example of the data openweathermap returns.

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
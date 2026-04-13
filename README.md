# Contrail
A Discord Weather Bot in Javascript. Uses the [OpenWeatherMap API](https://openweathermap.org) to get weather data. 

Weather data can be fetched with the command `!weather [query type] [query]`.

If the query type is given as "desc" or "description" the bot returns a brief summary of the current weather in the location queried. If it's given as "temp" or "temperature" the bot will only return the current temperature at the location queried. If the query type cannot be identified, the first argument is included in the query and the bot returns a description by default.  

## Prerequisites:
- Node.js
- Discord.js
- npm

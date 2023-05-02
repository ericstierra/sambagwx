$(document).ready(function () {
    var city;
    var name;

    $(".chatbot-messages").append("<div class='message'><p>Hello! I'm Sambag, your weather forecasting chatbot. What's your name?</p></div>");

    $("#name-submit").click(function () {
        name = $("#name-input").val();
        if (name != "") {
            $(".chatbot-messages").append("<div class='message'><p>Hi, " + name + "!</p></div>");
            askCity();
        }
    });

    function askCity() {
        $(".chatbot-messages").append("<div class='message'><p>How can I help you today? You can type <span class='description'>'/weathernow city'</span> to get the current weather, or <span class='description'>'/forecast city'</span> to get the forecast for the next three days. What city are you interested in?</p></div>");
        $(".chatbot-input").html("<input type='text' placeholder='Enter a city' id='city-input'><button id='city-submit'>Submit</button>");
    }

    $(document).on("click", "#city-submit", function () {
        city = $("#city-input").val();
        if (city != "") {
            var inputText = $("#city-input").val().toLowerCase().trim();
            if (inputText.startsWith("/forecast ")) {
                var cityName = inputText.replace("/forecast ", "");
                $(".chatbot-messages").append("<div class='message'><p>Let me check the forecast for " + cityName + ".</p></div>");
                getForecast(cityName);
            } else if (inputText.startsWith("/weathernow ")) {
                var cityName = inputText.replace("/weathernow ", "");
                $(".chatbot-messages").append("<div class='message'><p>Let me check the weather for " + cityName + ".</p></div>");
                getWeather(cityName);
            } else {
                $(".chatbot-messages").append("<div class='message'><p>Sorry, I didn't understand. Please enter either <span class='description'>'/forecast' or '/weathernow'</span> followed by a city name to get the weather or forecast.</p></div>");
            }
        }
    });

    function getWeather(city) {
        var apiKey = "3b903020d6e2acd2ce742ca91c71dfa1";
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        $.get(apiUrl, function (data) {
            var description = data.weather[0].description;
            var temp = data.main.temp;
            var feelsLike = data.main.feels_like;
            var windSpeed = data.wind.speed * 3.6; // Convert wind speed from m/s to km/h
            var precipitation = data.rain ? data.rain["1h"] : 0;

            temp = Math.round(temp - 273.15);
            feelsLike = Math.round(feelsLike - 273.15);
            windSpeed = Math.round(windSpeed);
            precipitation = Math.round(precipitation);

            $(".chatbot-messages").append("<div class='message'><p>The weather in " + city + " is <span class='description'>" + description + "</span> with a temperature of <span class='temp'>" + temp + "°C</span>. It feels like <span class='feels-like'>" + feelsLike + "°C</span>. The wind speed is <span class='wind-speed'>" + windSpeed + " km/h</span>. The chance of precipitation in the last hour is <span class='precipitation'>" + precipitation + " mm</span>.</p></div>");
            $(".chatbot-messages").append("<div class='message'><p>Do you want to search for weather in another location?</p></div>");
            $(".chatbot-input").show();
            $(".chatbot-input").html("<button id='yes'>Yes</button><button id='no'>No</button>");

            $("#yes").click(function () {
                $(".chatbot-messages").append("<div class='message'><p>Okay, which city would you like to know the weather for?</p></div>");
                $(".chatbot-input").html("<input type='text' placeholder='Enter a city' id='city-input'><button id='city-submit'>Submit</button>");
                $("#city-submit").off("click");
            });

            $("#no").click(function () {
                $(".chatbot-messages").append("<div class='message'><p>Okay, thanks for using Sambag, your weather forecasting chatbot. Have a great day!</p></div>");
                $(".chatbot-input").html("");
            });

        });
    }


    function getForecast(city) {
        var apiKey = "3b903020d6e2acd2ce742ca91c71dfa1";
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

        $.get(apiUrl, function (data) {
            var forecast = data.list.slice(0, 3); // Get the first three items in the list, which represent the next three days
            var city = data.city.name;

            $(".chatbot-messages").append("<div class='message'><p>The weather forecast for " + city + " is:</p></div>");
            forecast.forEach(function (item) {
                var date = new Date(item.dt * 1000);
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Manila' };
                var formattedDate = date.toLocaleString('en-US', options);
                var description = item.weather[0].description;
                var temp = Math.round(item.main.temp - 273.15);
                var feelsLike = Math.round(item.main.feels_like - 273.15);

                $(".chatbot-messages").append("<div class='message'><p>" + formattedDate + ": <span class='description'>" + description + "</span> with a temperature of <span class='temp'>" + temp + "°C</span>. It feels like <span class='feels-like'>" + feelsLike + "°C</span>.</p></div>");
            });

            $(".chatbot-messages").append("<div class='message'><p>Do you want to search for weather in another location?</p></div>");
            $(".chatbot-input").show();
            $(".chatbot-input").html("<button id='yes'>Yes</button><button id='no'>No</button>");

            $("#yes").click(function () {
                $(".chatbot-messages").append("<div class='message'><p>Okay, which city would you like to know the weather for?</p></div>");
                $(".chatbot-input").html("<input type='text' placeholder='Enter a city' id='city-input'><button id='city-submit'>Submit</button>");
                $("#city-submit").off("click");
            });

            $("#no").click(function () {
                $(".chatbot-messages").append("<div class='message'><p>Okay, thanks for using Sambag, your weather forecasting chatbot. Have a great day!</p></div>");
                $(".chatbot-input").html("");
            });

        });
    }





});

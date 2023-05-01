$(document).ready(function () {
    var city;
    var name;

    // Initial message
    $(".chatbot-messages").append("<div class='message'><p>Hello! I'm Sambag, your weather forecasting chatbot. What's your name?</p></div>");

    // When user submits their name
    $("#name-submit").click(function () {
        name = $("#name-input").val();
        if (name != "") {
            $(".chatbot-messages").append("<div class='message'><p>Hi, " + name + "!</p></div>");
            askCity();
        }
    });

    // Ask for city
    function askCity() {

        $(".chatbot-messages").append("<div class='message'><p>Which city would you like to know the weather for?</p></div>");
        $(".chatbot-input").html("<input type='text' placeholder='Enter a city' id='city-input'><button id='city-submit'>Submit</button>");

    }

    function updateTime() {
        const date = new Date();
        const pstOffset = -8 * 60; // PST is 8 hours behind UTC
        const pstDate = new Date(date.getTime() + pstOffset * 60 * 1000);
        const timeString = pstDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('time-display').textContent = `PST: ${timeString}`;
    }

    // call updateTime every second to update the time display
    setInterval(updateTime, 1000);

    // Attach event listener for the city submit button
    $(document).on("click", "#city-submit", function () {
        city = $("#city-input").val();
        if (city != "") {
            $(".chatbot-messages").append("<div class='message'><p>Let me check the weather for " + city + ".</p></div>");
            getWeather(city);
        }
    });

    // Get weather information from API
    function getWeather(city) {
        // Your API key
        var apiKey = "3b903020d6e2acd2ce742ca91c71dfa1";
        // API URL with city and API key
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        // Make API request
        $.get(apiUrl, function (data) {
            // Weather information
            var description = data.weather[0].description;
            var temp = data.main.temp;
            var feelsLike = data.main.feels_like;

            // Convert temperature to Celsius
            temp = Math.round(temp - 273.15);
            feelsLike = Math.round(feelsLike - 273.15);

            // Display weather information
            $(".chatbot-messages").append("<div class='message'><p>The weather in " + city + " is <span class='description'>" + description + "</span> with a temperature of <span class='temp'>" + temp + "°C</span>. It feels like <span class='feels-like'>" + feelsLike + "°C</span>.</p></div>");

            // Ask if user wants to search for another location
            $(".chatbot-messages").append("<div class='message'><p>Do you want to search for weather in another location?</p></div>");

            // Show the input container
            $(".chatbot-input").show();

            // Append the buttons
            $(".chatbot-input").html("<button id='yes'>Yes</button><button id='no'>No</button>");

            // When user clicks "Yes"
            $("#yes").click(function () {
                $(".chatbot-messages").append("<div class='message'><p>Okay, which city would you like to know the weather for?</p></div>");
                $(".chatbot-input").html("<input type='text' placeholder='Enter a city' id='city-input'><button id='city-submit'>Submit</button>");

                // Clear previous click events from the submit button
                $("#city-submit").off("click");

                /* // When user submits a city
                 $("#city-submit").click(function () {
                     city = $("#city-input").val();
                     if (city != "") {
                         $(".chatbot-messages").append("<div class='message'><p>Let me check the weather for " + city + ".</p></div>");
                         getWeather(city);
                     }
                 }); */
            });

            // When user clicks "No"
            $("#no").click(function () {
                $(".chatbot-messages").append("<div class='message'><p>Okay, thanks for using Sambag, your weather forecasting chatbot. Have a great day!</p></div>");
                $(".chatbot-input").html("");
            });

        });
    }
});

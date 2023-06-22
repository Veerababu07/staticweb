async function getWeather(latitude, longitude){
    try {
        let request = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=f76906f6e7ebc68e41290f0f0082a00b"
        let weatherData = await (await fetch(request)).json()

        document.querySelector(".weather-card").style.animation="ease-out 600ms popup";
        setTimeout(function (){
                document.querySelector(".weather-card").style.animation="none";
        }, 600
        )

        document.getElementById("temp").innerText = (parseFloat(weatherData.main.temp) - 273.15).toFixed(2) + " °C"
        document.getElementById("humidity").innerText = weatherData.main.humidity + "%"
        document.getElementById("weather").innerText = weatherData.weather[0].description

    } catch (error) {
        console.log("Could not get temperature")
        console.log(latitude)
        console.log(longitude)
    }
}

async function getLocation(){
    try{
    let place = document.getElementById("place").value
    let request = "https://api.openweathermap.org/geo/1.0/direct?q="+place+"&appid=f76906f6e7ebc68e41290f0f0082a00b"
    let location = await (await fetch (request)).json()

    document.getElementById("place").value = ""

    // If the "state" for a city is not found
    if(location[0].state == undefined)
        location[0].state = location[0].name
    document.getElementById("city").innerText = location[0].name + ", " + location[0].state + ", " + location[0].country 

    let latitude = location[0].lat
    let longitude = location[0].lon
    
    getWeather(latitude, longitude)
    }
    catch(error){
        document.getElementById("city").innerText = "Unknown Location"
        console.log("Could not fetch location")
    }
}

window.addEventListener("keydown", function (event) {  
        if (event.key== "Enter") {
                event.preventDefault();
                document.querySelector(".btn").classList.add("active");
        }
});

window.addEventListener("keyup", function (event) {  
        if (event.key== "Enter") {
                event.preventDefault();
                document.querySelector(".btn").classList.remove("active");
                // document.querySelector(".parent").style.background = "url(./assets/lightning.jpg)"
                // document.querySelector(".parent").style.background = "url(./assets/clear.jpg)"
                // document.querySelector(".parent").style.background = "url(./assets/imageedit_1_9445920538.png)"
                getLocation();
        }
});

setCurrentDate = () => {
    const d = new Date();
    switch(d.getMonth()){
        case 0: month = "Jan"
                break 
        case 1: month = "Feb"
                break 
        case 2: month = "Mar"
                break 
        case 3: month = "April"
                break 
        case 4: month = "May"
                break 
        case 5: month = "June"
                break 
        case 6: month = "July"
                break 
        case 7: month = "Aug"
                break 
        case 8: month = "Sept"
                break 
        case 9: month = "Oct"
                break 
        case 10: month = "Nov"
                break 
        case 11: month = "Dec"
                break 
    }
    let date = (d.getDate()).toString()
    document.getElementById("date").innerText = date + " " + month;
}

setCurrentDate()

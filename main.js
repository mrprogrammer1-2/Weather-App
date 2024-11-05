const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const error404 = document.querySelector(".not-found");
const weatheBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

search.addEventListener("click", getWeather)
document.querySelector(".search-box input").addEventListener("keydown", (e)=> {
    if (e.key == "Enter") {
        getWeather()
    }
})

function getWeather() {
    const city = document.querySelector(".search-box input").value;
    if (!city) {
        return
    }

    error404.style.display = "none";
    weatheBox.style.display = ""
    weatherDetails.style.display = ""
    error404.classList.remove("fadeIn")
    
    const APIKey = '0ceeb609558e9db42f1d1d1f1f9748e2';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response=> response.json()).then(data=>{
        if (data.cod == '404') {
            error404.style.display = "block";
            weatheBox.style.display = "none"
            weatherDetails.style.display = "none"
            container.style.height = "400px"
            error404.classList.add("fadeIn")
            return
        }
        container.style.height = "590px"

        const image = document.querySelector(".weather-box img")
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        switch (data.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png'
                break
            case 'Clouds':
                image.src = 'images/cloud.png'
                break
            case 'Rain':
                image.src = 'images/rain.png'
                break
            case 'Snow':
                image.src = 'images/snow.png'
                break
            case 'Haze':
                image.src = 'images/mist.png'
                break
            default:
                image.src = ""
        }

        weatheBox.classList.add("fadeIn")
        weatherDetails.classList.add("fadeIn")

        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`
        description.innerHTML = `${data.weather[0].description}`
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`
    } )
}
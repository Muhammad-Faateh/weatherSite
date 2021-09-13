const temperature = document.getElementById('temperature')
const weatherIcon = document.getElementById('weathericon')
const country = document.getElementById('country')
const date_time = document.getElementById('date_time')
const searchButton = document.getElementById('searchButton')
const errormessage = document.getElementById('errormessage')

const getDATE = () => {
    let months = ['JAN', 'FEB', 'MARCH', 'April', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    let newDate = new Date();

    let date = newDate.getDate()
    let month = months[newDate.getMonth()]
    let year = newDate.getFullYear()

    let hours = ''
    let periods = 'PM'
    if (newDate.getHours() > 12) {
        hours = newDate.getHours() - 12
        periods = 'PM'
    } else {
        hours = newDate.getHours()
        periods = 'AM'
    }
    let minutes = newDate.getMinutes()
    if (minutes < 10) {
        minutes = '0' + minutes
    }



    return `${date}/${month}/${year} | ${hours}:${minutes} ${periods}`

}

const getInfo = async() => {
    try {
        let searchValue = document.getElementById('searchValue').value
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=c73ffd9ae1a5ed74acb288cd8eb126c1`
        let res = await fetch(url)
        let realData = await res.json()

        if (searchValue === '') {
            errormessage.innerText = 'Please enter city name.'
            temperature.innerHTML = ''
            weatherIcon.innerHTML = ''
            country.innerHTML = ''

        } else {
            let weather = realData.weather.map(data => data.main).toString()
            errormessage.innerText = ''
            temperature.innerHTML = `${realData.main.temp}&deg;C`
            country.innerHTML = `${realData.sys.country} , ${realData.name}`
            console.log(weather);
            if (weather === 'Smoke') {
                weatherIcon.innerHTML = '<i class="fas fa-smog" style="color: #738276 ;"></i>'
            } else if (weather === 'Sunny') {
                weatherIcon.innerHTML = '<i class="fas fa-sun" style="color: #FFCC33 ;"></i>'
            } else if (weather === 'Rain') {
                weatherIcon.innerHTML = '<i class="fas fa-cloud-rain" style="color: blue ;"></i>'
            } else if (weather === 'Clear') {
                weatherIcon.innerHTML = '<i class="fas fa-cloud-sun" style="color: black ;"></i>'
            } else if (weather === 'Clouds') {
                weatherIcon.innerHTML = '<i class="fas fa-cloud" style="color: #738276 ;"></i>'
            } else {
                weatherIcon.innerHTML = 'Icon not available'
            }


        }

    } catch (error) {
        temperature.innerHTML = ''
        country.innerHTML = ''
        weatherIcon.innerHTML = ""
        errormessage.innerText = "Error: This city doesn't exist."
    }

}

date_time.innerHTML = getDATE()
searchButton.addEventListener('click', getInfo)
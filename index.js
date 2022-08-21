var str = "america";
let nolocationvisited = 0;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
setInterval(() => {

    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    let hour = time.getHours();
    let min = time.getMinutes();
    let ampm = `AM`;
    if (hour >= 12) {
        ampm = `PM`;

    }
    if (hour > 12) {
        hour -= 12;
    }
    if (min < 10) {
        min = `0${min}`;
    }
    document.getElementById(`maintime`).innerHTML = `<span id="miantimemag">${hour}:${min}</span> <span id="ampm">${ampm}</span>
    </span>`;
    document.getElementById(`maindate`).innerHTML = ` <p>${date} ${months[month]} , ${days[day]}</p>`;

}, 1000);

document.getElementById("getlocation").addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {

        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("getbutton").click();
    }
});

document.getElementById(`getbutton`).addEventListener("click", () => {
    str = document.getElementById("getlocation").value;

    console.log(str);
    rishi(str);

})


let max, min, icon1, sunset1, sunreise1, humidity1, dt1;


const apikey = process.env.APIKEY;
let latitude, longitude;
function getwdata() {

    navigator.geolocation.getCurrentPosition((success) => {


        latitude = success.coords.latitude;
        longitude = success.coords.longitude;


        console.log(latitude);
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${apikey}`).then(res => res.json()).then(data => {
            showdata(data);
        })
        console.log(longitude);
        fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apikey}`).then(response => response.json()).then(data => {
            changecity(data[0].name);
        })


    })
}

function rishi(str) {

    // fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${str}&limit=10&appid=${apikey}`).then(reser => reser.json()).then(datal => {
    fetch(`https://nominatim.openstreetmap.org/search/${str}?format=json&addressdetails=1&limit=1`).then(res => res.json()).then(datal => {
        console.log(datal);

        latitude = datal[0].lat;
        longitude = datal[0].lon;
        county = str;
        let k = datal[0].address;
        if (ObjectLength(k) < 4) {
            alert("Enter correct location");
            document.getElementById(`getlocation`).value = null;
        }
        else {

            if (window.myChart instanceof Chart) {
                window.myChart.destroy();
            }
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${apikey}`).then(res => res.json()).then(data => {
                showdata(data);
            })
            console.log(longitude);
            fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=50&appid=${apikey}`).then(response => response.json()).then(data => {
                changecity(county);
                console.log(data);
            })
        }
    }).catch(e => {
        alert("Enter correct location   ");
        document.getElementById(`getlocation`).value = null;
    })
    if (nolocationvisited) {
        nolocationvisited = 0;
        nolocationallowed();
    }

}
function ObjectLength(object) {
    var length = 0;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            ++length;
        }
    }
    return length;
};
function changecity(county) {

    document.getElementById(`city`).innerText = `${county}`;
}
function showdata(data) {
    let { humidity, sunrise, sunset, pressure, wind_speed, temp, visibility } = data.current;
    let { icon, id, main } = data.current.weather[0];
    console.log(data);
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${main},sky')`;

    document.getElementById(`maincurrenttemp`).innerHTML = `${temp} `;
    let mainitems = document.getElementById(`properties`);
    mainitems.innerHTML = `<div class="container11 humidity glass">
<div class="humidnexticon">
    
    <img src="Weathericons/humidity.png" alt="icon">
</div>
<div class="humidity nexttemp11">
    <span class="humidmagtemp" id="magtemp">${humidity}</span><span class="suffix"> %</span>
    <p class="property11">Humidity</p>
</div>


</div>

<div class="container11 glass">
<div class="nexticon">
    
    <img src="Weathericons/pressure.png" alt="icon">
</div>
<div class="sunrise nexttemp11">
    <span class="magtemp" id="pressure">${pressure}</span><span class="suffix"> hPa</span>
    <p class="property11">Pressure</p>
</div>


</div>
<div class="container11 glass">
<div class="nexticon">
    
    <img src="Weathericons/sunrise.png" alt="icon">
</div>
<div class="nexttemp11">
    <span class="sunrisemag magtemp" id="sunrisemag">${window.moment(sunrise * 1000).format(`HH:mm`)}</span><span class="suffix"> AM</span>
    <p class="sunrise property11">Sunrise</p>
</div>


</div>
<div class="container11 glass">
<div class="nexticon">
    
    <img src="Weathericons/sunset.png" alt="icon">
</div>
<div class="nexttemp11">
    <span class="magtemp" id="sunrisemag">${window.moment(sunset * 1000).format(`hh:mm`)}</span><span class="suffix"> PM</span>
    <p class="property11">Sunset</p>
</div>


</div>
<div class="container11 glass">
<div class="nexticon">
    
    <img src="Weathericons/wind.png" alt="icon">
</div>
<div class="nexttemp11">
    <span class="magtemp" id="windmag">${wind_speed}</span><span class="suffix"> MPH</span>
    <p class="property11">Windspeed</p>
</div>


</div>
<div class="container11 glass">
<div class="nexticon">
    
    <img src="Weathericons/Precip.png" alt="icon">
</div>
<div class="nexttemp11">
    <span class="magtemp" id="preci">${visibility}</span><span class="suffix"> m</span>
    <p class="property11">Visibility</p>
</div>


</div>`;
    document.getElementById(`tempicon2`).innerHTML = `<img class="mainicon" id="mainicon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">

    <h2 id="mainweathercondition">${main}</h2>`;

    for (let i = 1; i <= 7; i++) {
        let k = document.getElementById(`items${i}`);
        let max = data.daily[i].temp.max;
        let min = data.daily[i].temp.min;
        let icon = data.daily[i].weather[0].icon;
        let dt = data.daily[i].dt;



        k.innerHTML = `<div class="icon">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" class="src">
    </div>
    <div class="max">
        MAX:${max}°C
    </div>
    <div class="min">
        MIN:${min}°C
    </div>
    <div class="dateofweek">
        ${window.moment(dt * 1000).format("DD/MM/YYYY")}
    </div>`;
        k.addEventListener("click", () => {

            let max = data.daily[i].temp.max;
            let min = data.daily[i].temp.min;
            let icon = data.daily[i].weather[0].icon;
            let dt = data.daily[i].dt;
            let sunrise1 = data.daily[i].sunrise;
            let sunset1 = data.daily[i].sunset;
            let humidity1 = data.daily[i].humidity;
            let pressure1 = data.daily[i].pressure;

            document.getElementById("popup").innerHTML = `
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" class="iconindividual">

  <ol>
      <li>
          Date: ${window.moment(dt * 1000).format("DD-MM-YYYY [ , ] ddd")}
      </li>
      <li>
          Max Temp : ${max}C

      </li>
      <li>
          Min Temp : ${min}C

      </li>
      <li>

          Humidity : ${humidity1}%
      </li>
      <li>
          Sunrise : ${window.moment(sunrise1 * 1000).format(`HH:mm`)} AM
      </li>
      <li>

          Sunset : ${window.moment(sunset1 * 1000).format(`hh:mm A`)}
      </li>
      <li>

          Pressure : ${pressure1} hPa
      </li>


  </ol>
  <button class="popupbutton" onclick="hidepopup()"  >X</button>`;



            document.getElementById("popup").style.display = "block";




        })
    }




    const ctx = document.getElementById('myChart').getContext('2d');
    let hours = [];
    let temphours = [];
    for (i = 1; i <= 24; i++) {
        let dateunix = data.hourly[i].dt;
        let temphourly = data.hourly[i].temp;
        temphours.push(temphourly);
        hours.push(window.moment(dateunix * 1000).format(`HH:mm`));


    }
    console.log(temphours);



    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: 'Temperature',
                data: temphours,
                linetension: 0,
                backgroundColor: '#A2D2FF',
                pointBordercolor: '#2E4C6D',

                pointHoverBackgroundColor: '#142850',

                borderColor: '#2E4C6D',

                pointRadius: 5,
                borderWidth: 2
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                x: {
                    font: {
                        family: "'Comfortaa', cursive",

                    }
                }
            }
        }

    });


}
navigator.geolocation.watchPosition(function (position) {
    getwdata();

},
    function (error) {
        if (error.code == error.PERMISSION_DENIED)
            nolocationvisited = 1;
        nolocationallowed();
        alert("Please give access to geolocation else USE SEARCH BAR");

    });

function nolocationallowed() {
    var l = document.querySelectorAll(".varqwert");
    var i = 0;
    for (i = 0; i < l.length; i++) {
        document.querySelectorAll(".varqwert")[i].classList.toggle("jk")
    }
    document.getElementsByClassName("getlocationviasearch")[0].classList.toggle("searchnolocation");
}

var divs = ["properties", "Menu2", "Menu3"];
var visibleDivId = null;
function toggleVisibility(divId) {
    if (visibleDivId === divId) {
        //visibleDivId = null;
    } else {
        visibleDivId = divId;
    }

    hideNonVisibleDivs();
}
function hideNonVisibleDivs() {
    var i, divId, div;
    for (i = 0; i < divs.length; i++) {
        divId = divs[i];
        div = document.getElementById(divId);
        if (visibleDivId === divId) {
            div.style.display = "block";
            topFunction();
        } else {
            div.style.display = "none";
        }
    }

}
function topFunction() {

    document.documentElement.scrollTop = 1500;
}
toggleVisibility("properties")
function hidepopup() {
    document.getElementById("popup").style.display = 'none';
}
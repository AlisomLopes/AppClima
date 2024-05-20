const local = document.querySelector('#local');
const btn = document.querySelector('.input_field > button');

const img_icon = document.querySelector('#icon_weather > img');
const temperatura = document.querySelector('#temperatura');
const location_name = document.querySelector('#location_name');
const umidade = document.querySelector('#umidade');
const vel_vento = document.querySelector('#vel_vento');

const API_KEY = '2c64672df1105adefba4ca0d81ba90ee'

async function getData(local) {
  const route = `https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&units=metric&appid=${API_KEY}`
  
  return fetch(route, {
    method: 'GET',
  })
  .then(response => response.json())
  .catch((err) => console.log(err));
}

function alterandoInfo(response) {

  mudandoIcon(response.weather[0].icon).then(() => {
    temperatura.innerText = parseInt(response.main.temp) + ' ºC';
    location_name.innerText = response.name;
    umidade.innerText = response.main.humidity + '% Umidade';
    vel_vento.innerText = parseInt(response.wind.speed) + 'KM/H Vel. do vento';
  });
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  
  if(!local.value) return;

  getData(local.value)
  .then(response => alterandoInfo(response))
  .catch((err) => window.alert('Erro ao buscar cidade'));
});

function mudandoIcon(icon_code) {
  return new Promise((resolve, reject) => {
    switch (icon_code) {
      case '01d':
          img_icon.setAttribute('src', 'assets/icons/sun.png');
          resolve();
        break;
      case '01n':
          img_icon.setAttribute('src', 'assets/icons/moon.png');
          resolve();
        break;
  
      case '02d': 
          img_icon.setAttribute('src', 'assets/icons/clouds_sun.png');
          resolve();
        break;
      case '02n':
          img_icon.setAttribute('src', 'assets/icons/clouds_moon.png');
          resolve();
        break;
  
      case '03d': case '03n':
          img_icon.setAttribute('src', 'assets/icons/mist.png');
          resolve();
        break;
      case '04d': case '04n':
          img_icon.setAttribute('src', 'assets/icons/mist.png');
          resolve();
        break;
      case '09d': case '09n':
          img_icon.setAttribute('src', 'assets/icons/rain.png');
          resolve();
        break;
      case '10d': case '10n':
          img_icon.setAttribute('src', 'assets/icons/rain.png');
          resolve();
        break;
      case '11d': case '11n':
          img_icon.setAttribute('src', 'assets/icons/thunderstorm.png');
          resolve();
        break;
      case '13d': case '13d':
          img_icon.setAttribute('src', 'assets/icons/snow.png');
          resolve();
        break;
      case '50d': case '50n':
          img_icon.setAttribute('src', 'assets/icons/mist.png');
          resolve();
        break;
    
      default:
        img_icon.setAttribute('src', 'assets/favicon.ico');
        reject('Sem ícone para esse tipo de clima!');
        break;
    }
  })
}
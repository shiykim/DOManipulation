const DOMNodeCollection = require('./dom_node_collection');

const callbacks = [];
let documentReadyState = false;

window.$l = (el) => {
  switch (typeof el){
    case "function":
      if (!documentReadyState){
        callbacks.push(el);
      } else {
        el();
      }
      break;
    case "string":
      const nodeList = document.querySelectorAll(el);
      const nodeArray = Array.from(nodeList);
      return nodeArray;
    case "object":
      if (el instanceof HTMLElement){
        return new DOMNodeCollection([el]);
      }
  }
};

$l.extend = (base, ...args) => {
  args.forEach((el) => {
    for (const prop in el) {
      base[prop] = el[prop];
    }
  });
  return base;
};

$l.ajax = (arg) => {
  let recommended = {
    method: "GET",
    url: '',
    contentType:'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'json',
    data: {},
    success: () => {},
    error: () => {},
  };

  const merged = $l.extend(recommended, arg);
  return new Promise((resolve,reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(merged.method, merged.url, true);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onError = () => reject(xhr.statusText);
    xhr.send(JSON.stringify(merged.data));
    console.log(xhr);
  });
};


function jokes() {
  let setup = $l('.setup')[0];
  let punchline = $l('.punchline')[0];
  $l.ajax({
    url: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke'
  }).then( (response) => {
    setup.innerText = response.setup;
    punchline.innerText = response.punchline;
  });
}

function weather(){
  let weatherStateName = $l('.weather_state_name')[0];
  let temp = $l('.temp')[0];
  let lowTemp = $l('.low-temp')[0];
  let highTemp = $l('.high-temp')[0];
  let humidity = $l('.humidity')[0];
  $l.ajax({
    url: 'https://www.metaweather.com/api/location/2459115/'
  }).then( (response) => {
    console.log(response.setup);
    weatherStateName.innerText = response.consolidated_weather[0].weather_state_name;
    temp.innerText = Math.floor(response.consolidated_weather[0].the_temp * 1.8 + 32);
    highTemp.innerText = Math.floor(response.consolidated_weather[0].max_temp * 1.8 + 32);
    lowTemp.innerText = Math.floor(response.consolidated_weather[0].min_temp * 1.8 + 32);
    humidity.innerText = Math.floor(response.consolidated_weather[0].humidity);

  });
}

function animals() {
  let animal = $l('.animal-pic')[0];
  $l.ajax({
    url: 'http://shibe.online/api/shibes?count=1&httpsUrls=true'
  }).then( (response) => {
    console.log(response[0]);
    animal.src = response;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  callbacks.forEach(func => func());
  jokes();
  weather();
  animals();
});

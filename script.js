var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const submitButton = document.getElementById("submitIP");

let marker;
let inputIP = "";
const responseIP = document.getElementById("placeholderIP");
const responseAddress = document.getElementById("placeholderAddress");
const responseTime = document.getElementById("placeholderTime");
const responseISP = document.getElementById("placeholderISP");

async function fetchIP() {
  alert("function fetchIP was called");
  const url = `http://ip-api.com/json/${inputIP}`;
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  responseIP.innerHTML = json.query;
  responseAddress.innerHTML = `${json.city}, ${json.zip}`;
  responseTime.innerHTML = json.timezone;
  responseISP.innerHTML = json.isp;
  map.setView([json.lat, json.lon], 13);
  marker = L.marker([json.lat, json.lon]).addTo(map);
}

function showIP() {
  inputIP = document.getElementById("ipAddress").value;
  if(inputIP !== "") {
    if (marker !== undefined) {
      map.removeLayer(marker);
    };
    fetchIP();
  } else {
    alert("Please enter a valid IP address")
  }
 }

submitButton.addEventListener("click", showIP);

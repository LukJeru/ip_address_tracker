var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const submitButton = document.getElementById("submitIP");
submitButton.addEventListener("click", showIP);

let marker;
let inputIP = "";
let data;
const responseIP = document.getElementById("placeholderIP");
const responseAddress = document.getElementById("placeholderAddress");
const responseTime = document.getElementById("placeholderTime");
const responseISP = document.getElementById("placeholderISP");

async function fetchIP() {
  const url = `http://ip-api.com/json/${inputIP}?fields=status,message,city,zip,lat,lon,offset,isp,query`;
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  return json;
}

async function showIP() {
  inputIP = document.getElementById("ipAddress").value;
  if(inputIP !== "") {
    if (marker !== undefined) {
      map.removeLayer(marker);
    };
    validateIPaddress(inputIP);
    const data = await fetchIP();
    responseIP.innerHTML = data.query;
    responseAddress.innerHTML = `${data.city}, ${data.zip}`;
    responseTime.innerHTML = timezoneCalculator(data.offset);
    responseISP.innerHTML = data.isp;
    map.setView([data.lat, data.lon], 13);
    marker = L.marker([data.lat, data.lon]).addTo(map);
  } else {
    alert("Please enter a valid IP address")
  }
 }

const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const websitePattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;

function validateIPaddress(ipaddress) {
  if (ipPattern.test(ipaddress) || websitePattern.test(ipaddress)) {
    return (true)
  }
  alert("You have entered an invalid IP address!")
  return (false)
}

function timezoneCalculator(timeOffset) {
  let UTCZone;
  if (timeOffset < 0) {
    UTCZone = `UTC -0${(timeOffset/3600).toString().substring(1)}:00`;

  } else {
    UTCZone = `UTC 0${(timeOffset/3600) }:00`
  }
  return UTCZone;
}

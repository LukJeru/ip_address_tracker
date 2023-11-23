var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const submitButton = document.getElementById("submitIP");


const apiKey = '';
const url = `https://api.ipify.org/?format=json&apiKey=${apiKey}`;

async function fetchIP() {
  alert("function fetchIP was called")
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
}


const responseIP = document.getElementById("placeholderIP");
const responseAddress = document.getElementById("placeholderAddress");
const responseTime = document.getElementById("placeholderTime");
const responseISP = document.getElementById("placeholderISP");

function showIP() {
  const inputIP = document.getElementById("ipAddress").value;
  if(inputIP !== "") {
    fetchIP();
    responseIP.innerHTML = "What?";
    responseAddress.innerHTML = "Lurk";
    responseTime.innerHTML = "4 o'clock";
    responseISP.innerHTML = "Google";
  } else {
    alert("Please enter a valid IP address")
  }
 }

submitButton.addEventListener("click", showIP);

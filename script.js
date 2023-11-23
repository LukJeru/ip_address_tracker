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


function showIP() {
  const inputIP = document.getElementById("ipAddress").value;
  if(inputIP !== "") {
    fetchIP();
  } else {
    alert("Please enter a valid IP address")
  }
 }

submitButton.addEventListener("click", showIP);

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const submitButton = document.getElementById("submitIP");
let ipAddress = "";

function showIP() {
  const ip = document.getElementById("ipAddress").value;
  if(ip !== "") {
    ipAddress = ip;
  } else {
    alert("Please enter a valid IP address")
  }
 }


submitButton.addEventListener("click", showIP);

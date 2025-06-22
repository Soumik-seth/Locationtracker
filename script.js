const button = document.getElementById("get_Location_button");
const para = document.getElementById("para");

// Replace with your actual API key from OpenCage
const API_KEY = "33939ed8a2b4476d9c11ccdcc6ec65a4";

function getlocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  console.log("Latitude:", lat);
  console.log("Longitude:", lon);
  console.log("Accuracy (in meters):", accuracy);

  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const components = data.results[0].components;

        // Try different fields for city/town/village
        const city = components.city || components.town || components.village || "Unknown City";
        const state = components.state || "Unknown State";
        const country = components.country || "Unknown Country";

        para.textContent = `You are from: ${city}, ${state}, ${country}`;
      } else {
        para.textContent = "Location not found.";
      }
    })
    .catch(error => {
      console.error("Error fetching location:", error);
      para.textContent = "Failed to fetch location.";
    });
}

function faildlocation() {
  console.log("Could not get location.");
  para.textContent = "Could not get location. Please allow location access.";
}

button.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(getlocation, faildlocation, {
    enableHighAccuracy: true
  });
});

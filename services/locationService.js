

/**
 * user location
 * @returns {Promise} position 
 */
function position() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

/**
 * lat lag
 * @returns {Promise<{lat,lng}>} position by lat and lng
 */
async function getPosition() {
  try {
    const pos = await position()
    const { latitude, longitude } = pos.coords
    return {
      lat: latitude,
      lng: longitude
    }
  } catch (error) {
    console.info('[could not get position]:', error)
  }

}
// TODO: add google maps search 

function getAddressCoords(address) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  const params = `${address}&language=en&key=${API_KEY}`

  return fetch(baseUrl + params)
    .then(response => response.json())
    .then(res => res.results[0])
    .then(data => {
      return {
        pos: {
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng,
        },
        locName: data['address_components'][0]['long_name'],
      }
    })
}

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function searchLocations() {
  const card = document.getElementById("pac-card");
  const input = document.getElementById("pac-input");
  const biasInputElement = document.getElementById("use-location-bias");
  const strictBoundsInputElement =
    document.getElementById("use-strict-bounds");
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["establishment"],
  };

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

  const autocomplete = new google.maps.places.Autocomplete(
    input,
    options
  );
}

export const locationService = {
  // getPosition,
  // getAddressCoords,
  // searchLocations
}

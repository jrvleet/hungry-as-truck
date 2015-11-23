console.log('JS loaded!');


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.031, lng: -118.265},
    zoom: 8
  });
}

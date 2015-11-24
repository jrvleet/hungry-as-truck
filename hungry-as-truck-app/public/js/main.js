console.log('JS loaded!');


var map;
var currentLocation;
function initMap() {
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 12
      });
      currentLocation = new google.maps.Marker({
        position: {lat: position.coords.latitude, lng: position.coords.longitude},
        map: map,
        title: 'Hello World!'
  });

    })
  }
}






// if(navigator.geolocation) {
//   browserSupportFlag = true;
//   navigator.geolocation.getCurrentPosition(function(position) {
//     initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//     map.setCenter(initialLocation);
//   }, function() {
//     handleNoGeolocation(browserSupportFlag);
//   });
// }

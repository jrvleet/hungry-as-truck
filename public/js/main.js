console.log('Great Job!');

var map;
var currentLocation;
var geocoder;

document.getElementById("geocode").addEventListener("click", codeAddress);

function initMap() {
  geocoder = new google.maps.Geocoder;
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 16
      });
      currentLocation = new google.maps.Marker({
        position: {lat: position.coords.latitude, lng: position.coords.longitude},
        map: map,
        title: 'You'
      });
    });
  }
}

function codeAddress() {
  var address = document.getElementById("address").value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      currentLocation = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

$.get({
  url: 'https://api.mongolab.com/api/1/databases/hungry-as-truck/collections?apiKey=KWQXJayU7JjD2GlZ899kxg_UrTYtX4oc',
  type: 'get',
  data: 'json', // mongod is expecting the parameter name to be called "jsonp"
  success: function (data) {
    console.log('success', data);
  },
  error: function (errorThrown) {
    console.log('error', errorThrown);
  }
});

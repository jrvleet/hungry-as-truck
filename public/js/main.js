console.log('Great Job!');

var map;
var currentLocation;
var geocoder;
var truckOwners;
var truckIcon = './assets/foodTruckIconSM_R.png';

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

$.ajax({
  url: "http://localhost:3000/truckowners",
  type: "get",
  data: 'json',
  success: function (data) {
    data.forEach(function(truckOwner) {
      truckOwner.trucks.forEach(function(truck) {
        var address = truck.location;
        geocoder.geocode( { 'address': address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: truckIcon
            });
          }
          else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      })
    })
  },
  error: function (textStatus, errorThrown) {
    alert("Status: " + textStatus + "    Error:" + errorThrown);
  }
});

document.getElementById("geocode").addEventListener("click", codeAddress);

console.log('Great Job!');

var map;
var currentLocation;
var geocoder;
var truckOwners;
var truckIcon = './assets/foodTruckIconSM_R.png';

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

                  var contentString = '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h1 id="firstHeading" class="firstHeading">'+ truck.name +'</h1>'+
                    '<div id="bodyContent">'+
                    '<p>' + truck.location + '</p>'
                    '</div>'+
                    '</div>';

                    var infowindow = new google.maps.InfoWindow({
                      content: contentString
                    });

                    var marker = new google.maps.Marker({
                      map: map,
                      position: results[0].geometry.location,
                      icon: truckIcon
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                      infowindow.close(map, marker);
                      infowindow.open(map, marker);
                    });

                    // marker.addListener('click', function() {
                    //   infowindow.open(map, marker);
                    // });
                }

                else {
                  alert("Geocode was not successful for the following reason: " + status);
                }
              });
            })
          })
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert("Status: " + textStatus + "    Error:" + errorThrown);
        }
      });
    });
  }
  
};

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
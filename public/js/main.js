console.log('Great Job!');

var map;
var currentLocation;
var geocoder;
var newTruckTemplate = _.template($('#new-truck').html());
var truckOwners;
var $newLocation;
var $truck;
var truckIcon = './assets/HAT_logo_map_icon.png';

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

function updateLocation() {
  $newLocation = $('#address').val();
  $truck = $('select').val();
  $.ajax({
    url: "http://localhost:3000/truckowners",
    type: "get",
    data: 'json',
    success: function (data) {
      data.forEach(function(truckOwner) {
        truckOwner.trucks.forEach(function(truck) {
          console.log(truck);
        })
      })
    }
  });
};



$('#add-truck-btn').on('click', function(evt){
  console.log(evt);
  $('#truck-form').html(newTruckTemplate());
  $('truck-form').submit(function(evt) {
    console.log(evt);
    evt.preventDefault();
    var $truckName = $('#truck-name').val();
    var $truckLocation = $('#truck-location').val();
    var data = {name: $truckName, location: $truckLocation};
    $.ajax({
      url: 'http://localhost:3000/truckowners/5659416b4057f2e90bfcfbc2',
      type: 'PUT',
      data: data
    }).success(function(data) {
      console.log(data);
    })
  });
});


$.ajax({
  url: "http://localhost:3000/truckowners",
  type: "get",
  data: 'json',
  success: function (data) {
    // Loop through truck owners to get to trucks
    data.forEach(function(truckOwner) {
      // Loop through trucks to get locations
      truckOwner.trucks.forEach(function(truck) {
        var address = truck.location;
        // Geocode the address from truck.location, drop a pin there
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
    alert("Status: " + textStatus + "Error: " + errorThrown);
  }
});

document.getElementById("geocode").addEventListener("click", codeAddress);

// function codeAddress() {
//   var address = document.getElementById("address").value;
//   geocoder.geocode( { 'address': address}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//       currentLocation = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//       });
//     } else {
//       alert("Geocode was not successful for the following reason: " + status);
//     }
//   });
// }


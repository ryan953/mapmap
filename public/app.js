function GoogleMap(
  geocoder,
  model,
  map,
  searchForm
) {
  this.geocoder = geocoder;
  this.model = model;

  var locationInput = searchForm.location

  map.bindTo('zoom', this.model);

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    this.codeAddress(locationInput.value, function(location) {
      map.setCenter(location);
    });
  }.bind(this));

  this.trackMapLocation(map, function(result) {
    locationInput.value = result;
  });
}

GoogleMap.prototype.trackMapLocation = function(map, callback) {
  this.geocodeLatLng({
    lat: map.getCenter().lat(),
    lng: map.getCenter().lng(),
  }, callback);

  map.addListener('center_changed', throttle(function() {
    this.geocodeLatLng({
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
    }, callback);
  }.bind(this)));
}

GoogleMap.prototype.geocodeLatLng = function(location, callback) {
  this.geocoder.geocode({'location': location}, function(results, status) {
    if (status === 'OK') {
      if (results.length) {
        callback(results[0].formatted_address);
        return;
      } else {
        console.log('No results found for', location);
      }
    } else {
      console.log('Geocoder failed due to: ' + status);
    }

    callback(location.lat + ', ' + location.lng);
  });
}

GoogleMap.prototype.codeAddress = function(address, callback) {
  this.geocoder.geocode({'address': address}, function(results, status) {
    if (status == 'OK') {
      callback(results[0].geometry.location);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

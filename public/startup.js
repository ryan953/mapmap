
function fromID(id) {
  if (!fromID.__cached) {
    var ids = [
      'mapLeft',
      'mapRight',
      'locationLeft',
      'locationRight',
      'inputLeft',
      'inputRight',
    ];
    fromID.__cached = ids.reduce(function(cache, id) {
      cache[id] = document.getElementById(id);
      return cache;
    }, {});
  }
  if (!fromID.__cached[id]) {
    throw new Error(sprintf('Element with id %s not found', id));
  }
  return fromID.__cached[id];
}

function initMap() {
  var model = new google.maps.MVCObject();
  model.set('zoom', 8);

  var mapLeft = getMap(fromID('mapLeft'));
  var mapRight = getMap(fromID('mapRight'));

  mapLeft.bindTo('zoom', model);
  mapRight.bindTo('zoom', model);

  var locationLeft = fromID('locationLeft');
  var locationRight = fromID('locationRight');

  var inputLeft = fromID('inputLeft');
  var inputRight = fromID('inputRight');

  locationLeft.addEventListener('submit', function(event) {
    event.preventDefault();

    codeAddress(geocoder, inputLeft.value, function(location) {
      mapLeft.setCenter(location);
    });
  });
  locationRight.addEventListener('submit', function(event) {
    event.preventDefault();

    codeAddress(geocoder, inputRight.value, function(location) {
      mapRight.setCenter(location);
    });
  });

  var geocoder = new google.maps.Geocoder;
  trackMapLocation(geocoder, mapLeft, inputLeft);
  trackMapLocation(geocoder, mapRight, inputRight);

  window.model = model;
  window.mapLeft = mapLeft;
  window.mapRight = mapRight;
}

function getMap(elem) {
  return new google.maps.Map(elem, {
    center: {lat: -34.397, lng: 150.644},
    scrollwheel: true,
    zoom: 8
  });
}

function trackMapLocation(geocoder, map, input) {
  var renderResults = function(result) {
    input.value = result;
  };

  geocodeLatLng(geocoder, {
    lat: map.getCenter().lat(),
    lng: map.getCenter().lng(),
  }, renderResults);

  map.addListener('center_changed', throttle(function() {
    geocodeLatLng(geocoder, {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
    }, renderResults);
  }));
}

function geocodeLatLng(geocoder, location, callback) {
  geocoder.geocode({'location': location}, function(results, status) {
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

function codeAddress(geocoder, address, callback) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status == 'OK') {
        callback(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


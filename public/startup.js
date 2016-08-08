function fromID(id) {
  if (!fromID.__cached) {
    var ids = [
      'mapLeft',
      'mapRight',
      'locationLeft',
      'locationRight',
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

function init() {
  var geocoder = new google.maps.Geocoder;
  var model = new google.maps.MVCObject();
  model.set('zoom', 8);

  var appLeft = new GoogleMap(
    geocoder,
    model,
    getMap(fromID('mapLeft')),
    fromID('locationLeft')
  );
  var appRight = new GoogleMap(
    geocoder,
    model,
    getMap(fromID('mapRight')),
    fromID('locationRight')
  );
}

function getMap(elem) {
  return new google.maps.Map(elem, {
    center: {lat: 43.7015716, lng: -79.52018819999999},
    scrollwheel: true,
    zoom: 8
  });
}

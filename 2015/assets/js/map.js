google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {

  /* position Amsterdam */
  var latlng = new google.maps.LatLng(-29.6389219, -50.7889245);

  var mapOptions = {
    center: latlng,
    scrollWheel: false,
    zoom: 14
  };

  var marker = new google.maps.Marker({
    position: latlng,
    url: '/',
    animation: google.maps.Animation.DROP
  });

  var mapCanvas = document.getElementById("map-canvas");
  var map = new google.maps.Map(mapCanvas, mapOptions);
  marker.setMap(map);

  mapCanvas.style.position = 'absolute';
  mapCanvas.style.height = '80%';
  mapCanvas.style.width = '80%';
  mapCanvas.style.left = '10%';
  mapCanvas.style.top = '10%';

};

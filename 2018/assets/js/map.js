$(window).load(function() {

  var center = new google.maps.LatLng(-29.6389219,-50.7889245);

  var properties = {
    center: center,
    zoom: 16,
    scrollwheel: false,
    draggable: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map"), properties);

  var marker = new google.maps.Marker({
    position: center,
    icon: '../img/techparty_icon.png'
  });

});

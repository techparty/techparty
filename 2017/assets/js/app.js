;(function(window, document, undefined) {
  'use strict';

  var talks = document.querySelectorAll('.schtlk'),
    scheduleLinks = document.querySelectorAll('.schnav a'),
    closeButtons = document.querySelectorAll('.schtlkcls');

  function bindMobileNavigation() {
    if (!isMobile()) return;

    var icon = document.getElementById('mobile-navigation-trigger'),
      nav = document.getElementById('header-navigation');

    icon.addEventListener('click', function(e) {
      if (this.classList.contains('opened')) {
        this.classList.remove('opened')
        nav.style.display = 'none';
        return;
      }
      this.classList.add('opened');
      nav.style.display = 'block';
   }, false);
  }

  function closeTalks() {
    for (var i = 0; i < talks.length; i++) {
      talks[i].classList.remove('open');
    }
  }

  function expandTalk(talk) {
    if (talk.classList.contains('open') ) return;
    closeTalks();
    talk.classList.add('open');
  }

  function toggleScheduleGroup(link) {
    if (link.classList.contains('active')) return;

    var day = link.getAttribute('data-day'),
      talksToShow = document.querySelectorAll('[data-talk-day="' + day + '-talk"]')

    for (var i = 0; i < scheduleLinks.length; i++) {
      scheduleLinks[i].classList.remove('active');
    }

    for (var i = 0; i < talks.length; i++) {
      talks[i].classList.add('none');
    }

    for (var i = 0; i < talksToShow.length; i++) {
      talksToShow[i].classList.remove('none');
    }

    link.classList.add('active');
  }

  function bindEvents() {
    for (var i = 0; i < talks.length; i++) {
      talks[i].addEventListener('click', function(e) {
        if (e.target.classList.contains('schtlkcls')) return;
        expandTalk(this);
      }, false);
    }

    for (var i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener('click', function(e) {
        e.preventDefault();
        closeTalks();
      }, false);
    }

    for (var i = 0; i < scheduleLinks.length; i++) {
      scheduleLinks[i].addEventListener('click', function(e) {
        e.preventDefault();
        closeTalks();
        toggleScheduleGroup(this);
      }, false);
    }
  }

  function initMap() {
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
      icon: '/dist/img/techparty_icon.png'
    });

    marker.setMap(map);
  }

  function isMobile() {
    return window.innerWidth < 1000;
  }

  function init() {
    bindMobileNavigation();
    bindEvents();
    initMap();
  }

  init();

})(window, document);

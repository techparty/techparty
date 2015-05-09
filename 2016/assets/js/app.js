/*! Author: github.com/fernandoporazzi */

;(function(window, document, undefined){

  'use strict';

  function xhr(type, url, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.open(type, url, true);
    xhr.responseType = 'text';

    xhr.onload = function() {
      if (xhr.status === 200) {
        var d = JSON.parse(xhr.responseText);
        success(d);
      } else {
        error();
      }
    };

    xhr.send();
  }

  var Speakers = (function() {

    var speakersHolder = document.getElementById('speakers-holder');

    var _success = function (resp) {
      var scriptTemplate = document.getElementById('speakers-template').innerHTML,
        rendered;

      Mustache.parse(scriptTemplate);
      rendered = Mustache.render(scriptTemplate, {data: resp.speakers});
      speakersHolder.innerHTML = rendered;
    };

    var _error = function () {
      speakersHolder.innerHTML = '<h3>Sorry =(</h3><p>Não foi possível carregar a lista de palestrantes.</p>';
    };

    var _init = function () {
      xhr('GET', 'assets/js/data/speakers.json', _success, _error)
    };

    return {
      init: _init
    }

  })();

  var Schedule = (function() {

    var timelineHolder = document.getElementById('timeline-holder'),
      scheduleData;

    var _bindNavigation = function () {
      var links = document.querySelectorAll('.schedule-ul li'),
        i = 0,
        clicked = document.getElementById('monday');

      for (i; i < links.length; i++) {
        var s = links[i];

        s.addEventListener('click', function (e) {
          e.preventDefault();

          clicked.classList.remove('active-day');

          var day = this.getAttribute('data-schedule');
          this.classList.add('active-day');
          clicked = this;
          _success(scheduleData, day);
        }, false);
      }
    };

    var _success = function (resp, day) {
      var scriptTemplate = document.getElementById('timeline-template').innerHTML,
        rendered,
        obj;

      scheduleData = resp;

      obj = day ? resp[day] : resp.monday;

      Mustache.parse(scriptTemplate);
      rendered = Mustache.render(scriptTemplate, {data: obj});
      timelineHolder.innerHTML = rendered;
    };

    var _error = function () {
      console.log('deu merda');
    };

    var _init = function () {
      xhr('GET', 'assets/js/data/schedule.json', _success, _error);

      _bindNavigation();
    };

    return {
      init: _init
    };

  })();

  Speakers.init();
  Schedule.init();

})(window, document);

/*! Author: github.com/fernandoporazzi */


;(function(window, document, undefined){

  'use strict';

  var Speakers = (function() {

    var _init = function () {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'assets/js/data/speakers.json', true);
      xhr.responseType = 'text';

      xhr.onload = function () {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText),
            speakersHolder = document.getElementById('speakers-holder'),
            scriptTemplate = document.getElementById('speakers-template').innerHTML;

          Mustache.parse(scriptTemplate);
          var rendered = Mustache.render(scriptTemplate, {data: data.speakers});
          speakersHolder.innerHTML = rendered;
        }
      };

      xhr.send();
    };

    return {
      init: _init
    }

  })();

  Speakers.init();

})(window, document);

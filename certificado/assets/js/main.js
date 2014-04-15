;(function(w, d, undefined){
  'use strict';

  var Search = (function(){

    function _doSearch (val) {
      var xhr = new XMLHttpRequest();

      xhr.open('POST', './search', true);

      xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        }
      };

      xhr.send(val);
    }

    function _init() {

      var input = d.querySelector('#username-input');

      input.addEventListener('keyup', function(){
        _doSearch(this.value);
      }, false);
    }

    return {
      init: _init
    };
  })();

  Search.init();


})(window, document);
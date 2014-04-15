;(function(w, d, undefined){
  'use strict';

  var Search = (function(){

    function _doSearch (val) {
      var xhr = new XMLHttpRequest();

      xhr.open('POST', './index.php/search', true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          // console.log(xhr.responseText);
          d.querySelector('#resp').innerHTML = xhr.responseText;
        } else if (xhr.status === 404) {
          console.log('Página não encontrada =(');
        }
      };

      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send('username=' + val);
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
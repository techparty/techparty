;(function(w, d, undefined){
  
  'use strict';

  var Search = (function(){

    function _doSearch (val) {

      var xhr = new XMLHttpRequest();

      xhr.open('POST', './index.php/search', true);

      xhr.onload = function () {
        if (xhr.status === 200) {

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

    function _checkboxChange (el) {
      
      var dataName = el.getAttribute('data-name'),
          dataDays = el.getAttribute('data-days');

      d.querySelector('#content').classList.add('hidden');
      d.querySelector('#print-area').classList.toggle('hidden');

      _drawCanvas(dataName, dataDays);

    }

    function _drawCanvas(name, days) {

      var canvas = d.querySelector('#c'),
          ctx = canvas.getContext('2d'),
          logo = new Image(),
          assinatura = new Image();

      logo.src = 'https://raw.githubusercontent.com/techparty/techparty/master/assets/img/tech-party.png';
      assinatura.src = 'https://raw.githubusercontent.com/techparty/techparty/master/assets/img/assinatura.png';

      logo.onload = function () {
        ctx.drawImage(logo, 20, 10);
      };

      
      assinatura.onload = function () {
        ctx.drawImage(assinatura, (canvas.width / 2) - 64, canvas.height - 120 );
      }

      ctx.font = "bold 50px sans-serif";
      ctx.fillText("Certificado de participação", 250, 163);
    }

    function _print (button) {
      
      button.classList.add('hidden');

      setTimeout(function(){
        w.print();
      }, 500);

    }

    return {
      init: _init,
      bindCheckbox: _checkboxChange,
      print: _print
    };

  })();

  Search.init();

  w.Search = Search; // add to window object

})(window, document);
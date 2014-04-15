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
          logoFaccat = new Image(),
          logo = new Image(),
          assinatura = new Image(),
          x = canvas.width / 2;
          
      logoFaccat.src = 'assets/img/faccat-white.png';
      logo.src = 'assets/img/tech-party.png';
      assinatura.src = 'assets/img/assinatura.png';

      logoFaccat.onload = function () {

        ctx.drawImage(logoFaccat, 40, 25);        

      }

      logo.onload = function () {

        ctx.drawImage(logo, canvas.width - 180, 10);

      };

      assinatura.onload = function () {

        ctx.drawImage(assinatura, (canvas.width / 2) - 64, canvas.height - 205 );

      }

      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Certificado de participação', x, 163);

      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Este certificado está sendo conferido a', x, 223);

      // username

      ctx.font = 'bold 40px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, 290);

      // username underline
      ctx.beginPath();
      ctx.moveTo(200, 300);
      ctx.lineTo(970, 300);
      ctx.stroke();

      // assinatura underline
      ctx.beginPath();
      ctx.moveTo(710, canvas.height - 125);
      ctx.lineTo(450, canvas.height - 125);
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Certificamos sua participação na TechParty Faccat, realizada entre', x, 383);
      ctx.fillText('31 de Março de 2014 e 04 de Abril de 2014, na cidade de Taquara/RS, com carga horária de ' + (days * 3) + ' horas.', x, 410);

      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Prof. Dr. Marcelo Azambuja', x, canvas.height - 100);

      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Coordenador do Curso de Bacharelado em Sistemas de Informação', x, canvas.height - 70);
      
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Coordenador do Curso de Tecnólogo em Sistemas para Internet', x, canvas.height - 45);
    }

    function _print (button) {

      d.querySelector('#actions').classList.add('hidden');

      setTimeout(function(){
        w.print();
      }, 500);

    }

    function _download (el) {
      var canvas = d.querySelector('#c'),
          dt = canvas.toDataURL('image/png');

      el.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

      return false;
    }

    return {
      init: _init,
      bindCheckbox: _checkboxChange,
      print: _print,
      download: _download
    };

  })();

  Search.init();

  w.Search = Search; // add to window object

})(window, document);
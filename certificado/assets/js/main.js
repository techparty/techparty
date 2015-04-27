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

      if (input) {

        input.addEventListener('keyup', function(){

          _doSearch(this.value);

        }, false);
      }

    }

    function _checkboxChange (el) {

      var dataName = el.getAttribute('data-name'),
          dataDays = el.getAttribute('data-days'),
          dataIsSpeaker = el.getAttribute('data-is-speaker'),
          dataSubject = el.getAttribute('data-subject'),
          dataDate = el.getAttribute('data-date');

      d.querySelector('#content').classList.add('hidden');
      d.querySelector('#print-area').classList.toggle('hidden');

      _drawCanvas(dataName, dataDays, dataIsSpeaker, dataSubject, dataDate);

    }

    function _drawCanvas(name, days, isSpeaker, subject, date) {

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

      var year = window.location.pathname.replace(/.*\//, '') || new Date().getFullYear();

      if (!isSpeaker) {
        switch (year) {
          case 2015:
            _drawCanvas2015(ctx, x, days, name, subject, year, date);
            break;
          case 2014:
            _drawCanvas2014(ctx, x, days, name, subject, year, date);
            break;
        }
      } else {
        _drawCanvasSpeaker(ctx, x, name, subject, year, date);
      }

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

    function _drawCanvas2014 (ctx, x, days);
      ctx.fillText('Certificamos sua participação na TechParty Faccat, realizada entre', x, 383);
      ctx.fillText('31 de Março de 2014 e 04 de Abril de 2014, na cidade de Taquara/RS, com carga horária de ' + (days * 3) + ' horas.', x, 410);
    }

    function _drawCanvas2015 (ctx, x, days, name, subject, year, date);
      ctx.fillText('Certificamos sua participação na TechParty Faccat, realizada entre', x, 383);
      ctx.fillText('6 de Abril de 2015 e 10 de Abril de 2015, na cidade de Taquara/RS, com carga horária de ' + (days * 3) + ' horas.', x, 410);
    }

    function _drawCanvasSpeaker (ctx, x, name, subject, year, date) {
      ctx.fillText('Conferimos a ' + name + ' o presente certificado por haver ministrado a ', x, 383);
      ctx.fillText('palestra "' + subject + '" durante a TechParty ' + year, x, 410);
      ctx.fillText('promovida pela Faculdades Integradas de Taquara no dia ' + date + ', com duração de 1 hora.', x, 437);
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

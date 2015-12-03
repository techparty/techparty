;(function(w, d, undefined){

  'use strict';

  var Search = (function(){

    var _year = 2015;
    var _url = 'https://techparty-data.herokuapp.com/api/speaker/';

    function _ajax (data, cb) {
      var xhr = new XMLHttpRequest();

      xhr.open(data.method, data.url, true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          cb(xhr.responseText);
        } else if (xhr.status === 404) {
          console.log('Página não encontrada =(');
        }
      };

      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(data.form);
    }

    function _doSearch (val) {
      _ajax({
        method: 'POST',
        url: _url + 'search',
        form: 'username=' + val + '&year=' + _year
      }, function (response) {
        var participants = JSON.parse(response);
        var data = '<ul>'
        participants.forEach(function (participant) {
          data += '<li class="resp-list-item">'
          data += ' <input type="checkbox" data-name="' + participant + '" onchange="Search.bindCheckbox(this);">'
          data += ' <label>' + participant + '</label>'
          data += '</li>'
        })
        data+='</ul>'
        d.querySelector('#resp').innerHTML = data;
      })
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
      var dataName = el.getAttribute('data-name');
      _ajax({
        method: 'POST',
        url: _url + 'get',
        form: 'username=' + dataName + '&year=' + _year
      }, function (response) {
        var speaker = JSON.parse(response);

        var dataSubject = speaker.talk;
        var dataDate = speaker.date;
        var dataMinutes = speaker.minutes;

        d.querySelector('#content').classList.add('hidden');
        d.querySelector('#print-area').classList.toggle('hidden');

        _drawCanvas(dataName, dataSubject, dataDate, dataMinutes);
      })
    }

    function _drawCanvas(name, subject, date, minutes) {

      var canvas = d.querySelector('#c'),
          ctx = canvas.getContext('2d'),
          logoFaccat = new Image(),
          logo = new Image(),
          assinatura = new Image(),
          x = canvas.width / 2;

      logoFaccat.src = '../../assets/img/faccat-white.png';
      logo.src = '../../assets/img/tech-party.png';
      assinatura.src = '../../assets/img/assinatura.png';

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
      ctx.fillStyle = 'black';
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

      ctx.fillText('Conferimos a ' + name + ' o presente certificado por haver ministrado a ', x, 383);
      ctx.fillText('palestra "' + subject + '" durante a TechParty ' + _year, x, 410);
      ctx.fillText('promovida pela Faculdades Integradas de Taquara no dia ' + date + '.', x, 437);

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

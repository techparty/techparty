/*! Author: Fernando Porazzi - github.com/fernandoporazzi */

;(function(window, document, undefined){

  'use strict';

  function xhr(type, url, success, error, data) {
    var xhr = new XMLHttpRequest();

    xhr.open(type, url, true);
    xhr.responseType = 'text';

    xhr.onload = function() {
      if ( xhr.status >= 200 && xhr.status <= 226) {
        if (xhr.responseText) {
          return success(JSON.parse(xhr.responseText))
        }

        return success();
      }

      error();

    };

    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.send(JSON.stringify(data));
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
      xhr('GET', 'assets/data/speakers.json', _success, _error)
    };

    return {
      init: _init
    };

  })();

  var Schedule = (function() {

    var timelineHolder = document.getElementById('timeline-holder'),
      scheduleData;

    var _bindNavigation = function () {
      var links = document.querySelectorAll('.schedule-ul li'),
        i = 0,
        linksLength = links.length,
        clicked = document.getElementById('monday'),
        self,
        day;

      for ( i; i < linksLength; i++ ) {
        self = links[i];

        self.addEventListener('click', function (e) {
          e.preventDefault();

          clicked.classList.remove('active-day');

          day = this.getAttribute('data-schedule');

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

      if (obj) {
        Mustache.parse(scriptTemplate);
        rendered = Mustache.render(scriptTemplate, {data: obj});
        timelineHolder.innerHTML = rendered;
      } else {
        document.getElementById('schedule').style.display = 'none';
      }
    };

    var _error = function () {
      timelineHolder.innerHTML = '<h3>Sorry =(</h3><p>Não foi possível carregar a programação.</p>';
    };

    var _init = function () {
      xhr('GET', 'assets/data/schedule.json', _success, _error);

      _bindNavigation();
    };

    return {
      init: _init
    };

  })();

  var Maps = (function(){

    var _init = function () {
      var center = new google.maps.LatLng(-29.6389219,-50.7889245);

      var properties = {
        center: center,
        zoom: 16,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), properties);

      var marker = new google.maps.Marker({
        position: center,
        icon: 'assets/img/tp.png'
      });

      marker.setMap(map);
    };

    return {
      init: _init
    };

  })();

  var Sponsors = (function() {

    var sponsorsHolder = document.getElementById('sponsors-holder');

    var _success = function (resp) {
      var scriptTemplate = document.getElementById('sponsors-template').innerHTML,
        rendered;

      Mustache.parse(scriptTemplate);
      rendered = Mustache.render(scriptTemplate, {data: resp.sponsors});
      sponsorsHolder.innerHTML = rendered;
    };

    var _error = function () {
      sponsorsHolder.innerHTML = '<p>Sorry =( <br>Não foi possível carregar a lista de patrocinadores.</p>';
    };

    var _init = function () {
      xhr('GET', 'assets/data/sponsors.json', _success, _error);
    };

    return {
      init: _init
    };

  })();

  var App = (function() {

    var modal = document.getElementById('register-modal'),
      registeringForm = document.getElementById('register-form'),
      errorBox =  document.getElementById('form-error-message'),
      modalTitle = document.getElementById('modal-title'),
      html = document.querySelector('html'),
      modalTitleOriginalText = modalTitle.innerHTML;

    var _openRegisteringModal = function () {
      modal.classList.remove('hidden');
      modal.classList.add('modal-is-open');
      html.classList.add('hidden-overflow');
    };

    var _closeRegisteringModal = function () {
      registeringForm.reset();
      modal.classList.add('hidden');
      modal.classList.remove('modal-is-open');
      html.classList.remove('hidden-overflow');
      errorBox.classList.add('hidden');
      modalTitle.innerHTML = modalTitleOriginalText;

      window.location.hash = '#header';
    };

    var _bindCloseModal = function () {
      var resetButton = document.getElementById('reset-form');

      // Closes modal by clicking on the cancel button
      resetButton.addEventListener('click', _closeRegisteringModal, false);

      // Closes modal by clicking on the black overlay
      modal.addEventListener('click', function (e) {
        if ( e.target.id === 'register-modal' ) {
          _closeRegisteringModal();
        }
      }, false);

      // Closes modal on esc press
      document.addEventListener('keydown', function (e) {
        var keyCode = e.which || e.keyCode;

        if ( keyCode === 27 ) {
          if ( ! modal.classList.contains('hidden') ) {
            _closeRegisteringModal();
          }
        }
      }, false);
    };

    var _bindRegisteringModal = function () {
      var registerLink = document.getElementById('open-register-modal');

      registerLink.addEventListener('click', _openRegisteringModal, false);
    };

    var _showError = function (m) {
      errorBox.innerHTML = m;
      errorBox.classList.remove('hidden');
    };

    var _success = function () {
      errorBox.classList.add('hidden');

      modalTitle.innerHTML = 'Sua inscrição foi efetuada com sucesso. Obrigado!';

      setTimeout(_closeRegisteringModal, 5000);

      return;
    };

    var _error = function () {
      _showError('Houve um erro ao enviar seus dados. Por favor, tente novamente!');
    };

    var _sendDataToServer = function (data) {
      xhr(registeringForm.method, registeringForm.action, _success, _error, data);
    };

    var _validateCpf = function (strCPF) {
      // Código retirado do site da Receita Federal

      var Soma;
      var Resto;
      Soma = 0;
      var i;

      if (strCPF == "00000000000") return false;

      for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

      Soma = 0;
      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
      return true;
    };

    var _validateFormData = function (e) {
      e.preventDefault();

      var name = document.getElementById('r-name').value,
        email = document.getElementById('r-email').value,
        cpf = document.getElementById('r-cpf').value,
        checkboxes = document.getElementsByName('day-to-attend'),
        cbLength = checkboxes.length,
        selectedDays = [],
        i = 0,
        self,
        dataToPost;

      if (!_validateCpf(cpf)) {
        _showError('Digite um CPF válido.');

        return;
      }

      for ( i; i < cbLength; i++ ) {
        self = checkboxes[i];

        if (self.checked ) {
          selectedDays.push(self.value);
        }
      }

      if ( name.trim() === '' || email.trim() === '' || cpf.trim() === '') {
        _showError('Todos os campos tem preechimento obrigatório.');

        return;
      }

      if ( selectedDays.length === 0 ) {
        _showError('Por favor, selecione pelo menos 1 dia para participar.');

        return;
      }

      dataToPost = {
        name: name,
        email: email,
        cpf: cpf,
        year: 2016,
        days: selectedDays
      };

      _sendDataToServer(dataToPost);
    };

    var _bindRegisteringFormSubmission = function () {
      registeringForm.addEventListener('submit', _validateFormData, false);
    };

    var _getScrollPosition = function (e) {
      var scrollTop = document.body.scrollTop,
        header = document.getElementById('header-top');

      if (scrollTop > 300) {
        header.classList.add('header-fixed');
      } else {
        header.classList.remove('header-fixed');
      }
    };

    var _bindScroll = function () {
      document.addEventListener('scroll', _getScrollPosition, false);
    };

    var _init = function () {
      smoothScroll.init({
        speed: 1000,
        easing: 'easeInOutCubic'
      });

      _bindRegisteringModal();
      _bindCloseModal();
      _bindRegisteringFormSubmission();
      _bindScroll();
    };

    return {
      init: _init
    };

  })();

  App.init();
  Speakers.init();
  Schedule.init();
  Maps.init();
  Sponsors.init();

})(window, document);

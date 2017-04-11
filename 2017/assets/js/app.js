;(function(window, document, undefined) {
  'use strict';

  var talks = document.querySelectorAll('.schtlk'),
    scheduleLinks = document.querySelectorAll('.schnav a'),
    closeButtons = document.querySelectorAll('.schtlkcls');

  function executeApiHealthcheck() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://techparty-data.herokuapp.com/api/v1/healthcheck', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('%c API is ok', 'color: green; font-weight: bold');
      }
    };
    xhr.send();
  }

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

  function showRegisterMessage(text, type) {
    var msgWrapper = document.getElementById('regm');

    msgWrapper.classList.add('display');
    msgWrapper.classList.add(type === 'error' ? 'error' : 'success');
    msgWrapper.innerHTML = text;

    var timeout = setTimeout(function () {
      msgWrapper.classList.remove('display');
      clearTimeout(timeout);
    }, 5000);
  }

  function bindRegisterSubmit() {
    var form = document.getElementById('register-form');

    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var name = document.getElementById('r_name').value,
        email = document.getElementById('r_email').value,
        cpf = document.getElementById('r_cpf').value,
        $days = document.getElementsByName('r_day'),
        days = [],
        dataToPost;

      if (name.trim() === '') {
        showRegisterMessage('Nome inválido', 'error');
        return;
      }

      if (email.trim() === '') {
        showRegisterMessage('Email inválido', 'error');
        return;
      }

      if (!CPF.isValid(cpf)) {
        showRegisterMessage('CPF inválido', 'error');
        return;
      }

      for (var i = 0; i < $days.length; i++) {
        var self = $days[i];

        if (self.checked) {
          days.push(self.value);
        }
      }

      if (!days.length) {
        showRegisterMessage('Escolha os dias para participar', 'error');
        return;
      }

      dataToPost = {
        name: name,
        email: email,
        cpf: cpf,
        year: 2017,
        days: days
      };

      submitRegister(dataToPost, form);
    }, false);
  }

  function submitRegister(data, form) {
    var xhr = new XMLHttpRequest();

    xhr.open(form.method, form.action, true);
    xhr.responseType = 'text';

    xhr.onload = function() {
      console.log(xhr.status);
      if (xhr.status === 200) showRegisterMessage('Inscrição bem sucedida.', 'success');
      else showRegisterMessage(xhr.responseText, 'error');
    };

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));
  }

  function isMobile() {
    return window.innerWidth < 1000;
  }

  function disableRegister() {
    if (Date.now() >= new Date(2017, 3, 24).getTime()) {
      document.getElementById('register').remove();
      document.querySelector('.time-schedule__text').remove();
      document.querySelector('.banner a[href="#register"]').remove();
      document.querySelector('.header a[href="#register"]').remove();
    }
  }

  function init() {
    disableRegister();
    executeApiHealthcheck();
    bindMobileNavigation();
    bindEvents();
    bindRegisterSubmit();
    initMap();
  }

  init();

})(window, document);

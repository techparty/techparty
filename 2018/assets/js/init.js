'use strict';

var $ = window.jQuery;


//ON DOCUMENT READY
$(document).ready(function() {

  	//SVG for Everybody (ie9+, ...)
  	// svg4everybody();
    $("select").selectOrDie();

    $('.countdown').downCount({
        date: '04/24/2018 00:00:00',
        offset: -3
    });

    /*-------------------------------------------------*/
    /* =  header style change
    /*-------------------------------------------------*/

    var num = $('.header-main').offset().top;

    $(window).bind('scroll', function() {

        if ($(window).scrollTop() > num) {
            $('.header-main').addClass('change');
        }
        else {
            num = $('.header-main').offset().top;
            $('.header-main').removeClass('change');

        }
    });

    /*-------------------------------------------------*/
    /* =  Back to top
    /*-------------------------------------------------*/

    var back_top = $("#top");

    if ($(back_top).hide(), $(window).scroll(function() {
        $(this).scrollTop() > 75 ? back_top.fadeIn() : back_top.fadeOut()
    }), $(window).width() < 950) var n = $("header").height() + 60;

    /*-------------------------------------------------*/
    /* =  scroll on link
    /*-------------------------------------------------*/

    if ($(window).width() < 950) {
      var top_ofset = $('header').height() + 60;
    }
    else {
      var top_ofset = $('header').height() + 60;
    }


    $('header nav ul a,.findout-more ,.logo, .scroll-down, #top,.register-now').smoothScroll({
      offset: - top_ofset,
      // one of 'top' or 'left'
      direction: 'top',
      // only use if you want to override default behavior
      scrollTarget: null,
      // fn(opts) function to be called before scrolling occurs.
      // `this` is the element(s) being scrolled
      beforeScroll: function() {},
      // fn(opts) function to be called after scrolling occurs.
      // `this` is the triggering element
      afterScroll: function() {},
      easing: 'easeInOutExpo',
      speed: 1000,
      // coefficient for "auto" speed
      autoCoefficent: 2,
      // $.fn.smoothScroll only: whether to prevent the default click action
      preventDefault: true
    });


    /*-------------------------------------------------*/
    /* =  Izotope
    /*-------------------------------------------------*/
    $.Isotope.prototype._getCenteredMasonryColumns = function() {
      this.width = this.element.width();

      var parentWidth = this.element.parent().width();

                    // i.e. options.masonry && options.masonry.columnWidth
      var colW = this.options.masonry && this.options.masonry.columnWidth ||
                    // or use the size of the first item
                    this.$filteredAtoms.outerWidth(true) ||
                    // if there's no items, use size of container
                    parentWidth;

      var cols = Math.floor( parentWidth / colW );
      cols = Math.max( cols, 1 );

      // i.e. this.masonry.cols = ....
      this.masonry.cols = cols;
      // i.e. this.masonry.columnWidth = ...
      this.masonry.columnWidth = colW;
    };

    $.Isotope.prototype._masonryReset = function() {
      // layout-specific props
      this.masonry = {};
      // FIXME shouldn't have to call this again
      this._getCenteredMasonryColumns();
      var i = this.masonry.cols;
      this.masonry.colYs = [];
      while (i--) {
        this.masonry.colYs.push( 0 );
      }
    };

    $.Isotope.prototype._masonryResizeChanged = function() {
      var prevColCount = this.masonry.cols;
      // get updated colCount
      this._getCenteredMasonryColumns();
      return ( this.masonry.cols !== prevColCount );
    };

    $.Isotope.prototype._masonryGetContainerSize = function() {
      var unusedCols = 0,
          i = this.masonry.cols;
      // count unused columns
      while ( --i ) {
        if ( this.masonry.colYs[i] !== 0 ) {
          break;
        }
        unusedCols++;
      }

      return {
            height : Math.max.apply( Math, this.masonry.colYs ),
            // fit container to columns that have been used;
            width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
          };
    };
     $('#filter_content').isotope();

    // cache filter_content
    var $filter_content = $('#filter_content');
    // initialize isotope
    $filter_content.isotope({
      animationOptions: {
         duration: 750,
         queue: false
       }
    });
    // filter items when filter link is clicked
    $('.filters a').click(function(){
      var selector = $(this).attr('data-filter');
      $filter_content.isotope({ filter: selector });
      return false;
    });

    $('#people-slider').owlCarousel({
        items:1,
        margin:0,
        loop:true,
        smartSpeed:450
    });

    $(".people-say .prev").click(function () {
        $('#people-slider').trigger('prev');
    });

    $(".people-say .next").click(function () {
        $('#people-slider').trigger('next');
    });

    var $whenSection = $('.when-section');
    var $whenSectionText = $whenSection.find('.text-nav');
    var $whenSlider = $('#when-slider');

    $whenSlider.owlCarousel({
      items: 1,
      margin: 0,
      loop: true,
      autoHeight: true,
      smartSpeed: 450,
    });

    $whenSection.find('.prev').click(function () {
      $whenSlider.trigger('prev');
    });

    $whenSection.find('.next').click(function () {
      $whenSlider.trigger('next');
    });

    $whenSlider.on('translated.owl.carousel',function (e) {
      var date = $whenSlider.find('.active .item').attr('data-date');
      $whenSectionText.html(date);
    });

    /*-------------------------------------------------*/
    /* =  magnific popup
    /*-------------------------------------------------*/

    $('.popup-modal').magnificPopup({
      type:'inline',
      midClick: true,
      removalDelay: 50,
      callbacks: {
        // open: function() {
        //   $('.mfp-close').empty().append(close_icon);
        // },
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup
           this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
           this.st.mainClass = this.st.el.attr('data-effect');
        }
      }
    });


    $('.mfp-close').magnificPopup({
      mainClass: 'mfp-with-fade',
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeClose: function() {
            this.content.addClass('hinge');
        },
        close: function() {
            this.content.removeClass('hinge');
        }
      },
      midClick: true
    });

    $('.popup-gallery').each(function() {

      $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        removalDelay: 500,
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        fixedContentPos: true,
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function(item) {
            return item.el.attr('title') + '<small></small>';
          }
        },
        callbacks: {
          // open: function() {
          //   $('.mfp-close').empty().append(close_icon);
          // },
          beforeOpen: function() {
            // just a hack that adds mfp-anim class to markup
             this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
             this.st.mainClass = this.st.el.attr('data-effect');
          }
        }
      });
    });

    $('.popup-youtube, .popup-vimeo').magnificPopup({
      type: 'iframe',
      // mainClass: 'mfp-fade',
      removalDelay: 50,
      preloader: false,
      fixedContentPos: true,
      callbacks: {
        // open: function() {
        //   $('.mfp-close').empty().append(close_icon);
        // },
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup
           this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
           this.st.mainClass = this.st.el.attr('data-effect');
        }
      }
    });

    /*-------------------------------------------------*/
    /* =  Generate random number for form check
    /*-------------------------------------------------*/
    var generateRandom = function(element) {
        var word = ['one', 'two', 'three', 'four', 'five'];
        var rand = (Math.floor(Math.random() * 4));
        var correct = word[rand];
        $(element).html(correct);
        return correct;
    }

    var correct = generateRandom('.test p span');

    /*-------------------------------------------------*/
    /* =  Highlighting checked radio button
    /*-------------------------------------------------*/
    $('input[name=rand]').on('click', function() {
        $('input[name=rand]').parent().removeClass('active1');
        $('input[name=rand]:checked').parent().addClass('active1');
    });

    /*-------------------------------------------------*/
    /* =  Popup notification
    /*-------------------------------------------------*/
    var showNotification = function(message, className) {
        $('.popup-email').fadeIn('fast');
        $('.element p').remove();
        $('.element').prepend('<p class="' + className + '">' + message + '</p>');
    }

    var closeNotification = function(element) {
        $(element).fadeOut('fast');
    }

    $('#btn').on('click', function() {
        closeNotification('.popup-email');
    });

    /*-------------------------------------------------*/
    /* =  Form validation
    /*-------------------------------------------------*/

    jQuery.validator.addMethod("validateCpf", function(value, element) {
      return CPF.isValid(value.toString());
    }, "* CPF invalid.");

     $('.contact-form').validate({
        errorElement: 'p',
        errorClass: 'notify',
        rules: {
            name: "required",
            email: { required: true, email: true },
            cpf: {
              required: true,
              validateCpf: true,
            },
            days: "required"
        },
        submitHandler: function(form) {
            // if($('input[name=rand]:checked').val() === correct) {
            //     $.post('form_data.php', $(form).serialize(), function(response) {
            //         $(form)[0].reset();
            //         correct = generateRandom('.test p span');
            //         closeNotification('.contact-wrap');
            //         showNotification(response.msg, response.class);
            //     }, 'json');
            // } else showNotification('Incorrect number selected!', 'error');

        }
    });

    $('.register-now').on('click' , function() {
        $('.register-popup').toggleClass('active');
    });

    $('.register-popup .close-popup, .register-popup .overlay-popup').on('click' , function() {
        $('.register-popup').toggleClass('active');
    });

    $(document).on('click','.drop-link',function() {
      $(this).find('.drop-down').slideToggle('fast');
    });

});



//WINDOW ONLOAD
$(window).load(function() {

  $(document).on('click','.bars',function(){
    $('nav').toggleClass('active');
  });
  $(document).on("click","nav ul a",function(){
    $("nav").removeClass("active");
  });

});




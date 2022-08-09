$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"> </button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"> </button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      
      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          })
      };
      toggleSlide('.catalog-item__content');
      toggleSlide('.catalog-item__list');

      //MODAL

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
      });

      $('.button_mini').each( function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
      });  
      
      function validateForms(form) {
        $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
              },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Введите не менее {0} символов!"),
            },
            phone: "Пожалуйста, введите свой номер",
            email: {
              required: "Пожалуйста, введите свою электронную почту",
              email: "Неправильно введена електронная почта"
            }
          }
      }); 
    }
    validateForms('#consultation-form'),
    validateForms('#consultation form'),
    validateForms('#order form')

    $('form').submit(function(e){
      e.preventDefault();

        if (!$(this).valid()) {
          return;
        }

      $.ajax({
        type: 'POST',
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){
        $(this).find("input").val("");
        $('#consultation, #oreder').fadeOut();
        $('.overlay, #thanks').fadeIn();
        $('form').trigger('reset');
      });
      return false;
    });

    // Smooth scroll and pageup
    
    $(window).scroll(function(){
      if ($(this).scrollTop() > 1600){
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });
    
    wow = new WOW(
      {
      boxClass:     'wow',      // default
      animateClass: 'animate__animated', // default
      offset:       0,          // default
      mobile:       true,       // default
      live:         true        // default
    }
    )
    wow.init();
    
});
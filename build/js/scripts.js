(function ($) {
    'use strict';
    var SOD = {
        init: function () {
            this.onLoad();
            this.resizeListner();
            this.scrollListner();
            this.scrollTo();
            this.slider();
            this.logoslider();
            this.slideronesec();
            this.slidertwo();
            this.fancyboxwrap();
            this.counter();
            this.tooltip();
            
},
        settings: {
            windowWidth: $(window).width(),
            windowheight: $(window).height(),
            scrollTop: $(window).scrollTop(),
            scrollClassTrigger: 70,
        },
        onLoad: function () {
            $(document).ready(function () {});
        },

      

        counter: function (){
            

            function visible(partial) {
                var $t = partial,
                    $w = jQuery(window),
                    viewTop = $w.scrollTop(),
                    viewBottom = viewTop + $w.height(),
                    _top = $t.offset().top,
                    _bottom = _top + $t.height(),
                    compareTop = partial === true ? _bottom : _top,
                    compareBottom = partial === true ? _top : _bottom;
            
                return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));
            
            }
            
            $(window).scroll(function(){
            
              if(visible($('.count-digit')))
                {
                  if($('.count-digit').hasClass('counter-loaded')) return;
                  $('.count-digit').addClass('counter-loaded');
                  
            $('.count-digit').each(function () {
              var $this = $(this);
              jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 5000,
                easing: 'swing',
                step: function () {
                  $this.text(Math.ceil(this.Counter));
                }
              });
            });
                }
            })
            
                
        },

        fancyboxwrap: function () {
            Fancybox.bind("[data-fancybox]", {
                // Your custom options
            });
        },

        slideronesec: function () {
            $(".slider-one").slick({
                dots: false,
                arrows:false,
                speed:2000,
                autoplay: true,
                autoplaySpeed: 3000,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [

                    {
                
                      breakpoint: 1024,
                
                      settings: {
                
                        slidesToShow: 3,
                
                        slidesToScroll: 3,
                
                        infinite: true
                
                
                      }
                
                    },
                
                    {
                
                      breakpoint: 600,
                
                      settings: {
                
                        slidesToShow: 2,
                
                        slidesToScroll: 2
                
                      }
                
                    },
                
                    {
                
                      breakpoint: 480,
                
                      settings: {
                
                        slidesToShow: 1,
                
                        slidesToScroll: 1
                
                      }
                
                    }
                
                
                  ]
            });
        },

        slidertwo: function () {
            $(".slider-two").slick({
                dots: false,
                arrows:false,
                speed:2000,
                autoplay: true,
                autoplaySpeed: 3000,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: -1,
                responsive: [

                    {
                
                      breakpoint: 1024,
                
                      settings: {
                
                        slidesToShow: 3,
                
                        slidesToScroll: 3,
                
                        infinite: true
                
                
                      }
                
                    },
                
                    {
                
                      breakpoint: 600,
                
                      settings: {
                
                        slidesToShow: 2,
                
                        slidesToScroll: 2
                
                      }
                
                    },
                
                    {
                
                      breakpoint: 480,
                
                      settings: {
                
                        slidesToShow: 1,
                
                        slidesToScroll: 1
                
                      }
                
                    }
                
                
                  ]
            });
        },


        logoslider: function () {
            $(".logo-slider").slick({
                dots: false,
                arrows:false,
                infinite: true,
                slidesToShow: 10,
                slidesToScroll: -1,
                autoplay: true,
                speed: 6000,
                cssEase: 'linear',
                pauseOnHover: true,
                responsive: [

                    {
                
                      breakpoint: 1024,
                
                      settings: {
                
                        slidesToShow: 3,
                
                        slidesToScroll: 3,
                
                        infinite: true
                
                
                      }
                
                    },
                
                    {
                
                      breakpoint: 600,
                
                      settings: {
                
                        slidesToShow: 2,
                
                        slidesToScroll: 2
                
                      }
                
                    },
                
                    {
                
                      breakpoint: 480,
                
                      settings: {
                
                        slidesToShow: 1,
                
                        slidesToScroll: 1
                
                      }
                
                    }
                
                
                  ]
            });
        },


        resizeListner: function () {
            $(window).on('load resize', function () {
                SOD.settings.windowWidth = $(window).width();
            });
        },

       

        scrollListner: function () {
            $(window).on('load scroll', function () {
                if ($(window).scrollTop() > SOD.settings.scrollClassTrigger) {
                    $('body').addClass('scrolled');
                } else {
                    $('body').removeClass('scrolled');
                }
            });
            $(window).on('mousewheel DOMMouseScroll', function (event) {
                var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                if (wd < 0) {
                    $('body').removeClass('scrollingUp');
                    $('body').addClass('scrollingDown');
                } else {
                    $('body').removeClass('scrollingDown');
                    $('body').addClass('scrollingUp')
                }
            });
            $(window).on('load scroll', function() {
                if ($(window).scrollTop() > SOD.settings.scrollClassTrigger) {
                    $('.site-header').addClass('fixed');
                } else {
                    $('.site-header').removeClass('fixed');
                }
            });
        },

        slider: function () {
            $(".testimonial").slick({
                dots: true,
                infinite: true,
                
            });
        },

        
        tooltip: function () {
            $(document).ready(function(){
                // $('[data-toggle="popover"]').popover();   
               $('[data-toggle="popover"]').popover({
                   placement : 'bottom',
                   html : true,
                   title : '<span style="visibility:hidden;">UserInfo</span><a href="#" class="close" data-dismiss="alert">&times;</a>',
                   
               });
              $(document).on("click", ".popover .close" , function(){
                   $(this).parents(".popover").popover('hide');
               });
           
            });
        },  


    

        scrollTo: function () {
            $('.navigation__link').bind('click', function (e) {
                e.preventDefault(); // prevent hard jump, the default behavior
                var target = $(this).attr("href"); // Set the target as variable
                // perform animated scrolling by getting top-position of target-element and set it as scroll target
                $('html, body').stop().animate({
                    scrollTop: $(target).offset().top
                }, 600, function () {
                    location.hash = target; //attach the hash (#jumptarget) to the pageurl
                });
                return false;
            });

            $(window).scroll(function () {
                // Assign active class to nav links while scolling
                $('.page-section').each(function (i) {
                    if ($(this).position().top <= scrollTop) {
                        $('.navigation a.active').removeClass('active');
                        $('.navigation a').eq(i).addClass('active');
                    }
                });
            });
        },

        
    };
    SOD.init();
}(jQuery));
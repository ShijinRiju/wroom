(function ($) {
    'use strict';
    var SOD = {
        init: function () {
            this.onLoad();
            this.winLoad();
            this.resizeListner();
            this.scrollListner();
            this.navigation();
            this.scrollTo();
            this.accordion();
            this.selectbox();
            this.slider();
            this.productslider();
            this.equalheight();   
            this.tooltip();
            this.clone();
            this.slidetoggle();
            this.sidebarslide();
            // this.labeltotext();
            this.hideshow();
            this.addcard();
            this.datepicker();
            this.stepslide();
            this.changeimage();
            this.stickySidebar();
            
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

        winLoad: function () {
            $(window).load(function () {
                $('body').addClass('loaded');
            });
        },

        resizeListner: function () {
            $(window).on('load resize', function () {
                SOD.settings.windowWidth = $(window).width();
            });
        },

        stepslide: function () {          
            console.clear();

            var uiFormSlide = {
            init: function() {
                this.steps = $(".ui-formSlide > [data-step]");
                this.currentStep = 0;
                $(this.steps[0])
                .addClass("active")
                .find(".ui-step-content")
                .addClass("in");
            },
            goTo: function(index) {
                this.play(index);
            },
            next: function() {
                this.nextStep = this.getNext(this.currentStep);
                this.animateHeight($(this.steps[this.nextStep]).outerHeight());
                this.currentStep = this.getNext(this.currentStep);
                this.play(this.currentStep, 'forward');
            },
            prev: function() {
                this.prevStep = this.getPrev(this.currentStep);
                this.animateHeight($(this.steps[this.prevStep]).outerHeight());
                this.currentStep = this.getPrev(this.currentStep);
                this.play(this.currentStep, 'backward');
            },
            getNext: function(currentStep) {
                return currentStep + 1 >= this.steps.length ? 0 : currentStep + 1;
            },
            getPrev: function(currentStep) {
                return currentStep - 1 < 0 ? this.steps.length - 1 : currentStep - 1;
            },
            play: function(currentStep, direction) {
                var _self = this;
                $('.ui-formSlide').removeClass('forward backward').addClass(direction);
                $(this.steps[currentStep])
                .addClass("active")
                .siblings("[data-step]")
                .removeClass("active");
                setTimeout(function() {
                $(_self.steps[currentStep])
                    .find(".ui-step-content")
                    .addClass("in")
                    .end()
                    .siblings("li")
                    .find(".ui-step-content")
                    .removeClass("in");
                }, 300);
            },
            animateHeight: function(targetHeight) {
                $(".ui-formSlide").animate(
                {
                    height: targetHeight + "px"
                },
                10,
                function() {
                    $(".ui-formSlide").css("height", "auto");
                }
                );
            }
            };

            $(document).ready(function() {
            uiFormSlide.init();

            $("#btnNext").click(function() {
                uiFormSlide.next();
                console.log("next");
            });
            $("#btnPrev").click(function() {
                uiFormSlide.prev();
            });
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

        productslider: function () {
            $(".product-slide").slick({
                dots: true,
                infinite: true,
            });
        },

        sidebarslide: function () {
        jQuery(function() {
	
            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
            
            $("#my-cart").click(function(e) {
                e.preventDefault();
                $("#my-cart-wrapper").toggleClass("toggled");
            });
        });
        },

        tooltip: function () {
            $(document).ready(function(){
                $('[data-toggle="popover"]').popover({
                    trigger: 'hover',
                    html: true,
                    title: function () {
                        return '<div><span class="'+ $(this).data('icon') +'"></span> <span>'+ $(this).data('title') +'</span></div>'
                    },
                 })
           });
        },  

       

        clone: function () {
            $(document).ready(function() {
                var count = 0;
                $(".add__area__button").click(function(){
                  count++;
                  $(".area__wrap__outer .area__wrap").clone().appendTo(".clone__area");
                });
             
            });
        },

        // labeltotext: function () {
        // $(document).ready(function() {
        //     $('a.edit').click(function () {
        //         var dad = $(this).parent().parent();
        //         dad.find('label').hide();
        //         dad.find('input[type="text"]').show().focus();
        //     });
            
        //     $('input[type=text]').focusout(function() {
        //         var dad = $(this).parent();
        //         $(this).hide();
        //         dad.find('label').show();
        //     });
        // });
        // },

        slidetoggle: function () {
            $(document).ready(function() {
                $('.show--calculator').click(function() {
                        $('.square__feet__wrapper').slideToggle("fast");
                });
            });
        },

        hideshow: function () {
            $(document).ready(function() {
                $('.btn-wrap').click(function() {
                        $('.add--address--section').slideToggle("fast");
                });
            });
        },

        addcard: function () {
            $(document).ready(function() {
                $('.add--card').click(function() {
                        $('.add--card--section').slideToggle("fast");
                });
            });
        },

        datepicker: function () {
            $(function () {
                $("#datepicker").datepicker({ 
                        autoclose: true, 
                        todayHighlight: true
                }).datepicker('update', new Date());
            });
        },

        changeimage: function () {
            $('.thumbnail').on('click', function() {
            var clicked = $(this);
            var newSelection = clicked.data('big');
            var $img = $('.primary').css("background-image","url(" + newSelection + ")");
            clicked.parent().find('.thumbnail').removeClass('selected');
            clicked.addClass('selected');
            $('.primary').empty().append($img.hide().fadeIn('slow'));
            });
        },    

        equalheight: function () {
            var highestBox = 0;
      
            $('.products__listings .product__wrap .product__description').each(function(){
            if($(this).height() > highestBox) {
            highestBox = $(this).height(); 
            }
      
            });  
            
            $('.products__listings .product__wrap .product__description').height(highestBox);
        },

        selectbox: function () {
            $(document).ready(function() {
  
                $(".js-select2").select2();
                
                $(".js-select2-multi").select2();
                
                $(".large").select2({
                    dropdownCssClass: "big-drop",
                });
            
            });
        },

        

        navigation: function () {
            $('nav ul li a:not(:only-child)').click(function (e) {
                $(this).siblings('.nav__dropdown').toggle();
                // Close one dropdown when selecting another
                $('.nav__dropdown').not($(this).siblings()).hide();
                e.stopPropagation();
            });
            // Clicking away from dropdown will remove the dropdown class
            $('html').click(function () {
                $('.nav__dropdown').hide();
            });
            // Toggle open and close nav styles on click
            $('#nav__toggle').click(function () {
                $('nav ul').slideToggle();
            });
            // Hamburger to X toggle
            $('#nav__toggle').on('click', function () {
                this.classList.toggle('active');
            });
        },

        accordion: function () {
            $('.accordion-item__title').click(function (e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.hasClass("active")) {
                    $this.removeClass("active");
                    $this.siblings(".accordion-item__body").slideUp(200);
                } else {
                    $(".accordion-item__title").removeClass("active");
                    $this.addClass("active");
                    $(".accordion-item__body").slideUp(200);
                    $this.siblings(".accordion-item__body").slideDown(200);
                }
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

        stickySidebar: function() {
            if($('.aside-wrapper').length !== 0) {
                var sidebar = new StickySidebar('.aside-wrapper__outer', {
                    topSpacing: 0,
                    bottomSpacing: 100,
                    containerSelector: 'aside',
                    innerWrapperSelector: '.aside-wrapper__inner'
                });
            }
        },
    };
    SOD.init();
}(jQuery));
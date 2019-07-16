(function($) {
    "use strict";
    jQuery(document).on('ready', function() {
        $('.navbar .navbar-nav li a').on('click', function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1500);
            e.preventDefault()
        });
        $(document).on('click', '.navbar-collapse.in', function(e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide')
            }
        });
        $('.navbar .navbar-nav li a').on('click', function() {
            $('.navbar-collapse').collapse('hide')
        });
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 50) {
                $('.header-sticky').addClass("is-sticky")
            } else {
                $('.header-sticky').removeClass("is-sticky")
            }
        });
        $('.popup-youtube').magnificPopup({
            items: {
                src: 'https://www.youtube.com/watch?time_continue=30&v=z02ZOKb_eNI'
            },
            type: 'iframe',
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    }
                },
                srcAction: 'iframe_src',
            }
        });


        function initTabNav() {
            const tabMenu = document.querySelectorAll('[data-tab="menu"] li');
            const tabContent = document.querySelectorAll('[data-tab="content"] section');
            const itemMenu = document.querySelectorAll('.itens-options li');
            if (tabMenu.length && tabContent.length) {
                tabContent[0].classList.add('ativo');

                function activeTab(index) {
                    tabContent.forEach((section) => {
                        section.classList.remove('ativo')
                    });
                    const direcao = tabContent[index].dataset.anime;
                    tabContent[index].classList.add('ativo', direcao)
                }

                function activeMenu(index) {
                    itemMenu.forEach((li) => {
                        console.log(li)
                        li.classList.remove('ativo')
                    });
                    itemMenu[index].classList.add('ativo')
                }
                tabMenu.forEach((itemMenu, index) => {
                    itemMenu.addEventListener('click', () => {
                        activeMenu(index)
                    })
                });
                tabMenu.forEach((itemMenu, index) => {
                    itemMenu.addEventListener('click', () => {
                        activeTab(index)
                    })
                })
            }
        }
        initTabNav();


        // Mobile nav touch hover script
        $(document).ready(function(){

            var container = $('#nav-button');
            var list = $('.sub-nav');

            var flag = false;

        container.bind('touchstart', function(){
        if (!flag) {
            flag = true;
            setTimeout(function(){ flag = false; }, 260);
            list.toggleClass('show-nav');
        }
        return false
        });

        container.hover(function(){
            list.addClass('show-nav');
            }, function(){
            list.removeClass('show-nav');
            });
        });

        $(".owl-prev").html('<i class="fa fa-chevron-left"></i>');
        $(".owl-next").html('<i class="fa fa-chevron-right"></i>');
        var $screen = $("#screen"),
            $text = $("#text"),
            flag = !1,
            duration = 300;
        $screen.owlCarousel({
            items: 1,
            autoplay: !0,
            margin: 10,
            nav: !1,
            dots: !0,
        }).on('changed.owl.carousel', function(e) {
            if (!flag) {
                flag = !0;
                var a = e.property.value++;
                $(".owl-dot").removeClass("active");
                $('.owl-dot').eq(a).addClass("active");
                $text.trigger('to.owl.carousel', [e.item.index, duration, !0]);
                flag = !1
            }
        });
        $text.owlCarousel({
            margin: 20,
            items: 1,
            nav: !1,
            autoplay: !1,
            center: !1,
            dots: !1,
        }).on('click', '.owl-item', function() {
            $screen.trigger('to.owl.carousel', [$(this).index(), duration, !0])
        }).on('changed.owl.carousel', function(e) {
            if (!flag) {
                flag = !0;
                var a = e.property.value++;
                $(".owl-dot").removeClass("active");
                $('.owl-dot').eq(a).addClass("active");
                $screen.trigger('to.owl.carousel', [e.item.index, duration, !0]);
                flag = !1
            }
        });
        $(function() {
            $(window).on('scroll', function() {
                var scrolled = $(window).scrollTop();
                if (scrolled > 300) $('.go-top').fadeIn('slow');
                if (scrolled < 300) $('.go-top').fadeOut('slow')
            });
            $('.go-top').on('click', function() {
                $("html, body").animate({
                    scrollTop: "0"
                }, 500)
            })
        });
        $("#inputFilter").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#accordionFaqMain .card").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            })
        });
        $('.testimonial-slider').owlCarousel({
            items: 1,
            loop: !0,
            autoplay: !0,
            nav: !1,
            mouseDrag: !0,
            autoplayHoverPause: !0,
            responsiveClass: !0,
            dots: !0,
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                1200: {
                    items: 3,
                }
            }
        });
        var TxtType = function(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = !1
        };
        TxtType.prototype.tick = function() {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1)
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1)
            }
            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
            var that = this;
            var delta = 200 - Math.random() * 100;
            if (this.isDeleting) {
                delta /= 2
            }
            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = !0
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = !1;
                this.loopNum++;
                delta = 500
            }
            setTimeout(function() {
                that.tick()
            }, delta)
        };
        window.onload = function() {
            var elements = document.getElementsByClassName('typewrite');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period)
                }
            }
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
            document.body.appendChild(css)
        }
    });
    jQuery(window).on('load', function() {
        $('.preloader').fadeOut()
    })
}(jQuery))
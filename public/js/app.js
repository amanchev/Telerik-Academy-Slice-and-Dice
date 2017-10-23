let begin;

function init() {

    $(document).ready(function() {
        // Configure/customize these variables.
        var showChar = 80; // How many characters are shown by default
        var ellipsestext = "...";
        var moretext = "More >";
        var lesstext = "Show less";


        $('.more').each(function() {
            var content = $(this).html();

            if (content.length > showChar) {

                var c = content.substr(0, showChar);
                var h = content.substr(showChar, content.length - showChar);

                var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

                $(this).html(html);
            }

        });

        $(".morelink").click(function() {
            if ($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moretext);
            } else {
                $(this).addClass("less");
                $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });
    });


    let e = $("#price");
    let val = getParameterByName('sort') || 'ascending'
    $("#price").val(val);
    e.on('change', () => {
        let priceSort = e.val();
        window.location.href = updateQueryStringParameter(window.location.href, 'sort', priceSort)
    })

    let pageCount = $('#paginate li').length;
    let pageQuery = getParameterByName('page');
    if (pageQuery > pageCount) {
        window.location.href = updateQueryStringParameter(window.location.href, 'page', 1);
    }


    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    $('#paginate a').on('click', (el) => {
        let page = el.target.attributes.page.nodeValue;
        window.location.href = updateQueryStringParameter(window.location.href, 'page', page)

    })
    $('#brand-filter :radio').change((el) => {
        let brand = el.target.value;
        window.location.href = updateQueryStringParameter(window.location.href, 'brand', brand)
    })
    $('#tag-filter :radio').change((el) => {
        let tag = el.target.value;
        window.location.href = updateQueryStringParameter(window.location.href, 'tags', tag)
    })
    let resVal = getParameterByName('resolution');
    $("input[name=resolution][value=" + resVal + "]").prop('checked', true);
    $('#resolution-filter :radio').change((el) => {
        let res = el.target.value;
        window.location.href = updateQueryStringParameter(window.location.href, 'resolution', res)
    })
    let sizeVal = getParameterByName('inches');
    $("input[name=size][value=" + sizeVal + "]").prop('checked', true);
    $('#size-filter :radio').change((el) => {
        let size = el.target.value;
        window.location.href = updateQueryStringParameter(window.location.href, 'inches', size)
    })
    let brandVal = getParameterByName('brand');
    $("input[name=brand][value=" + brandVal + "]").prop('checked', true);

    let tagVal = getParameterByName('tags')
    $("input[name=tag][value=" + tagVal + "]").prop('checked', true);


    $('.slides-nav-arrows').on('click', 'li', changeSlide);

    $('.slides-nav').on('click', 'li', changeSlideFromNav);

    let startTimer = () => {
        begin = setInterval(countdown, 5000);
    }

    let stopTimer = () => {
        clearInterval(begin) // clear the interval and stop the clock
    }

    let countdown = () => $('.slide-next-btn').trigger('click');

    if (!begin) {
        $('.article div').on({
            mouseenter: hoverArticle,
            mouseleave: leaveArticle
        }, 'a');

        $('.mm-thumb, .mm-thumb-last').on({
            mouseenter: hoverMediaIcon,
            mouseleave: leaveMediaIcon
        }, 'a');

        $('.mm-control').on('click', '> a', changeMmSlide);


        $('.small-menu').on('click', toggleSmallMenu);

        $('.small-menu-items a').on('click', toggleSmallMenu);

    } else {
        stopTimer();

    }
    startTimer();


    function hoverArticle(e) {
        $(e.target).fadeTo(200, 0.8);
        $(e.target.nextElementSibling).fadeTo(200, 1);
    }

    function leaveArticle(e) {
        $(e.target).fadeTo(200, 1);
        $(e.target.nextElementSibling).fadeTo(200, 0);
    }

    function hoverMediaIcon(e) {
        $(e.target).fadeTo(200, 0.8);
        $(e.target.nextElementSibling).fadeTo(200, 1);
        let description = $($(e.target).parent()).parent().children('div');
        $(description).fadeTo(200, 1).css('display', 'block');
    }

    function leaveMediaIcon(e) {
        $(e.target).fadeTo(200, 1);
        $(e.target.nextElementSibling).fadeTo(200, 0);
        let description = $($(e.target).parent()).parent().children('div');
        $(description).fadeTo(200, 0).css('display', 'none');
    }

    function changeMmSlide(e) {
        e.preventDefault();
        let left = $(e.target).hasClass('mm-left-arrow'),
            slidesCount = $('#mm-slides').children('div').length,
            i,
            activeSlideNumber,
            prevSlideNumber,
            nextSlideNumber;
        for (i = 0; i < slidesCount; i += 1) {
            activeSlideNumber = $('#mm-slides').children('div')[i];
            if ($(activeSlideNumber).hasClass('mm-slide-active')) {
                activeSlideNumber = i;
                break;
            }
        }

        if (activeSlideNumber !== 0) {
            prevSlideNumber = activeSlideNumber - 1;
        } else {
            prevSlideNumber = slidesCount - 1;
        }

        if (activeSlideNumber !== slidesCount - 1) {
            nextSlideNumber = activeSlideNumber + 1;
        } else {
            nextSlideNumber = 0;
        }

        $($('#mm-slides').children('div')[activeSlideNumber])
            .fadeTo(200, 0).css('display', 'none')
            .removeClass('mm-slide-active');
        if (left) {
            $($('#mm-slides').children('div')[prevSlideNumber])
                .fadeTo(200, 1)
                .css('display', 'flex')
                .addClass('mm-slide-active');
        } else {
            $($('#mm-slides').children('div')[nextSlideNumber])
                .fadeTo(200, 1)
                .css('display', 'flex')
                .addClass('mm-slide-active');
        }
    }

    function changeSlide(e) {
        let slides = $('.slides').children('li'),
            slidesCount = slides.length,
            i,
            activeSlide,
            prev,
            next,
            slidesNav = $('.slides-nav').children('li');

        for (i = 0; i < slidesCount; i += 1) {
            if ($(slides[i]).hasClass('slide-active')) {
                activeSlide = i;
                break;
            }
        }

        if (activeSlide !== 0) {
            prev = activeSlide - 1;
        } else {
            prev = slidesCount - 1;
        }

        if (activeSlide !== slidesCount - 1) {
            next = activeSlide + 1;
        } else {
            next = 0;
        }

        if ($(e.target).hasClass('slide-prev-btn')) {
            $(slides[prev]).fadeTo(300, 1).addClass('slide-active').css('display', 'block');
            $(slides[activeSlide]).fadeTo(300, 0).removeClass('slide-active').css('display', 'none');
            $(slidesNav[prev]).addClass('slides-nav-active');
            $(slidesNav[activeSlide]).removeClass('slides-nav-active');
        } else {
            $(slides[next]).fadeTo(300, 1).addClass('slide-active').css('display', 'block');
            $(slides[activeSlide]).fadeTo(300, 0).removeClass('slide-active').css('display', 'none');
            $(slidesNav[next]).addClass('slides-nav-active');
            $(slidesNav[activeSlide]).removeClass('slides-nav-active');
        }
    }

    function changeSlideFromNav(e) {
        let slides = $('.slides').children('li'),
            i,
            activeSlide,
            caller,
            slidesNav = $('.slides-nav').children('li');

        for (i = 0; i < slides.length; i += 1) {
            if ($(slides[i]).hasClass('slide-active')) {
                activeSlide = i;
                break;
            }
        }

        caller = $(e.target).text() * 1;

        $(slides[caller]).fadeTo(300, 1).addClass('slide-active').css('display', 'block');
        $(slides[activeSlide]).fadeTo(300, 0).removeClass('slide-active').css('display', 'none');
        $(slidesNav[caller]).addClass('slides-nav-active');
        $(slidesNav[activeSlide]).removeClass('slides-nav-active');
    }

    function toggleSmallMenu(e) {
        let $menu = $('.small-menu-items');
        if ($menu.css('display') == 'block') {
            $menu.fadeOut(50);

        } else {
            $menu.fadeIn(50);
        }
    }
}
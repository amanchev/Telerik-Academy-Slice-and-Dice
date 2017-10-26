import * as data from 'data';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');
let begin;


export function get() {

    Promise.all([
            loadTemplate('home'),

        ])
        .then(([template]) => {

            $appContainer.html(template());

            $('.slides-nav-arrows').on('click', 'li', changeSlide);

            $('.slides-nav').on('click', 'li', changeSlideFromNav);

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

            if (begin) {
                stopTimer();
            }
            startTimer();

            function startTimer() {
                begin = setInterval(triggerClick, 5000);
            }

            function stopTimer() {
                clearInterval(begin)
            }

            function triggerClick() {
                $('.slide-next-btn').trigger('click');
            }

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
        })
}
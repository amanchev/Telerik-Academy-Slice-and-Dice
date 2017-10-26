import * as data from 'data';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');



export function get() {

    let url = new URL(window.location.href.replace('/#', ''));
    let query = new URLSearchParams(url.search);

    Promise.all([
            loadTemplate('products'),
            data.getProducts(query)
        ])
        .then(([template, context]) => {
            $appContainer.html(template(context));

            let queryKeys = [];
            let queryValue = [];
            let queries = query.toString().split(/\?|=|&/);
            let len = queries.length;

            if (len === 1) len = 0;

            for (let i = 0; i < len; i += 2) {
                queryKeys.push(queries[i]);
                queryValue.push(queries[i + 1])
            }

            for (var i = 0; i < queryKeys.length; i += 1) {
                $("input[name=" + queryKeys[i] + "][value=" + queryValue[i] + "]").prop('checked', true);
                if (queryKeys[i] === 'sort') {
                    $("#price").val(queryValue[i]);
                }
            }

            $('input[type="radio"]').on('change', (event) => {

                let key = event.target.getAttribute('name')
                let value = event.target.getAttribute('value')

                query.set(key, value);

                window.location.hash = updateQueryStringParameter(window.location.hash, key, value);
            })

            $('#price').on('change', (event) => {

                let key = 'sort';
                let value = $('#price').val()

                query.set(key, value);

                window.location.hash = updateQueryStringParameter(window.location.hash, key, value);
            })
            addReadMore();
        })

}

function addReadMore() {
    var showChar = 80;
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
};

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}
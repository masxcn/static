$(function () {
    var changeAnimate = function (slide) {
        var $content = $(slide).find('.content');
        if ($content.length > 0) {
            $content.find('.title').removeClass('animated fadeInUp');
            $content.find('.slogan').removeClass('animated fadeInUp');
            $content.find('.link').removeClass('animated fadeInUp');
            setTimeout(function () {
                $content.find('.title').addClass('animated fadeInUp');
                $content.find('.slogan').addClass('animated fadeInUp');
                $content.find('.link').addClass('animated fadeInUp');
            }, 0);
        }
    };
    var swiper = new Swiper('#Banner_1 .swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        autoplay: {
            delay: 3000
        },
        observer: true,
        observeParents: true,
        on: {
            observerUpdate: function () {
                swiperRefresh();
            },
            resize: function () {
                swiperRefresh();
            }
        }
    });
    var swiperRefresh = function () {
        setTimeout(function () {
            swiper.update();
        }, 500);
    };
    changeAnimate(swiper.slides[swiper.activeIndex]);
    swiper.on('slideChange', function () {
        changeAnimate(swiper.slides[swiper.activeIndex]);
    });
    $('#gotop').click(function () {
        $("html").animate({scrollTop:0}, 'fast');
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) {
            $('#gotop').fadeIn(500);
        } else {
            $('#gotop').fadeOut(500);
        }
    });
});
layui.use(['form', 'flow', 'jquery'], function () {
    layui.flow.lazyimg();
    var checkbox = '&ensp;<input type="checkbox" lay-filter="chinese" title="简体|繁体"';
    if (getCookie('chinese') == 't') {
        layui.$('#chinese').html(checkbox + ' lay-skin="switch" checked="checked">');
        zh_tran('t');
    } else {
        layui.$('#chinese').html(checkbox + ' lay-skin="switch">');
    }
    layui.form.render();
    layui.form.on('switch(chinese)', function(data) {
        if (data.elem.checked) {
            setCookie('chinese', 't', 30);
            zh_tran('t');
        } else {
            setCookie('chinese', 's', 30);
            zh_tran('s');
        }
    });
    layui.$("#data-cycle").change(function(){
        var params = getParams();
        params.cycle = layui.$("#data-cycle option:selected").val();
        location.href = location.pathname + '?' + layui.$.param(params);
    });
});

function getParams() {
    var params = {};
    var query = location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == 'page') {continue;}
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    document.cookie = cname + "=" + cvalue + "; expires=" + d.toGMTString();
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return '';
}
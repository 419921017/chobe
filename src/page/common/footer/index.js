import { switchIntl } from 'utils/intl'
const pageFn = {
  init: function () {
    $('.up_n').hide()
    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        $('.up_n').show();
      } else {
        $('.up_n').hide();
      }
    });

    //bottom 手机
    $(".bNavPh a").click(function () {
      $(this).find(".ewm").slideToggle();
    });

    //返回头部
    $("#imgotop").on("click", function () {
      $("body,html").animate({
        scrollTop: 0
      }, 500);
    });

    //返回顶部
    $(".divBox").on("click", function () {
      $("body,html").animate({
        scrollTop: 0
      }, 500);
    });

    //底部
    if ($(window).width() < 992) {
      $(".footUl .ttit").on("touchstart", function () {
        $(this).toggleClass("active");
        $(this).parent().siblings().find(".ttit").removeClass('active');
        $(this).siblings("ul").slideToggle();
        $(this).parent().siblings().find("ul").slideUp();
      });
    }

    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: false,
      live: true
    })
    wow.init();
  },
  loadIntl: function () {
    //页面加载最后执行
    setTimeout(() => {
      switchIntl();
    }, 100)
  }
}
$(function () {
  pageFn.init();
  pageFn.loadIntl();
})
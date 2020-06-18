require('../common');

$(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() >= $(".top1").height() + $(".c_banner").height()) {
      $(".erji").addClass("on")
    } else {
      $(".erji").removeClass("on")
    }
  });
  
  $('#left_9').addClass('on');
  maodian('.hd', '.bd');
  // 关于我们
  $('.ab2Ul').slick({
    dots: false,
    arrows: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    fade: true,
  });
  //关于我们 团队
  $('.ab3Ul').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1630,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });
})
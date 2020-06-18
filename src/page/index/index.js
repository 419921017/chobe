require('../common');

$(function () {
  $('.slide1').slick({
    dots: true,
    arrows: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    fade: true,
  });

  //日期
  $('.in3Ul .time').each(function (index, item) {
    let _date = $(this).attr('data-date').split('-');
    $(this).html('<span class="day">' + _date[2] + '</span>' + _date[0] + '.' + _date[1])
  });

  //首页 被投企业
  $('.index2Ul').slick({
    centerMode: true,
    centerPadding: '22.7%',
    slidesToShow: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: '20px',
        }
      },
    ]
  });
  //首页 新闻
  $('.in3Ul').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });
})
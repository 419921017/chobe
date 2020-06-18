
import { helper } from 'utils';
import Cookies from 'js-cookie';
import { deliveries } from 'utils/data';
import { intlType } from 'utils/constants';

require('../common');

var templateSlides = require('./slides.template');
var templateBottom = require('./bottom.template');

const pageFn = {
  init: function () {
    $(window).scroll(function () {
      if ($(window).scrollTop() >= $(".top1").height() + $(".c_banner").height()) {
        $(".erji").addClass("on")
      } else {
        $(".erji").removeClass("on")
      }
    });
    $('#left_11').addClass('on');
    $('#nav_3').addClass('on');
    $('.comDeT').slick({
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: '.comDeD',
      autoplay: true,
      autoplaySpeed: 5000
    });
    $('.comDeD').slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      asNavFor: '.comDeT',
      focusOnSelect: true,
      autoplay: true,
      arrows: false,
      dots: false,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        }
      ]
    });
  },
  renderContent: function () {
    const id = helper.getUrlParam("id");
    $("#delivery_banner").html(`<img src="images/news/banner_${id}.jpg" width="100%" height="650" title="" alt="">`)
    const newsItem = deliveries.find(i => i.id === Number(id));
    const type = Cookies.get('page_intl');
    let title = newsItem.title;
    let subTitle = newsItem.subTitle;
    let descript = newsItem.descript;
    if (Number(type) === intlType.en) {
      title = newsItem.enTitle;
      subTitle = newsItem.enSubTitle;
      descript = newsItem.enDescript;
    }
    const obj = {
      title,
      subTitle,
      descript,
      list: newsItem.images.map(i => ({ img: "images/news/" + i }))
    }
    const result = helper.renderHtml(templateSlides, obj);
    const $content = $('#page_content')
    $content.html(result);
  },
  renderNextPage: function () {
    const id = helper.getUrlParam("id");
    const index = deliveries.findIndex(i => i.id === Number(id));
    let list = [];
    if (index === 0) {
      list = [deliveries[deliveries.length - 1], deliveries[index + 1]]
    } else if (index === deliveries.length - 1) {
      list = [deliveries[index - 1], deliveries[0]]
    } else {
      list = [deliveries[index - 1], deliveries[index + 1]]
    }
    const type = Cookies.get('page_intl');
    list = list.map(item => {
      return {
        id: item.id,
        title: Number(type) === intlType.en ? item.enTitle : item.title,
        img: "images/news/" + item.img,
        subTitle: Number(type) === intlType.en ? item.enSubTitle : item.subTitle,
        descript: Number(type) === intlType.en ? item.enDescript : item.descript,
      }
    })
    const result = helper.renderHtml(templateBottom, { list });
    const $content = $('#delivery_bottom')
    $content.html(result);
  }
}

$(function () {
  pageFn.renderContent();
  pageFn.renderNextPage();
  pageFn.init();
});
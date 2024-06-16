
import { helper } from 'utils';
import Cookies from 'js-cookie';
import { deliveries } from 'utils/data';
import { intlType, deliveryType } from 'utils/constants';

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
  },
  renderSildes: function () {
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
    const _this = this;
    const id = helper.getUrlParam("id");

    const intl = Cookies.get('page_intl');
    const type = Number(helper.getUrlParam("type")) || 1;
    helper.request({
      data: {
        func: "articleList",
        article_type: deliveryType[type - 1],
      },
      success: function (data) {
        let list = data.map(item => {
          return {
            ...item,
            title: Number(intl) === intlType.en ? item.title_en : item.title,
            img: item.cover_image,
            subTitle: Number(intl) === intlType.en ? item.desc_en : item.desc,
            descript: Number(intl) === intlType.en ? item.content_en : item.content,
            list: item.images.map(i => ({ img: i })),
            type,
          }
        })
        const newsItem = list.find(i => i.id == id);
        
        $("#delivery_banner").html(`<img src="${newsItem.banner}" width="100%" height="650" title="" alt="">`);

        const result = helper.renderHtml(templateSlides, { ...newsItem });
        const $content = $('#page_content')
        $content.html(result);
        _this.renderSildes();
        _this.renderNextPage(list);
      }
    })

  },
  renderNextPage: function (deliveries) {
    const id = helper.getUrlParam("id");
    const index = deliveries.findIndex(i => i.id == id);
    let list = [];
    if (index === 0) {
      list = [deliveries[deliveries.length - 1], deliveries[index + 1]]
    } else if (index === deliveries.length - 1) {
      list = [deliveries[index - 1], deliveries[0]]
    } else {
      list = [deliveries[index - 1], deliveries[index + 1]]
    }
    const result = helper.renderHtml(templateBottom, { list });
    const $content = $('#delivery_bottom')
    $content.html(result);
  }
}

$(function () {
  pageFn.renderContent();
  pageFn.init();
});
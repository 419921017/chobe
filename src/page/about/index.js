

import { helper } from 'utils';
import Cookies from 'js-cookie';
import { deliveries } from 'utils/data';
import { intlType } from 'utils/constants';

require('../common');

const indexTemp = require('./index.template');

const pageFn = {
  init: function () {
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
  },
  getFounder: function () {
    const type = Cookies.get('page_intl');

    helper.request({
      data: {
        func: "articleList",
        article_type: "公司创始人",
      },
      success: function (data) {
        let list = data.map(item => {
          return {
            ...item,
            name: Number(type) === intlType.en ? item.name_en : item.name,
            content: Number(type) === intlType.en ? item.introduction_en : item.introduction,
          }
        })
        const result = helper.renderHtml(indexTemp, { list });
        const $founder = $('#founder');
        $founder.html(result);
      }
    })
  },
  getProfile: function () {
    const type = Cookies.get('page_intl');
    helper.request({
      data: {
        func: "articleList",
        article_type: "公司简介",
      },
      success: function (data) {
        const $title = $('#title');
        $title.html(Number(type) === intlType.en ? data.title_en : data.title);
        const $content = $('#content');
        $content.html(Number(type) === intlType.en ? data.content_en : data.content);
      }
    })
  }
}

$(function () {
  pageFn.init();
  pageFn.getProfile();
  pageFn.getFounder();
})
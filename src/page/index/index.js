import { helper } from 'utils';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { intlType, deliveryType, newsType } from 'utils/constants';

require('../common');

const delivery = require('./delivery.template');
const news = require('./news.template');

const pageFn = {
  init: function () {
    this.loadData();
  },
  loadData: function () {
    this.loadDelivery();
    this.loadNews();
    this.bindEvent();
  },
  loadDelivery: function () {
    const intl = Cookies.get('page_intl');
    helper.request({
      data: {
        func: "articleList",
        article_type: deliveryType[0],
      },
      success: function (data) {
        let list = data.map(item => {
          return {
            ...item,
            title: Number(intl) === intlType.en ? item.title_en : item.title,
            img: item.cover_image,
            subTitle: Number(intl) === intlType.en ? item.desc_en : item.desc,
            descript: Number(intl) === intlType.en ? item.content_en : item.content,
            path: `delivery_detail.html?id=${item.id}&type=1`,
            icon: "/images/p68889474.png"
          }
        })
        const result = helper.renderHtml(delivery, { list: list || [] });
        const $delivery_list = $('#delivery_list');
        $delivery_list.html(result);

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
      }
    })
  },
  loadNews: function () {
    const intl = Cookies.get('page_intl');
    helper.request({
      data: {
        func: "articleList",
        article_type: newsType[0],
      },
      success: function (data) {
        let list = data.map(item => {
          return {
            ...item,
            title: Number(intl) === intlType.en ? item.title_en : item.title,
            author: item.author,
            img: item.image,
            content: Number(intl) === intlType.en ? item.contentA_en : item.contentA,
            year: dayjs(item.created_time, "YYYY-MM-DD HH:mm").format('YYYY-MM'),
            day: dayjs(item.created_time, "YYYY-MM-DD HH:mm").format('DD'),
            path: `news_detail.html?id=${item.id}&type=1`

          }
        })
        const result = helper.renderHtml(news, { list: list || [] });
        const $news_list = $('#news_list');
        $news_list.html(result);

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
      }
    })
  },
  bindEvent: function () {
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
  }
}

$(function () {
  pageFn.init();
})
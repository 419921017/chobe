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
  loadDelivery: async function () {
    const _this = this;
    const intl = Cookies.get('page_intl');
    const promise = deliveryType.map(item => {
      return _this.getAllRequest(item)
    })
    const all = await Promise.all(promise);
    let list = [];
    all.forEach((data, index) => {
      data.forEach(item => {
        if (item.id) {
          const obj = {
            ...item,
            title: Number(intl) === intlType.en ? item.title_en : item.title,
            img: item.cover_image,
            subTitle: Number(intl) === intlType.en ? item.desc_en : item.desc,
            descript: Number(intl) === intlType.en ? item.content_en : item.content,
            path: `delivery_detail.html?id=${item.id}&type=${index + 1}`,
            icon: "/images/p68889474.png"
          }
          list.push(obj);
        }
      })
    });

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
  },
  loadNews: async function () {
    
    const _this = this;
    const intl = Cookies.get('page_intl');
    const promise = newsType.map(item => {
      return _this.getAllRequest(item)
    })
    const all = await Promise.all(promise);
    let list = [];
    all.forEach((data, index) => {
      data.forEach(item => {
        if (item.id) {
          let contentList = Number(intl) === intlType.en ? item.content_en : item.content;
          let img = "";
          let content = "";
          contentList.forEach(item => {
            if (item.indexOf('.jpg') > -1) {
              if (!img) {
                img = item;
              }
            } else {
              content += `<p>${item}</p>`;
            }
          })
          const obj = {
            ...item,
            title: Number(intl) === intlType.en ? item.title_en : item.title,
            author: item.author,
            img,
            content,
            year: dayjs(item.created_time, "YYYY-MM-DD HH:mm").format('YYYY-MM'),
            day: dayjs(item.created_time, "YYYY-MM-DD HH:mm").format('DD'),
            path: `news_detail.html?id=${item.id}&type=${index + 1}`
          }
          list.push(obj)
        }
      })
    });
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
  },
  getAllRequest: function (name) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'post',
        url: 'http://api.chobe.cn/interface.php',
        dataType: 'json',
        data: JSON.stringify({
          func: "articleList",
          article_type: name,
        }),
        success: function (res) {
          if (res.code === 200) {//请求成功
            resolve(res.data)
          }
        },
        error: function (err) {
          resolve([])
        }
      });
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
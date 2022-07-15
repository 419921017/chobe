
import { helper } from 'utils';
import Cookies from 'js-cookie';
import { intlType, newsType } from 'utils/constants';
import dayjs from 'dayjs';

require('../common');
var templateIndex = require('./index.template');

const pageFn = {
  init: function () {
    this.renderContent();
  },
  renderContent: function () {
    const intl = Cookies.get('page_intl');
    const type = Number(helper.getUrlParam("type")) || 1;
    helper.request({
      data: {
        func: "articleList",
        article_type: newsType[type - 1],
      },
      success: function (data) {
        let list = data.map(item => {
          let contentList = Number(intl) === intlType.en ? item.content_en : item.content;
          let img = "";
          let content = "";
          contentList?.slice(1).forEach(item => {
            if (item.indexOf('.jpg') > -1) {
              if (!img) {
                img = item;
              }
            } else {
              content += `<p>${item}</p>`;
            }
          })

          return {
            ...item,
            title: Number(intl) === intlType.en ? item.title_en : item.title,
            author: item.author,
            img,
            content,
            date:dayjs(item.created_time,"YYYY-MM-DD HH:mm").format('MM-DD/ YYYY'),
            year: dayjs(item.created_time, "YYYY-MM-DD HH:mm").format('YYYY-MM'),
            day: dayjs(item.created_time, "YYYY-MM-DD HH:mm").format('DD'),
            path: `news_detail.html?id=${item.id}&type=${type}`
          }
        })
        const result = helper.renderHtml(templateIndex, { list: list || [] });
        const $news_list = $('#news_list');
        $news_list.html(result);
      }
    })
  }
}

$(function () {
  pageFn.init();
})

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
          return {
            ...item,
            title: Number(intl) === intlType.en ? item.title_en : item.title,
            author:item.author,
            img: item.image,
            content: Number(intl) === intlType.en ? item.contentA_en : item.contentA,
            date:dayjs(item.created_time,"YYYY-MM-DD HH:mm").format('MM-DD/ YYYY'),
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
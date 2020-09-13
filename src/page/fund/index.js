
import { helper } from 'utils';
import Cookies from 'js-cookie';
import { intlType, fundType } from 'utils/constants';

require('../common');

var templateIndex = require('./index.template');

const pageFn = {
  init: function () {
    $('#left_11').addClass('on');
  },
  renderContent: function () {
    const intl = Cookies.get('page_intl');
    const type = Number(helper.getUrlParam("type")) || 1;
    helper.request({
      data: {
        func: "articleList",
        article_type: fundType[type - 1],
      },
      success: function (data) {
        let list = data.map(item => {
          return {
            ...item,
            title: Number(intl) === intlType.en ? item.title_en : item.title,
            img: item.cover_image,
            subTitle: Number(intl) === intlType.en ? item.desc_en : item.desc,
            descript: Number(intl) === intlType.en ? item.content_en : item.content,
            path: `fund_detail.html?id=${item.id}&type=${type}`
          }
        })
        const result = helper.renderHtml(templateIndex, { list: list || [] });
        const $list = $('#list');
        $list.html(result);
      }
    })
  }
}

$(function () {
  pageFn.init();
  pageFn.renderContent();
});
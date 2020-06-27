import { helper } from 'utils';
import Cookies from 'js-cookie';
import { 
  intlType, 
  deliveryType,
  // cultureType ,

} from 'utils/constants';

require('../common');

const templateIndex = require("./index.template");

const pageFn = {
  init: function () {
    this.loadData();
  },
  loadData: function () {
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
            content: Number(intl) === intlType.en ? item.content_en : item.content,
            path: `culture_detail.html?id=${item.id}&type=${type}`
          }
        })
        const result = helper.renderHtml(templateIndex, { list: list || [] });
        const $list = $('#list');
        $list.html(result);
      }
    })
  },
}

$(function () {
  pageFn.init();
})
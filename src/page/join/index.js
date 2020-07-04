import { helper } from 'utils';
import Cookies from 'js-cookie';
import { intlType, deliveryType } from 'utils/constants';

require('../common');
const indexTemp = require('./index.template');

const pageFn = {
  init: function () {
    this.renderContent();


  },
  bindEvent: function () {
    $(".listTop").click(function () {
      $(this).siblings(".listDown").slideToggle();
      $(this).parent().siblings().find(".listDown").slideUp();
      $(this).toggleClass("on");
      $(this).parent().siblings().find(".listTop").removeClass('on');
    });
  },
  renderContent: function () {
    const _this = this;
    const intl = Cookies.get('page_intl');
    helper.request({
      data: {
        func: "articleList",
        article_type: "招聘信息",
      },
      success: function (data) {
        let list = data.map(item => {
          let title = item.title;
          let education = item.education;
          let workplace = item.workplace;
          let description = item.description;
          let requirements = item.requirements;
          if (Number(intl) === intlType.en) {
            title = item.title_en;
            education = item.education_en;
            workplace = item.workplace_en;
            description = item.description_en;
            requirements = item.requirements_en;
          }
          return {
            ...item,
            title,
            education,
            workplace,
            description,
            requirements
          }
        })
        const result = helper.renderHtml(indexTemp, { list: list || [] });
        const $list = $('#joinList');
        $list.html(result);
        _this.bindEvent();
      }
    })
  },
}

$(function () {
  pageFn.init();
});



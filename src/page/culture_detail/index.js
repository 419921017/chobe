import { helper } from 'utils';
import Cookies from 'js-cookie';
import {
  intlType,
  cultureType,
} from 'utils/constants';
import polaroidGallery from 'utils/polaroidGallery'

require('../common');

const pageFn = {
  init: function () {
    this.loadData();
  },
  loadData: function () {
    const intl = Cookies.get('page_intl');
    const type = Number(helper.getUrlParam("type")) || 1;
    const _this = this;
    helper.request({
      data: {
        func: "articleList",
        article_type: cultureType[type - 1],
      },
      success: function (data) {
        let list = data.map(item => {
          return {
            ...item,
            title: Number(intl) === intlType.en ? item.title_en : item.title,
            img: item.images,
            content: Number(intl) === intlType.en ? item.content_en : item.content,
          }
        })
        const id = helper.getUrlParam("id");
        const item = list.find(i => i.id === id);
        _this.bindEvent(item)
        let images = item.img.map(i => {
          var pos = i.lastIndexOf('/');
          return {
            name: i,
            caption: i.substring(pos + 1),
            description: "",
          }
        });
        new polaroidGallery(images)
      }
    })
  },

  bindEvent: function (item) {
    console.log(item)
    $("#modal_close").click(function () {
      $("#modal").hide();
    });
    item.content && $("#modal_content").html(item.content)
  }
}

$(function () {
  pageFn.init();
})
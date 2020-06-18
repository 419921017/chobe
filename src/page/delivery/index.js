
import { helper } from 'utils';
import Cookies from 'js-cookie';
import { deliveries } from 'utils/data';
import { intlType } from 'utils/constants';
require('../common');

var templateIndex = require('./index.template');

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

    const type = Cookies.get('page_intl');
    const list = deliveries.map(item => {
      return {
        id: item.id,
        title: Number(type) === intlType.en ? item.enTitle : item.title,
        img: "images/news/" + item.img,
        subTitle: Number(type) === intlType.en ? item.enSubTitle : item.subTitle,
        descript: Number(type) === intlType.en ? item.enDescript : item.descript,
      }
    })

    const result = helper.renderHtml(templateIndex, { list });
    const $list = $('#list');
    $list.html(result);
  }
}

$(function () {
  pageFn.init();
});
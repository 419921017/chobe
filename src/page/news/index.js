
import { helper } from 'utils';
import Cookies from 'js-cookie';
import { intlType, newsType } from 'utils/constants';
import { menus } from 'utils/menu';
import { newsData } from 'utils/data';
import dayjs from 'dayjs';

require('../common');


var templateIndex = require('./index.template');
var templateLeft = require('./left.template');


const pageFn = {
  init: function () {
    this.renderLeft();
    this.renderContent();
  },
  renderLeft: function () {
    const news_type = Number(helper.getUrlParam("newsType")) || newsType.hyxw;
    const url = window.location.pathname;
    const patter = /^\/(.*).html/;
    const name = patter.exec(url) ? patter.exec(url)[1] : 'index';
    const menu_item = menus.find(i => i.key === name);
    const list = menu_item.children.map(i => ({
      name: i.name,
      enName: i.enName,
      className: news_type === i.id ? "on" : '',
      path: i.path,
    }));
    const result = helper.renderHtml(templateLeft, { list });
    const $left_menu = $('#left_menu')
    $left_menu.html(result);
  },
  renderContent: function () {
    const type = Cookies.get('page_intl');
    const news_type = Number(helper.getUrlParam("newsType")) || newsType.hyxw;

    const list = newsData.filter(i => i.type === news_type).map(item => {
      return {
        id: item.id,
        newsType:item.type,
        author:item.author,
        title: Number(type) === intlType.en ? item.enTitle : item.title,
        img: "images/news/" + item.img,
        content: Number(type) === intlType.en ? item.enContent : item.content,
        date:dayjs(item.date).format('MM-DD/ YYYY'),
      }
    })
    const result = helper.renderHtml(templateIndex, { list });
    const $news_list = $('#news_list');
    $news_list.html(result);
  },
  bindDom: function () {

  }
}

$(function () {
  pageFn.init();
})
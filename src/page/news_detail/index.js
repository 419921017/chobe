import { helper } from 'utils';
import Cookies from 'js-cookie';
import { intlType, newsType } from 'utils/constants';
import { switchIntl } from 'utils/intl';
import { menus } from 'utils/menu';
import { newsData } from 'utils/data';
import dayjs from 'dayjs';

require('../common');

const templateLeft = require('./left.template');
const templateHeader = require('./header.template');
const templateXGList = require('./xg.template');

const pageFn = {
  init: function () {
    this.renderLeft();
    this.renderHeader();
    this.renderContent();
    this.renderGLList();
    this.renderXGList();
  },
  renderLeft: function () {
    const news_type = Number(helper.getUrlParam("newsType")) || newsType.hyxw;
    const menu_item = menus.find(i => i.key === 'news');
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
  renderHeader: function () {
    const type = Cookies.get('page_intl');
    const news_id = Number(helper.getUrlParam("id")) || 1;
    const item = newsData.find(i => i.id === news_id);
    const obj = {
      id: item.id,
      newsType: item.type,
      count: item.count,
      title: Number(type) === intlType.en ? item.enTitle : item.title,
      img: 'images/news/back.png',
      content: Number(type) === intlType.en ? item.enContent : item.content,
      date: dayjs(item.date).format('YYYY.MM.DD HH:mm'),
    };

    const result = helper.renderHtml(templateHeader, obj);
    const $news_header = $('#news_header')
    $news_header.html(result);
    $('#title').html(obj.title);
  },
  renderContent: function () {
    const type = Cookies.get('page_intl');
    const news_id = Number(helper.getUrlParam("id")) || 1;
    const item = newsData.find(i => i.id === news_id);
    $('#news_content').html(Number(type) === intlType.en ? item.enContent : item.content);
  },
  renderGLList: function () {
    const id = helper.getUrlParam("id");
    const type = Cookies.get('page_intl');
    const index = newsData.findIndex(i => i.id === Number(id));
    let newHtml = '<a href="javascript:;" class="pageUp elli"><span data-intl="previous">上一篇</span>：<span data-intl="empty">没有了</span></a>';
    let lastHtml = '<a href="javascript:;" class="pageDown elli"><span data-intl="next">下一篇</span>：<span data-intl="empty">没有了</span></a>';
    if (newsData.length > 1) {
      let newItem;
      let lastItem;
      if (index === 0) {
        lastItem = newsData[index + 1];
      }
      if (index === newsData.length - 1) {
        newItem = newsData[index - 1];
      }
      if (index !== 0 && index !== newsData.length - 1) {
        newItem = newsData[index - 1];
        lastItem = newsData[index + 1];
      }
      if (newItem) {
        newHtml = `<a href="/news_detail.html?id=${newItem.id}&newsType=${newItem.type}" class="pageUp elli">
                    <span data-intl="previous">上一篇</span>：
                    <span>
                    ${ Number(type) === intlType.en ? newItem.enTitle : newItem.title}
                    </span>
                  </a>`;
      }
      if (lastItem) {
        lastHtml = `<a href="/news_detail.html?id=${lastItem.id}&newsType=${lastItem.type}" class="pageDown elli">
                      <span data-intl="next">下一篇</span>：
                      <span>
                      ${ Number(type) === intlType.en ? lastItem.enTitle : lastItem.title}
                      </span>
                    </a>`;
      }
      $('#gl_list').html(newHtml + lastHtml)
    }
  },
  renderXGList: function () {
    const id = helper.getUrlParam("id");
    const type = Cookies.get('page_intl');
    const news_type = Number(helper.getUrlParam("newsType")) || newsType.hyxw;
    const newList = newsData.filter(i => i.type === news_type);
    const index = newList.findIndex(i => i.id === Number(id));

    let list = [];
    let emptyObj = {
      title: "没有了",
      enTitle: "nothing",
      date: dayjs().valueOf(),
    }
    let news1 = newList[index - 1] || emptyObj;
    let news2 = newList[index + 1] || emptyObj;
    list = [news1, news2];

    list = list.map(item => {
      return {
        id: item.id,
        type: item.type,
        path: item.id ? `/news_detail.html?id=${item.id}&newsType=${item.type}` : 'javascript:;',
        date: dayjs(item.date).format('YYYY.MM.DD'),
        title: Number(type) === intlType.en ? item.enTitle : item.title,
      }
    });
    const result = helper.renderHtml(templateXGList, { list });
    const $content = $('#xg_list')
    $content.html(result);
  }
}

$(function () {
  pageFn.init();
})
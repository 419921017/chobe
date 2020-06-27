import { helper } from 'utils';
import Cookies from 'js-cookie';
import { intlType, newsType } from 'utils/constants';
import dayjs from 'dayjs';

require('../common');

const templateHeader = require('./header.template');
const templateXGList = require('./xg.template');

const pageFn = {
  init: function () {
    this.getLoad();
  },
  getLoad: function () {
    const _this = this;
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
            author: item.author,
            img: item.image,
            contentA: Number(intl) === intlType.en ? item.contentA_en : item.contentA,
            contentB: Number(intl) === intlType.en ? item.contentB_en : item.contentB,
            date: item.created_time,
            count: item.view_number,
            path: `news.html?type=${type}`,
            imgback: "images/news/back.png"
          }
        });
        _this.renderHeader(list);

      }
    })
  },
  renderHeader: function (list) {
    const news_id = Number(helper.getUrlParam("id")) || 1;
    const item = list.find(i => i.id === news_id);
    const result = helper.renderHtml(templateHeader, item);
    const $news_header = $('#news_header');
    $news_header.html(result);
    $('#title').html(item.title);
    this.renderContent(item);
    this.renderGLList(list);
    this.renderXGList(list);
  },
  renderContent: function (item) {
    $('#news_content').html(`<p>${item.contentA}</p><p>${item.contentB}</p>`);
  },

  renderGLList: function (newsData) {
    const id = helper.getUrlParam("id");
    const index = newsData.findIndex(i => i.id === Number(id));
    const type = Number(helper.getUrlParam("type")) || 1;
    const intl = Cookies.get('page_intl');
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
        newHtml = `<a href="/news_detail.html?id=${newItem.id}&type=${type}" class="pageUp elli">
                    <span data-intl="previous">上一篇</span>：
                    <span>
                    ${ Number(intl) === intlType.en ? newItem.title_en : newItem.title}
                    </span>
                  </a>`;
      }
      if (lastItem) {
        lastHtml = `<a href="/news_detail.html?id=${lastItem.id}&type=${type}" class="pageDown elli">
                      <span data-intl="next">下一篇</span>：
                      <span>
                      ${ Number(intl) === intlType.en ? lastItem.title_en : lastItem.title}
                      </span>
                    </a>`;
      }
      $('#gl_list').html(newHtml + lastHtml);
    }
  },
  renderXGList: function (newList) {
    const id = helper.getUrlParam("id");
    const intl = Cookies.get('page_intl');
    const index = newList.findIndex(i => i.id === Number(id));
    const type = Number(helper.getUrlParam("type")) || 1;

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
        path: item.id ? `/news_detail.html?id=${item.id}&type=${type}` : 'javascript:;',
        date: dayjs(item.date).format('YYYY.MM.DD'),
        title: Number(intl) === intlType.en ? item.enTitle : item.title,
      }
    });
    const result = helper.renderHtml(templateXGList, { list });
    const $content = $('#xg_list')
    $content.html(result);
  }
}

$(function () {
  pageFn.init();
  $("#nav_4").addClass("on")
})
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  page: [
    {
      key: 'index',
      name: '首页',
    },
    {
      key: 'about',
      name: '关于我们',
    },
    {
      key: 'delivery',
      name: '被投企业',
    },
    {
      key: 'delivery_detail',
      name: '企业详情',
    },
    {
      key: 'news',
      name: '新闻动态',
    },
    {
      key: 'news_detail',
      name: "新闻详情",
    },
    {
      key: 'culture',
      name: "企业文化",
    },
    {
      key: 'culture_detail',
      name: '文化详情',
    },
    {
      key: 'welfare',
      name: "乔贝公益",
    },
    {
      key: 'join',
      name: "加入我们",
    },
    {
      key: 'contact',
      name: "联系我们",
    }
  ],
  getHtmlConfig: function (name, title) {
    return {
      template: 'src/view/' + name + '.html',
      filename: name + '.html',
      inject: true,
      hash: true,
      title: title,
      chunks: ['common', name],
    }
  },
  entryList: function () {
    let pageObj = {};

    this.page.forEach(function (item, index) {
      pageObj[item.key] = './src/page/' + item.key + '/index.js';
    });
    return pageObj;
  },
  pluginList: function () {
    let plugs = [];
    const _this = this;
    this.page.forEach(function (item, index) {
      plugs.push(new HtmlWebpackPlugin(_this.getHtmlConfig(item.key, item.name)));
    });
    return plugs;
  }
}
module.exports = config;
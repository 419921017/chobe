var Hogan = require('hogan.js');

export const helper = {
  //封装请求
  request: function (param) {
    var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.tyle || 'json',
      data: param.data || '',
      success: function (res) {
        if (res.status === 0) {//请求成功
          typeof param.success === 'function' && param.success(res.data, res.msg);
        } else if (res.status === 10) {//没有登录
          _this.doLogin();
        } else if (res.status === 1) {//请求错误
          typeof param.error === 'function' && param.error(res.msg);
        } else {
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error: function (err) {
        typeof param.error === 'function' && param.error(err.statusText);
      }
    });
  },
  //获取url参数
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    return r ? decodeURIComponent(r[2]) : null;
  },
  //渲染html模版
  renderHtml: function (htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate);
    var result = template.render(data);
    return result;
  },
}
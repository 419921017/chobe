import { helper } from "utils";
import { menus } from "utils/menu";
var templateLeft = require("./index.template");

const pageFn = {
  init: function () {
    const url = window.location.pathname;
    const patter = /^\/(.*).html/;
    let name = patter.exec(url) ? patter.exec(url)[1] : "index";
    let type = Number(helper.getUrlParam("type"))
      ? Number(helper.getUrlParam("type"))
      : name === "news"
      ? 4
      : 1;
    const urlTemp = {
      delivery_detail: "delivery",
      news_detail: "news",
      culture_detail: "culture",
      fund_detail: "fund",
    };
    name = urlTemp[name] ? urlTemp[name] : name;
    // if (!menu_item) {
    //   return
    // }
    const menu_item = menus.find((i) => i.key === name);
    const list = menu_item.children.map((i) => ({
      name: i.name,
      enName: i.enName,
      className: type === i.id ? "on" : "",
      path: i.path,
    }));

    const result = helper.renderHtml(templateLeft, {
      list,
      name: menu_item.name,
      enName: menu_item.enName,
    });

    const $leftMenus = $("#leftMenus");
    $leftMenus.html(result);
  },
};

$(function () {
  pageFn.init();
  $(window).scroll(function () {
    if (
      $(window).scrollTop() >=
      $(".top1").height() + $(".c_banner").height()
    ) {
      $(".erji").addClass("on");
    } else {
      $(".erji").removeClass("on");
    }
  });
});

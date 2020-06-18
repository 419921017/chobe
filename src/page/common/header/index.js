import { helper } from 'utils';
import Cookies from 'js-cookie';
import { intlType } from 'utils/constants';
import { switchIntl } from 'utils/intl';
import { menus } from 'utils/menu';

var templateIndex = require('./index.template');
var templatePhone = require('./phone.template');


const pageFn = {
  init: function () {
    //pc下拉
    var $i;
    var $flag = false;
    $(".sub").hover(function () {
      $flag = true;
    }, function () {
      $(".sub[data-m='" + $i + "']").slideUp();
      $(".menu .nli a[data-n='" + $i + "']").parent().parent().removeClass("active");
      $flag = false;
    });
    $(".menu .nli span a").hoverIntent(function () {
      $i = $(this).attr("data-n");
      $(".sub[data-m='" + $i + "']").slideDown();
      $(this).parent().parent().addClass("active");
    }, function () {
      if (!$flag) {
        $(".sub[data-m='" + $i + "']").slideUp();
        $(this).parent().parent().removeClass("active");
      }
    });

    //pc搜索
    $("#TopSearch").hover(function () {
      $(this).addClass("active");
      $(this).find(".searchInput").focus();
    }, function () {
      $(this).removeClass("active");
      $(this).find(".searchInput").blur();
      $(this).find(".searchInput").val("")
    });

    // 滚动头部动画
    $(window).scroll(function () {
      if ($(window).scrollTop() > 0) {
        $(".top1,.top2,.pz_banner").addClass("active");
      } else {
        $(".top1,.top2,.pz_banner").removeClass("active");
      }
    });

    $('.xialaph .l1').each(function () {
      if ($(this).find('.ul2').length < 1) {
        $(this).find('h4 b').remove();
      } else {
        $(this).find('h4 a').attr('href', 'javascript:;');
      }
    });

    $(".xialaph .tp").click(function () {
      $(this).siblings(".ul2").slideToggle();
      $(this).parent().siblings().find(".ul2,.ul3").slideUp();
      $(this).toggleClass("active");
      $(this).parent().siblings().find(".tp,h5").removeClass('active');
    });
    $(".xialaph h4").click(function () {
      $(this).siblings(".ul2").slideToggle();
      $(this).parent().siblings().find(".ul2,.ul3").slideUp();
      $(this).toggleClass("active");
      $(this).parent().siblings().find("h4,h5").removeClass('active');
    });
    $(".xialaph h5").click(function () {
      $(this).siblings(".ul3").slideToggle();
      $(this).parent().siblings().find(".ul3").slideUp();
      $(this).toggleClass("active");
      $(this).parent().siblings().find("h4,h5").removeClass('active');
    });

    function func1() {
      //首页关于我们
      new picFn({
        k: 1,//高宽比系数
        oDivCla: '.owl_ico li .iconD',//图片外框
      });
      // 案例列表
      new picFn({
        k: 0.7526315789473684,//高宽比系数
        oDivCla: '.caseBox li .img',//图片外框
      });
      // 新闻列表
      new picFn({
        k: 0.748,//高宽比系数
        oDivCla: '.ul_2 li .img',//图片外框
      });
      // 应用领域
      new picFn({
        k: 0.75,//高宽比系数
        oDivCla: '.useAppList li .appBox',//图片外框
      });
      // 产品列表
      new picFn({
        k: 0.7513227513227513,//高宽比系数
        oDivCla: '.productList li .light',//图片外框
      });
    }
    function func2() {
    }
    function addLoadEvent(func) {
      var oldonload = window.onload;
      if (typeof window.onload != "function") {
        window.onload = func;
      } else {
        window.onload = function () {
          oldonload();
          func();
        }
      }
    }
    addLoadEvent(func1);
    addLoadEvent(func2);
    $(window).resize(function () {
      var timer = setTimeout(function () {
        func1();
        func2();

      }, 100)
    });
    function picFn(option) {
      var k = option.k;//高宽比系数
      var oDiv = $(option.oDivCla);//图片外框
      imgFn();
      function imgFn() {
        oDiv.each(function () {
          var iWid = $(this).width();
          $(this).height(k * iWid);
          var iHei = $(this).height();
        })
      }
    }


    this.bindEvent();
  },
  bindEvent: function () {
    $(document).on('click', '#switchCN', function () {
      Cookies.set('page_intl', intlType.cn);
      switchIntl();
    });

    $(document).on('click', '#switchEN', function () {
      Cookies.set('page_intl', intlType.en);
      switchIntl();
    });

    $(document).on('click', '#switchPhoneCN', function () {
      Cookies.set('page_intl', intlType.cn);
      switchIntl();
    });
    $(document).on('click', '#switchPhoneEN', function () {
      Cookies.set('page_intl', intlType.en);
      switchIntl();
    });

    $(document).on('click', '#topPhoneMenu .ul2 a', function () {
      $('.point').removeClass('active')
      $('.top2,.phonemeng').removeClass('active')
      $(".xialaph").slideToggle();
    });


    $(document).on('click', '#menuph', function () {
      $(this).find(".point").toggleClass("active");
      $(".top2,.phonemeng").toggleClass('active');
      $(".xialaph").slideToggle();
    });
  },
  loadMenu: function () {
    const result = helper.renderHtml(templateIndex, { list: menus });
    const $topMenu = $('#topMenu');
    $topMenu.html(result);
  },
  loadPhoneMenu: function () {
    const result = helper.renderHtml(templatePhone, { list: menus });
    const $topMenu = $('#topPhoneMenu');
    $topMenu.html(result);
  },
  autoMenuAcitve: function () {
    $('li.nli').removeClass("on");
    const url = window.location.pathname;
    const patter = /^\/(.*).html/;
    const name = patter.exec(url) ? patter.exec(url)[1] : 'index';
    for (let i = 0; i < menus.length; i++) {
      const item = menus[i];
      if (name === item.key) {
        $(`#nav_${item.id}`).addClass('on');
        break;
      }
    }
  }
}

$(function () {
  pageFn.loadMenu();
  pageFn.loadPhoneMenu();
  pageFn.autoMenuAcitve();
  pageFn.init();
})
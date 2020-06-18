$(function () {
  // //pc下拉
  // var $i;
  // var $flag = false;
  // $(".sub").hover(function () {
  //   $flag = true;
  // }, function () {
  //   $(".sub[data-m='" + $i + "']").slideUp();
  //   $(".menu .nli a[data-n='" + $i + "']").parent().parent().removeClass("active");
  //   $flag = false;
  // });
  // $(".menu .nli span a").hoverIntent(function () {
  //   $i = $(this).attr("data-n");
  //   $(".sub[data-m='" + $i + "']").slideDown();
  //   $(this).parent().parent().addClass("active");
  // }, function () {
  //   if (!$flag) {
  //     $(".sub[data-m='" + $i + "']").slideUp();
  //     $(this).parent().parent().removeClass("active");
  //   }
  // });

  // // 滚动头部动画
  // $(window).scroll(function () {
  //   if ($(window).scrollTop() > 0) {
  //     $(".top1,.top2,.pz_banner").addClass("active");
  //   } else {
  //     $(".top1,.top2,.pz_banner").removeClass("active");
  //   }
  // });

  // //pc搜索
  // $("#TopSearch").hover(function () {
  //   $(this).addClass("active");
  //   $(this).find(".searchInput").focus();
  // }, function () {
  //   $(this).removeClass("active");
  //   $(this).find(".searchInput").blur();
  //   $(this).find(".searchInput").val("")
  // });

  // //返回头部
  // $("#imgotop").on("click", function () {
  //   $("body,html").animate({
  //     scrollTop: 0
  //   }, 500);
  // });

  // //返回顶部
  // $(".divBox").on("click", function () {
  //   $("body,html").animate({
  //     scrollTop: 0
  //   }, 500);
  // });

  // 菜单下拉
  // $("#menuph").click(function () {
  //   $(this).find(".point").toggleClass("active");
  //   $(".top2,.phonemeng").toggleClass('active');
  //   $(".xialaph").slideToggle();
  //   //		$("body,html").animate({
  //   //			scrollTop:0
  //   //		},500);
  // });

  // $(".xialaph .tp").click(function () {
  //   $(this).siblings(".ul2").slideToggle();
  //   $(this).parent().siblings().find(".ul2,.ul3").slideUp();
  //   $(this).toggleClass("active");
  //   $(this).parent().siblings().find(".tp,h5").removeClass('active');
  // });
  // $(".xialaph h4").click(function () {
  //   $(this).siblings(".ul2").slideToggle();
  //   $(this).parent().siblings().find(".ul2,.ul3").slideUp();
  //   $(this).toggleClass("active");
  //   $(this).parent().siblings().find("h4,h5").removeClass('active');
  // });
  // $(".xialaph h5").click(function () {
  //   $(this).siblings(".ul3").slideToggle();
  //   $(this).parent().siblings().find(".ul3").slideUp();
  //   $(this).toggleClass("active");
  //   $(this).parent().siblings().find("h4,h5").removeClass('active');
  // });

  //底部
  //     $(".lian h5").click(function(){
  //         $(".lian .ul1").toggleClass('active');
  //     });
  //     $(".lian").bind('mouseleave', function () {
  //         $(".lian .ul1").removeClass('active');
  //     });
  // //底部
  // if ($(window).width() < 992) {
  //   $(".footUl .ttit").on("touchstart", function () {
  //     $(this).toggleClass("active");
  //     $(this).parent().siblings().find(".ttit").removeClass('active');
  //     $(this).siblings("ul").slideToggle();
  //     $(this).parent().siblings().find("ul").slideUp();
  //   });
  // }


  //边导航
  $("#mright").click(function () {
    $(this).toggleClass("active");
    $("#lay2").slideToggle();
    $("#lay2 h3").removeClass('active');
  });
  $("#lay2 h3").click(function () {
    $(this).siblings(".l1ul").slideToggle();
    $(this).parent().parent().siblings().find(".l1ul").slideUp();
    $(this).toggleClass("active");
    $(this).parent().parent().siblings().find("h3").removeClass('active');
  });

  $(".pz_SideLayer h4").click(function () {
    $(this).parent().siblings().find(".ul2").slideUp();
    $(this).siblings(".ul2").slideToggle();
    $(this).parent().toggleClass("active");
  });
  // function func1() {
  //   //首页关于我们
  //   new picFn({
  //     k: 1,//高宽比系数
  //     oDivCla: '.owl_ico li .iconD',//图片外框
  //   });
  //   // 案例列表
  //   new picFn({
  //     k: 0.7526315789473684,//高宽比系数
  //     oDivCla: '.caseBox li .img',//图片外框
  //   });
  //   // 新闻列表
  //   new picFn({
  //     k: 0.748,//高宽比系数
  //     oDivCla: '.ul_2 li .img',//图片外框
  //   });
  //   // 应用领域
  //   new picFn({
  //     k: 0.75,//高宽比系数
  //     oDivCla: '.useAppList li .appBox',//图片外框
  //   });
  //   // 产品列表
  //   new picFn({
  //     k: 0.7513227513227513,//高宽比系数
  //     oDivCla: '.productList li .light',//图片外框
  //   });
  // }
  // function func2() {
  // }
  // function addLoadEvent(func) {
  //   var oldonload = window.onload;
  //   if (typeof window.onload != "function") {
  //     window.onload = func;
  //   } else {
  //     window.onload = function () {
  //       oldonload();
  //       func();
  //     }
  //   }
  // }
  // addLoadEvent(func1);
  // addLoadEvent(func2);
  // $(window).resize(function () {
  //   var timer = setTimeout(function () {
  //     func1();
  //     func2();

  //   }, 100)
  // });
  // function picFn(option) {
  //   var k = option.k;//高宽比系数
  //   var oDiv = $(option.oDivCla);//图片外框
  //   imgFn();
  //   function imgFn() {
  //     oDiv.each(function () {
  //       var iWid = $(this).width();
  //       $(this).height(k * iWid);
  //       var iHei = $(this).height();
  //     })
  //   }
  // }
});



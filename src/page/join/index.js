require('../common');

const pageFn = {
  init: function () {
    $(".listTop").click(function () {
      $(this).siblings(".listDown").slideToggle();
      $(this).parent().siblings().find(".listDown").slideUp();
      $(this).toggleClass("on");
      $(this).parent().siblings().find(".listTop").removeClass('on');
    });
  }
}

$(function () {
  pageFn.init();
});
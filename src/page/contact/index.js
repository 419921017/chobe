require('../common');

import { 
  intlType, 
  cultureType,
} from 'utils/constants';

const pageFn = {
  init:function(){
    $("#nav_7").addClass("on");

  },
}
$(function(){
  pageFn.init();
})
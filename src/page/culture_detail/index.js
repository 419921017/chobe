import { helper } from 'utils';
import Cookies from 'js-cookie';
import { 
  intlType, 
  deliveryType,
} from 'utils/constants';
import polaroidGallery from 'utils/polaroidGallery'

require('../common');

const pageFn = {
  init:function(){
    new polaroidGallery([{
      name:"http://chobe.kingform.net/backend/resources/被投企业/demo.jpg",
      caption:"无",
      description:"无"
    },{
      name:"http://chobe.kingform.net/backend/resources/被投企业/demo.jpg",
      caption:"无",
      description:"无"
    },{
      name:"http://chobe.kingform.net/backend/resources/被投企业/demo.jpg",
      caption:"无",
      description:"无"
    },{
      name:"http://chobe.kingform.net/backend/resources/被投企业/demo.jpg",
      caption:"无",
      description:"无"
    },{
      name:"http://chobe.kingform.net/backend/resources/被投企业/demo.jpg",
      caption:"无",
      description:"无"
    },{
      name:"http://chobe.kingform.net/backend/resources/被投企业/demo.jpg",
      caption:"无",
      description:"无"
    },{
      name:"http://chobe.kingform.net/backend/resources/被投企业/demo.jpg",
      caption:"无",
      description:"无"
    },{
      name:"http://chobe.kingform.net/backend/resources/被投企业/demo.jpg",
      caption:"无",
      description:"无"
    },{
      name:"http://chobe.kingform.net/backend/resources/被投企业/demo.jpg",
      caption:"无",
      description:"无"
    }]);
  },
}

$(function(){
  pageFn.init();
})
import Cookies from 'js-cookie';
import { intlType } from './constants';
export const en = {
  home: "HOME",
  about: "ABOUT US",
  about1: "Introduction",
  about2: "Founder",
  about3: "Core Team",
  about4: "Enterprise Characteristics",
  about5: "Capital concept",
  delivery: "Invested Enterprises",
  delivery_name: "Entry Name",
  news: "NEWS",
  news1: "Industry News",
  news2: "IPO",
  news3: "news on current events",
  news4: "Jobe Dynamics",
  news5: "Publicity Document",
  company_culture: "CORPORATE CULTURE",
  QB_welfare: "PUBLIC WELFARE",
  join_us: "JOIN US",
  join1: "Contact us",
  join2: "Recruit",
}
export const cn = {
  home: "首页",
  about: "关于我们",
  about1: "公司简介",
  about2: "创始人",
  about3: "核心团队",
  about4: "企业特色",
  about5: "投资理念",
  delivery: "被投企业",
  delivery_name: "企业名称",
  news: "新闻动态",
  news1: "行业新闻",
  news2: "IPO",
  news3: "时事新闻",
  news4: "乔贝动态",
  news5: "被投企业公众号文章",
  company_culture: "企业文化",
  QB_welfare: "乔贝公益",
  join_us: "加入我们",
  join1: "招聘信息",
  join2: "联系我们",
}

export const switchIntl = () => {
  const $intlList = $("[data-intl]");
  const type = Cookies.get('page_intl');
  const intlObj = Number(type) === intlType.en ? en : cn;
  if (Number(type) === intlType.en) {
    $('#topMenu').removeClass('cn').addClass('en');
  } else {
    $('#topMenu').removeClass('en').addClass('cn');
  }
  $.each($intlList, function (index, item) {
    const value = $(item).data("intl")
    if (intlObj[value]) {
      $(item).text(intlObj[value]);
    }
  })
}
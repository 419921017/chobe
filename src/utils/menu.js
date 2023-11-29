import { newsType } from "../utils/constants";

export const menus = [
  {
    id: 1,
    name: "首页",
    enName: "home",
    path: "/index.html",
    key: "index",
    children: [],
  },
  {
    id: 2,
    name: "关于我们",
    enName: "about",
    key: "about",
    path: "/about.html",
    children: [
      {
        id: 1,
        parentId: 2,
        name: "公司简介",
        enName: "about1",
        key: "about",
        path: "/about.html#about1",
      },
      {
        id: 2,
        parentId: 2,
        name: "创始人",
        enName: "about2",
        key: "about",
        path: "/about.html#about2",
      },
      {
        id: 3,
        parentId: 2,
        name: "核心团队",
        enName: "about3",
        key: "about",
        path: "/about.html#about3",
      },
      {
        id: 4,
        parentId: 2,
        name: "企业特色",
        enName: "about4",
        key: "about",
        path: "/about.html#about4",
      },
      {
        id: 5,
        parentId: 2,
        name: "投资理念",
        enName: "about5",
        key: "about",
        path: "/about.html#about5",
      },
    ],
  },
  {
    id: 3,
    name: "被投企业",
    enName: "delivery",
    path: "/delivery.html?type=1",
    key: "delivery",
    children: [
      {
        id: 1,
        parentId: 3,
        name: "TMT",
        key: "delivery",
        enName: "delivery2",
        path: "/delivery.html?type=1",
      },
      {
        id: 2,
        parentId: 3,
        name: "生物医药",
        key: "delivery",
        enName: "delivery3",
        path: "/delivery.html?type=2",
      },
      {
        id: 3,
        parentId: 3,
        name: "消费升级",
        key: "delivery",
        enName: "delivery4",
        path: "/delivery.html?type=3",
      },
    ],
  },
  {
    id: 8,
    name: "产业基金",
    enName: "fund",
    path: "/fund.html?type=1",
    key: "fund",
    children: [
      {
        id: 1,
        parentId: 8,
        name: "生物产业基金",
        enName: "fund1",
        key: "fund",
        path: "/fund.html?type=1",
      },
      {
        id: 2,
        parentId: 8,
        name: "物联网产业基金",
        enName: "fund2",
        key: "fund",
        path: "/fund.html?type=2",
      },
    ],
  },
  {
    id: 4,
    name: "新闻动态",
    enName: "news",
    path: "/news.html",
    key: "news",
    children: [
      {
        id: 4,
        parentId: 4,
        name: "被投企业公众号文章",
        enName: "news5",
        key: "news",
        path: "/news.html?type=4",
      },
      {
        id: 3,
        parentId: 4,
        name: "乔贝动态",
        enName: "news4",
        key: "news",
        path: "/news.html?type=3",
      },
      {
        id: 2,
        parentId: 4,
        name: "IPO",
        enName: "news2",
        key: "news",
        path: "/news.html?type=2",
      },
      {
        id: 1,
        parentId: 4,
        name: "行业新闻",
        enName: "news1",
        key: "news",
        path: "/news.html?type=1",
      },
    ],
  },
  {
    id: 5,
    name: "企业文化",
    enName: "company_culture",
    path: "/culture.html?type=1",
    key: "culture",
    children: [
      {
        id: 1,
        parentId: 5,
        name: "在路上",
        enName: "culture1",
        key: "culture",
        path: "/culture.html?type=1",
      },
      {
        id: 2,
        parentId: 5,
        name: "其他",
        enName: "culture2",
        key: "culture",
        path: "/culture.html?type=2",
      },
    ],
  },
  {
    id: 6,
    name: "乔贝公益",
    enName: "QB_welfare",
    path: "/welfare.html",
    key: "welfare",
    children: [],
  },
  {
    id: 7,
    name: "加入我们",
    enName: "join_us",
    path: "/join.html",
    key: "join",
    children: [
      {
        id: 1,
        parentId: 7,
        name: "招聘信息",
        enName: "join1",
        path: "/join.html",
        key: "join",
      },
      {
        id: 2,
        parentId: 7,
        name: "联系我们",
        key: "join",
        enName: "join2",
        path: "/contact.html",
      },
    ],
  },
];

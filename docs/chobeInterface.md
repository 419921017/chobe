# 乔贝接口文档

## 查询文章

请求方法
`POST`

参数
```js
type func = 'articleList' | 'articleDetail'
type article_type = 1 | 2
// 列表, 详情
{
  func: String,
  article_type: Number
}
```

接口地址
`139.196.37.36/chobe_web_php/interface.php`



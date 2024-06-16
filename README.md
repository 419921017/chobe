# chobe
乔贝资本


# 接口配置

## 状态码
1. 请求成功：`res.code === 200`
2. 请求错误：`res.status === 1`


## 全局请求配置

```ts
$.ajax({
      type: param.method || 'post',
      url: param.url || 'http://api.chobe.cn/interface.php',
      dataType: param.tyle || 'json',
      data:JSON.stringify( param.data) || '',
      success: function (res) {
        if (res.code === 200) {//请求成功
          typeof param.success === 'function' && param.success(res.data);
        } else if (res.status === 10) {//没有登录
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

```

# 接口
## 接口列表
- 全局只有一个接口：`http://api.chobe.cn/interface.php`，只有接口参数不同

```ts
helper.request({
      data: {
        func: "articleList",
        article_type: "公司创始人",
      },
      success: function (data) {
        let list = data.map(item => {
          return {
            ...item,
            name: Number(type) === intlType.en ? item.name_en : item.name,
            content: Number(type) === intlType.en ? item.introduction_en : item.introduction,
          }
        })
        const result = helper.renderHtml(indexTemp, { list });
        const $founder = $('#founder');
        $founder.html(result);
      }
    })
```

## 接口配置
- 接口参数的func都为""，只有 `article_type` 不同，`article_type` 枚举如下：

```ts
export const articleType = ["公司创始人", "公司简介", "核心团队"];

export const newsType = ["行业新闻", "IPO", "乔贝动态", "被投企业公众号文章"];

export const deliveryType = ["TMT", "生物医药", "消费升级"];

export const fundType = ["生物产业基金", "物联网产业基金"];

export const cultureType = ["在路上", "其他"];

export const recruitment = "招聘信息";
```

## 语言配置
```ts
export const intlType = {
  cn: 1,
  en: 2,
};

```
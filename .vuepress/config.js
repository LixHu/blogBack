module.exports = {
  lang: 'zh-CN',
  "title": "李寻欢的博客",
  "description": "",
  "dest": "public",
  "head": [
    [ "link", { "rel": "icon", "href": "/favicon.ico" } ],
    [ "meta", { "name": "viewport", "content": "width=device-width,initial-scale=1,user-scalable=no" } ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      { "text": "Home", "link": "/", "icon": "reco-home" },
      { "text": "时间轴", "link": "/timeline/", "icon": "reco-date" },
    ],
    subSidebar: 'auto',
    // "sidebar": {
    //   "/article/": [
    //     ""
    //   ]
    // },
    "type": "blog",
    "blogConfig": {
      "category": { "location": 2, "text": "分类" },
      "tag": { "location": 3, "text": "标签" }
    },
    "valineConfig": {
      "appId": 'IMpmm8GQ9lP95zvxWDEXp8y3-gzGzoHsz',
      "appKey": 'rGhNta5tOYJ3YJpiHnMbd4fu',
      "placeholder": '别忘了输入完整的网址嗷~',
    },
    "friendLink": [
      {
        "title": "杰克-一个专心搬砖的人",
        "desc": "某公司前端大佬，精通前端React，Vue等框架。",
        "email": "",
        "link": "http://milu.blog/"
      },
      {
        "title": "小白龙博客",
        "desc": "小白龙博客",
        "email": "",
        "link": "https://blog.xiaolong0418.com/"
      },
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "最后更新于：",
    "author": "lixhuan",
    "authorAvatar": "/avatar.png",
    "record": "",
    "startYear": "2018"
  },
  "markdown": {
    "lineNumbers": false
  }
}

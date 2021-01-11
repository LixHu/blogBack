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
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": { "location": 2, "text": "分类" },
      "tag": { "location": 3, "text": "标签" }
    },
    "friendLink": [
      // {
      //   "title": "午后南杂",
      //   "desc": "Enjoy when you can, and endure when you must.",
      //   "email": "1156743527@qq.com",
      //   "link": "https://www.recoluan.com"
      // },
      // {
      //   "title": "vuepress-theme-reco",
      //   "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      //   "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   "link": "https://vuepress-theme-reco.recoluan.com"
      // }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "最后更新于：",
    "author": "李寻欢",
    "authorAvatar": "/avatar.png",
    "record": "",
    "startYear": "2018"
  },
  "markdown": {
    "lineNumbers": true
  }
}
const urlLists = {
  'index': {
    'pageName': '主页',
    'pageUrl': '/index.html',
    'innerLists': []
  },
  'features': {
    'pageName': '功能集合',
    'pageUrl': '/features.html',
    'innerLists': [
      {
        "title": "html",
        "topId": 0,
        "lists": [
          { title: "html", url: "/html", pageUrl: "/features.html#/html", id: '00' },
        ]
      },
      {
        "title": "javascript",
        "topId": 1,
        "lists": [
          { title: "正则训练", url: "/zz", pageUrl: "/features.html#/zz", id: '10' },
          { title: "vue列表优化", url: "/list", pageUrl: "/features.html#/list", id: '11' },
          { title: "ar", url: "/ar", pageUrl: "/features.html#/ar", id: '12' },
        ]
      },
      {
        "title": "css",
        "topId": 2,
        "lists": [
          { title: "气泡背景", url: "/", pageUrl: "/features.html#/", id: '20' },
          { title: "背景", url: "/bg", pageUrl: "/features.html#/bg", id: '21' },
          { title: "animation", url: "/animation", id: '22' },
          { title: "css按钮", url: "/canvasCssButton", pageUrl: "/features.html#/canvasCssButton", id: '23' },
          { title: "数字滚动", url: "/numberMove", pageUrl: "/features.html#/numberMove", id: '24' },
        ]
      },
      {
        "title": "node",
        "topId": 3,
        "lists": [
          { title: "气泡背景", url: "/", pageUrl: "/features.html#/", id: '30' },
        ]
      },
      {
        "title": "webpack",
        "topId": 4,
        "lists": [
          { title: "气泡背景", url: "/", pageUrl: "/features.html#/", id: '40' },
        ]
      }
    ]
  },
  // 'ui': {
  //   'pageName': 'ui框架',
  //   'pageUrl': '/ui.html',
  //   'innerLists': []
  // },
  'markdowns': { 
    'pageName': '公众号文章',
    'pageUrl': '/markdowns.html',
    'innerLists': [
      {
        "title": "算法",
        "topId": 0,
        "lists": [
          { title: "反转中位数", url: "/", id: '00' },
          { title: "三角形最小路径和", url: "/triangle", id: '01' },
          { title: "二叉树最大深度", url: "/maximumOfTree", id: '02' },
          { title: "整数反转", url: "/integerInversion", id: '03' },
          { title: "无重复字符的最长字串", url: "/repeateCharacters", id: '04' },
          { title: "最长公共前缀", url: "/longestCommonPrefix", id: '05' },
          { title: "最长回文", url: "/longestPalindrome", id: '06' },
          { title: "路径总和", url: "/pathsum", id: '07' },
          { title: "路径总和", url: "/pathsum", id: '08' }
        ]
      },
      {
        "title": "javascript",
        "topId": 1,
        "lists": [
          { title: "webpack5新特性", url: "/webpack5", id: '10' }
        ]
      },
      {
        "title": "公众号",
        "topId": 2,
        "lists": [
          { title: "原生webview和javascript交互", url: "/webview", id: '20' },
          { title: "从输入URL到页面加载发生了什么", url: "/urlToPage", id: '21' },
          { title: "vue-router源码分析", url: "/vueRouter", id: '22' },
        ]
      },
      {
        "title": "金融",
        "topId": 3,
        "lists": [
          { title: "股票", url: "/shares", id: '30' },
          { title: "基金", url: "/goods", id: '31' },
          { title: "购买基金数据统计", url: "/fundSum", id: '32' },
          { title: "徐远课", url: "/xuyuan", id: '33' },
          { title: "香帅的北大金融学课", url: "/xiangshuai", id: '34' },
          { title: "dcf现金流估值", url: "/dcf", id: '35' },
          { title: "财新新闻", url: "/news", id: '36' },
          { title: "公司业绩报告", url: "/achievement", id: '37' },
        ]
      }
    ]
  },
  'about': {
    'pageName': '关于我',
    'pageUrl': '/about.html',
    'innerLists': []
  },
}



export default urlLists

import goods from "../view/financial/基金.md";
import shares from "../view/financial/股票.md";
import xuyuan from "../view/financial/徐远课.md";
import xiangShuai from "../view/financial/香帅.md";
import dcf from "../view/financial/dcf.vue";
import news from "../view/financial/news.vue";
import fundSum from "../view/financial/fundSum.vue";
import achievement from "../view/financial/achievement.vue";

const routes = [
  {
    path: "/goods",
    name: "goods",
    component: goods,
    meta: {
      title: "goods"
    }
  },
  {
    path: "/xuyuan",
    name: "xuyuan",
    component: xuyuan,
    meta: {
      title: "xuyuan"
    }
  },
  {
    path: "/xiangShuai",
    name: "xiangShuai",
    component: xiangShuai,
    meta: {
      title: "xiangShuai"
    }
  },
  {
    path: "/dcf",
    name: "dcf",
    component: dcf,
    meta: {
      title: "dcf"
    }
  },
  {
    path: "/news",
    name: "news",
    component: news,
    meta: {
      title: "news"
    }
  },
  {
    path: "/fundSum",
    name: "fundSum",
    component: fundSum,
    meta: {
      title: "fundSum"
    }
  },
  {
    path: "/shares",
    name: "shares",
    component: shares,
    meta: {
      title: "shares"
    }
  },
  {
    path: "/achievement",
    name: "achievement",
    component: achievement,
    meta: {
      title: "achievement"
    }
  }
];
export default routes;
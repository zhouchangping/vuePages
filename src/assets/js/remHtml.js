// var inithtmlsizeobj = { "initarr": [10] };
// document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement.clientWidth || document.body.clientWidth) / Math.max.apply(this, inithtmlsizeobj.initarr) + 'px';
// (function() {
//   var a = document.getElementsByTagName('script');
//   for (var i = 0; i < a.length; i++) {
//     if (a[i].innerHTML.indexOf('inithtmlsizeobj') != '-1') {
//       a[i].parentNode.removeChild(a[i]);
//       a = inithtmlsizeobj = undefined;
//       return;
//     }
//   };
// })();

// var styleElement = document.createElement("style");
// styleElement.type = "text/css";
// styleElement.innerHTML = "*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;}body,form,ul,ol,li,dl,dt,dd,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0;} div,ul,dl,dt,dd,p,h1,h2,h3,h4,h5,h6{zoom:1;} body{font-family:'Microsoft YaHei';/*-webkit-user-select:none;*/-webkit-text-size-adjust:none;background-color: #fff;}input,select{line-height:normal;vertical-align:middle;}textarea{font-size:1em;line-height:1.5em;}a{text-decoration:none;color:#000;outline:0;} a:visited{text-decoration:none;} a:hover{text-decoration:none;} img{border:0;max-width:100%;} li,ul{list-style:none;} body{width:16rem;margin:0 auto;background-color: #fff;font-size:.6rem;color:#000;} .hidden{display:none;} .clear{clear:both;} .cl{clear:both;} .zleft{float:left;} .zright{float:right;} .zmore{color:#771d0e!important;} .zblock{display:block;} .zred{color:red!important;}/*兼容苹果*/ input{-webkit-appearance:none; /*去除input默认样式*/} input[type='radio']{-webkit-appearance:radio;} input[type='submit'],input[type='reset'],input[type='button'],input{-webkit-appearance:none;} /*兼容苹果结束*/";
// document.getElementsByTagName('HEAD').item(0).appendChild(styleElement);


// !(function() {
//   var dpr, rem, scale;
//   var docEl = document.documentElement;
//   var fontEl = document.createElement('style');
//   var metaEl = document.querySelector('meta[name="viewport"]');

//   dpr = window.devicePixelRatio || 1;
//   rem = docEl.clientWidth * dpr / 10;
//   scale = 1 / dpr;


//   // 设置viewport，进行缩放，达到高清效果
//   metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

//   // 设置data-dpr属性，留作的css hack之用
//   docEl.setAttribute('data-dpr', dpr);

//   // 动态写入样式
//   docEl.firstElementChild.appendChild(fontEl);
//   fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

//   // 给js调用的，某一dpr下rem和px之间的转换函数
//   window.rem2px = function(v) {
//     v = parseFloat(v);
//     return v * rem;
//   };
//   window.px2rem = function(v) {
//     v = parseFloat(v);
//     return v / rem;
//   };

//   window.dpr = dpr;
//   window.rem = rem;
// })();


// (function(){
//     var originWidthByDesign = 750 / 2;
//     var originRootFontSize = 50;
//     var maxLimitWidth = 667;
//     var doc = document.documentElement;
//     var div = document.createElement('div');
//     div.setAttribute('style', 'font-size: 1rem');
//     if (!!document.addEventListener && '1rem' === div.style.fontSize) {
//       var reCalculate = function reCalculate() {
//         var clientWidth = doc.clientWidth;
//         if (!clientWidth) {
//           return;
//         }
//         clientWidth = clientWidth < maxLimitWidth ? clientWidth : maxLimitWidth;
//         doc.style.fontSize = originRootFontSize * clientWidth / originWidthByDesign + 'px';
//         doc.style.display = 'none';
//         doc.clientWidth;
//         doc.style.display = '';
//       };
//       window.addEventListener('resize', reCalculate, false);
//       document.addEventListener('DOMContentLoaded', reCalculate, false);
//       reCalculate();
//     }
//     function getQueryString (name) {
//       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//       var r = window.location.search.substr(1).match(reg);
//       if (r != null) return unescape(r[2]); return null;
//     }
//   })()
// console.log("ali rem");

// 阿里方式
!function() {
  var a = "@charset \"utf-8\";html{color:#000;background:#fff;overflow-y:scroll;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}html,body{font-family:sans-serif}body,div,dl,dt,dd,ul,ol,li,pre,code,form,fieldset,legend,input,textarea,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-variant:normal}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}ol,ul{list-style:none}caption,th{text-align:left}q:before,q:after{content:''}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}ins,a{text-decoration:none;color: #333}",
    b = document.createElement("style");
  if (document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) {
    b.styleSheet.disabled || (b.styleSheet.cssText = a);
  } else {
    try {
      b.innerHTML = a;
    } catch (c) {
      b.innerText = a;
    }
  }
}();

!function(a, b) {
  function c() {
    var b = f.getBoundingClientRect().width;
    b / i > 540 && (b = 540 * i);
    var c = b / 10;
    f.style.fontSize = c + "px", k.rem = a.rem = c;
  }
  var d, e = a.document,
    f = e.documentElement,
    g = e.querySelector("meta[name=\"viewport\"]"),
    h = e.querySelector("meta[name=\"flexible\"]"),
    i = 0,
    j = 0,
    k = b.flexible || (b.flexible = {});
  if (g) {
    console.warn("浏览器测试");
    var l = g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
    l && (j = parseFloat(l[1]), i = parseInt(1 / j));
  } else if (h) {
    var m = h.getAttribute("content");
    if (m) {
      var n = m.match(/initial\-dpr=([\d\.]+)/),
        o = m.match(/maximum\-dpr=([\d\.]+)/);
      console.log(n);
      n && (i = parseFloat(n[1]), j = parseFloat((1 / i).toFixed(2))), o && (i = parseFloat(o[1]), j = parseFloat((1 / i).toFixed(2)));
    }
  }
  if (!i && !j) {
    var p = (a.navigator.appVersion.match(/android/gi), a.navigator.appVersion.match(/iphone/gi)),
      q = a.devicePixelRatio;
    // console.log(p);console.log(q);
    i = p ? q >= 3 && (!i || i >= 3) ? 3 : q >= 2 && (!i || i >= 2) ? 2 : 1 : 1, j = 1 / i;
  }
  if (f.setAttribute("data-dpr", i), !g)
    if (g = e.createElement("meta"), g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + j + ", maximum-scale=" + j + ", minimum-scale=" + j + ", user-scalable=no"), f.firstElementChild) f.firstElementChild.appendChild(g);
    else {
      var r = e.createElement("div");
      r.appendChild(g), e.write(r.innerHTML);
    }
  a.addEventListener("resize", function() { clearTimeout(d), d = setTimeout(c, 300); }, !1), a.addEventListener("pageshow", function(a) { a.persisted && (clearTimeout(d), d = setTimeout(c, 300)); }, !1), "complete" === e.readyState ? e.body.style.fontSize = 12 * i + "px" : e.addEventListener("DOMContentLoaded", function() { e.body.style.fontSize = 12 * i + "px"; }, !1), c(), k.dpr = a.dpr = i, k.refreshRem = c, k.rem2px = function(a) { var b = parseFloat(a) * this.rem; return "string" == typeof a && a.match(/rem$/) && (b += "px"), b; }, k.px2rem = function(a) { var b = parseFloat(a) / this.rem; return "string" == typeof a && a.match(/px$/) && (b += "rem"), b; };
}(window, window.lib || (window.lib = {}));

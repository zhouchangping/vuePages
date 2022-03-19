const HyperDown = require('hyperdown');
const Prism = require('prismjs');


function markdownLoader (val) {
  let parser = new HyperDown();
  let html = parser.makeHtml(val); // 解析后
  html = html.replace(/(?<=<pre><code[^>]*?>)[\s\S]*?(?=<\/code><\/pre>)/gi, v => {
    v = v.replace(/_&/g, ' ').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    return Prism.highlight(v, Prism.languages.javascript);
    // return hljs.highlightBlock(v);
  });
  return (
    `<template><div id="nice" class="markdown">${html}</div></template>`
  );
}

module.exports = markdownLoader;
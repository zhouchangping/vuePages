<template>
  <article-content :title="title" :time="time">
    <section>
     <a class="btn color-1 material-design" data-color="#2f5398">Press me!</a>
    </section>
  </article-content>
</template>
<script>
import ArticleContent from "@/components/article.vue";
export default {
  name: "cssButton",
  data () {
    return {
    }
  },
  created () {
    var canvas = {},
    centerX = 0,
    centerY = 0,
    color = '',
    containers = document.getElementsByClassName('material-design')
    context = {},
    element = {},
    radius = 0,
    // 根据callback生成requestAnimationFrame动画
    requestAnimFrame = function () {
      return (
        window.requestAnimationFrame       || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    } (),
    // 为每个指定元素生成canves
    init = function () {
      containers = Array.prototype.slice.call(containers);
      for (var i = 0; i < containers.length; i += 1) {
        canvas = document.createElement('canvas');
        canvas.addEventListener('click', press, false);
        containers[i].appendChild(canvas);
        canvas.style.width ='100%';
        canvas.style.height='100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    },
    // 点击并且获取需要的数据，如点击坐标、元素大小、颜色
    press = function (event) {
      color = event.toElement.parentElement.dataset.color;
      element = event.toElement;
      context = element.getContext('2d');
      radius = 0;
      centerX = event.offsetX;
      centerY = event.offsetY;
      context.clearRect(0, 0, element.width, element.height);
      draw();
    },
    // 绘制圆形，并且执行动画
    draw = function () {
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
      radius += 2;
      // 通过判断半径小于元素宽度，不断绘制 radius += 2 的圆形
      if (radius < element.width) {
        requestAnimFrame(draw);
      }
    };
    init();
  },
  methods: {
  },
  components: {
    ArticleContent
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
  outline: none;
}
body {
  font-family: 'Open Sans';
  font-size: 100%;
  font-weight: 300;
  line-height: 1.5em;
  text-align: center;
}
.btn {
  border: none;
  display: inline-block;
  color: white;
  overflow: hidden;
  margin: 1rem;
  padding: 0;
  width: 150px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
}
.btn.color-1 {
  background-color: #426fc5;
}
.btn-border.color-1 {
  background-color: transparent;
  border: 2px solid #426fc5;
  color: #426fc5;
}
.material-design {
  position: relative;
}
.material-design canvas {
  opacity: 0.25;
  position: absolute;
  top: 0;
  left: 0;
}
.container {
  align-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 46rem;
}
</style>
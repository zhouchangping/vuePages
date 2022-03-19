<template>
  <article-content :title="title" :time="time">
    <div class="bubbles-code">
      <pre class="custom">
        <code class="hljs">
          <span class="hljs-comment">// css实现代码：</span>
          .bubbles-bg {
            position: relative;
            width: 100%;
            height: 800px;
          }
          .bg-bubbles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: linear-gradient(to bottom right, #50a3a2, #53e3a6);
            li {
              position: absolute;
              bottom: -160px;
              width: 40px;
              height: 40px;
              border-radius: 100%;
              background-color: rgba(255, 255, 255, 0.15);
              list-style: none;
              animation: square 15s infinite;
              transition-timing-function: linear;
              &:nth-child(1) {
                left: 10%;
              }
              &:nth-child(2) {
                left: 20%;
                width: 90px;
                height: 90px;
                animation-delay: 2s;
                animation-duration: 7s;
              }
              &:nth-child(3) {
                left: 25%;
                animation-delay: 4s;
              }
              &:nth-child(4) {
                left: 40%;
                width: 60px;
                height: 60px;
                animation-duration: 8s;
                background-color: rgba(255, 255, 255, 0.3);
              }
              &:nth-child(5) {
                left: 70%;
              }
              &:nth-child(6) {
                left: 80%;
                width: 120px;
                height: 120px;
                animation-delay: 3s;
                background-color: rgba(255, 255, 255, 0.2);
              }
              &:nth-child(7) {
                left: 32%;
                width: 160px;
                height: 160px;
                animation-delay: 2s;
              }
              &:nth-child(8) {
                left: 55%;
                width: 20px;
                height: 20px;
                animation-delay: 4s;
                animation-duration: 15s;
              }
              &:nth-child(9) {
                left: 25%;
                width: 10px;
                height: 10px;
                animation-delay: 2s;
                animation-duration: 12s;
                background-color: rgba(255, 255, 255, 0.3);
              }
              &:nth-child(10) {
                left: 85%;
                width: 160px;
                height: 160px;
                animation-delay: 5s;
              }
            }
            @keyframes square {
              0% {
                opacity: 0.5;
                transform: translateY(0px) rotate(45deg);
              }
              25% {
                opacity: 0.75;
                transform: translateY(-400px) rotate(90deg);
              }
              50% {
                opacity: 1;
                transform: translateY(-600px) rotate(135deg);
              }
              100% {
                opacity: 0;
                transform: translateY(-1000px) rotate(180deg);
              }
            }
          }
        </code>
      </pre>
    </div>
    <div class="bubbles-flow">
      <ul class="bg-bubbles">
        <li v-for="i in 10" :key="i"></li>
      </ul>
    </div>
  </article-content>
  <!-- <div style="height: 1100px; background: gray"></div> -->
</template>
<script>
import ArticleContent from "@/components/article.vue";
export default {
  name: "bgBubble",
  data () {
    return {
      title: "气泡背景",
      time: "2021-01-21"
    }
  },
  created () {
  },
  methods: {
  },
  components: {
    ArticleContent
  }
}
</script>
<style lang="scss">
.bubbles-flow {
  position: relative;
  width: 100%;
  height: 800px;
  .bg-bubbles {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(to bottom right, #50a3a2, #53e3a6);
    li {
      position: absolute;
      bottom: -160px;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      background-color: rgba(255, 255, 255, 0.15);
      list-style: none;
      animation: square 15s infinite;
      transition-timing-function: linear;
      &:nth-child(1) {
        left: 10%;
      }
      &:nth-child(2) {
        left: 20%;
        width: 90px;
        height: 90px;
        animation-delay: 2s;
        animation-duration: 7s;
      }
      &:nth-child(3) {
        left: 25%;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-duration: 8s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(5) {
        left: 70%;
      }
      &:nth-child(6) {
        left: 80%;
        width: 120px;
        height: 120px;
        animation-delay: 3s;
        background-color: rgba(255, 255, 255, 0.2);
      }
      &:nth-child(7) {
        left: 32%;
        width: 160px;
        height: 160px;
        animation-delay: 2s;
      }
      &:nth-child(8) {
        left: 55%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
        animation-duration: 15s;
      }
      &:nth-child(9) {
        left: 25%;
        width: 10px;
        height: 10px;
        animation-delay: 2s;
        animation-duration: 12s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(10) {
        left: 85%;
        width: 160px;
        height: 160px;
        animation-delay: 5s;
      }
    }
    @keyframes square {
      0% {
        opacity: 0.5;
        transform: translateY(0px) rotate(45deg);
      }
      25% {
        opacity: 0.75;
        transform: translateY(-400px) rotate(90deg);
      }
      50% {
        opacity: 1;
        transform: translateY(-600px) rotate(135deg);
      }
      100% {
        opacity: 0;
        transform: translateY(-1000px) rotate(180deg);
      }
    }
  }
}
</style>
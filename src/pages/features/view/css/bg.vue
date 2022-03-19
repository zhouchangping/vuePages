<template>
  <article-content :title="title" :time="time">
    <section>
      <h2>JS</h2>
      <div class="banner">
        <div class="blocks" v-for="(item, index) in arrs"></div>
      </div>
    </section>
  </article-content>
  <!-- <div style="height: 1100px; background: blue"></div> -->
</template>
<script>
import ArticleContent from "@/components/article.vue";
export default {
  name: "bg",
  data () {
    return {
      arrs: [],
      title: "背景动画-前端先锋",
      time: "2021-01-21"
    }
  },
  created () {
    console.log(1231)
    let arr = [];
    for (let i = 0; i < 400; i++) {
      arr.push(i);
    }
    this.$nextTick(() => {
      this.arrs = arr;
    })
  },
  methods: {
  },
  components: {
    ArticleContent
  }
}
</script>
<style lang="scss" scoped>
section {
  position: relative;
  width: 100%;
  height: 100%;
  background: #333;
}
section {
  h2 {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100vh;
    font-size: 10vw;
    color: #fff;
    font-weight: 700;
  }
}

.banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  .blocks {
    position: relative;
    display: block;
    width: 5vw;
    height: 5vw;
    background: #fff;
    animation: animate 0.75s ease-in-out forwards;
  }
}

.banner {
  .blocks:nth-child(event) {
    animation: animate 1s ease-in-out forwards;
    animation-delay: 0.5s;
  }
  .blocks:nth-child(7n + 3) {
    animation: animate 2.5s ease-in-out forwards;
    animation-delay: 1s;
  }
  .blocks:nth-child(7n + 7) {
    animation: animate 1.5s ease-in-out forwards;
    animation-delay: 1.5s;
  }
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: scale(0) translateY(1000px);
  }
  50% {
    opacity: 1;
    background: url("../../images/bg.jpg");
    background-position: center;
    background-attachment: fixed;
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
    background: url("../../images/bg.jpg");
    background-position: center;
    background-attachment: fixed;
  }
}
</style>
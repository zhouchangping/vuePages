<template>
  <article-content :title="title" :time="time">
    <section>
      <h2>switch</h2>
      <div class="switch"></div>
    </section>
  </article-content>
</template>
<script>
import ArticleContent from "@/components/article.vue";
export default {
  name: "bg",
  data () {
    return {
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
<style lang="scss" scoped>
.switch {
  position: relative;
  width: 150px;
  height: 50px;
  background: gray;
}
.switch:before {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  height: 50px;
  width: 50px;
  background: #fff;
  border-radius: 100%;
}

.switch:hover {
  animation: animateSwitch 2s;
}
.switch:hover.switch:before {
  animation: animationBefore 2s forwards;
}
@keyframes animationBefore {
  0% {
    left: 0px;
    top: 0px;
  }
  100% {
    left: 100px;
    top: 0px;
  }
}

@keyframes animateSwitch {
  0% {
    background: gray;
  }
  100% {
    background: blue;
  }
}
</style>
<template>
  <article-content :title="title" :time="time">
    <section>
      <h2>绝对估值-dcf（现金流贴现法）</h2>
      <div class="content">
        <img-open :imgList="imgLists"></img-open>
        <div class="line">概念：贴现率、现金流（税后收入-净资本指出-运营成本）、增长率</div>
        <div class="line">自由现金流 <input v-model="cash" /></div>
        <div class="line">贴现率：<input v-model="per" /></div>
        <div class="line">增长率: <input v-model="gre" /></div>
        <div class="line">短年限: <input v-model="dtime" /></div>
        <div class="line">长年限: <input v-model="ltime" /></div>
        <div class="line">永续增长率: <input v-model="lgre" /></div>
        <div class="line"><button @click="getResult">计算折现到当年({{currentYear}})的总贴现现金流</button></div>
        <div class="line"><button @click="getResultTow">计算折现到某年({{oneYear}})的贴现现金流</button></div>
      </div>
    </section>
  </article-content>
</template>
<script>
import ArticleContent from "@/components/article.vue";
import imgOpen from "@/components/imgOpen.vue";
export default {
  name: "dcf",
  data () {
    return {
      imgLists: [
        require("./image/2251617941824_.pic_hd.jpg"),
        require("./image/2261617941827_.pic_hd.jpg"),
      ],
      title: "dcf-现金流贴现法",
      time: "2021-04-08",
      cash: 10, // 当年现金流
      per: 10, // 贴现率

      dtime: 10, // 近期年限
      ltime: 5, // 长期年限

      gre: 15, // 短期增长率
      lgre: 5, // 永续增长率

      currentYear: "1988",
      oneYear: "2021",
    }
  },
  created () {
  },
  methods: {
    getResult() {
      let dResult = 0;
      let result = 0;
      for (let i = 1; i <= this.dtime; i++) {
        dResult = Number((this.cash*Math.pow((1+(this.gre/100)), i) / Math.pow((1+(this.per/100)), i)).toFixed(2)) + dResult;
      }
      let lResult = this.cash*Math.pow((1+this.gre/100), this.dtime)*(1+this.lgre/100)*(1+this.per/100) 
      let uResult = this.per/100-this.lgre/100;
      let tResult = 1 / (Math.pow((1+this.per/100), this.dtime+1));
      let fResult = lResult / uResult * tResult;
      result = fResult + dResult
     alert(`未来总现金流:${result}`)
    },
    getResultTow() { // 贴现率(per) 贴现率(per)
      let resultOne = 0; // 某年（2021）的现金流  
      let result = 0; // 折算到某年（2021）的现金流
      console.log(this.gre)
      console.log(this.dtime)
      resultOne = Number(this.cash*Math.pow((1+(this.gre/100)), this.dtime));
      alert(resultOne)
      result = (resultOne * (1+this.lgre/100)) /(this.per/100 - this.lgre/100);
      alert(result);
    }
  },
  components: {
    ArticleContent,
    imgOpen
  }
}
</script>
<style lang="scss" scoped>
.content .line {
  margin-bottom: 20px;
}
input {
  text-indent: 5px;
}
</style>
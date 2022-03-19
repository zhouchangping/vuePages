<template>
  <article-content :title="title" :time="time">
    <div class="news-content" ref="content">
      <div class="new-list" v-for="item in datas">
        <span style="color: #f08d49; margin-right: 20px;">{{item.date}}  {{item.time}}</span><span>{{item.text}}</span>
      </div>
      <div class="footer">
          {{footerText}}
      </div>
    </div>
  </article-content>
</template>
<script>
import ArticleContent from "@/components/article.vue";
export default {
  name: "news",
  data() {
      return {
        time: "2021-04-15",
        title: "业绩报告",
        datas: [],
        footerText: "下拉加载更多新闻资讯",
        rdate: 20210331,
        allDatas: [],
      }
  },
  created() {
      let that = this;
      that.fetchData(that.rdate)
  },
  mounted() {
  },
  methods: {
    fetchData(rdate) {
        let that = this;
        that.$axios({
          url: "http://www.cninfo.com.cn/data20/performanceForecast/list" + `?rdate=${rdate}`,
          // url: "/getNewLists"+`?num=${num}`, // 服务器设置了路由限制，后401 Unauthorized
          method: "POST",
        }).then((res) => {
          console.log(res)
          that.datas = res.data.records;
        }).catch((err) => {
          that.$toast(err);
        });
    }
  },
  components: {
    ArticleContent,
  }
}
</script>
<style lang="scss" scoped>
.news-content {
  position: relative;
}
.content .line {
  margin-bottom: 20px;
}
.new-list {
  margin-top: 20px; width:100%; box-sizing: border-box;padding: 20px;line-height: 30px;
}
.footer {
  text-align: center;
}
</style>
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
        title: "财新新闻",
        datas: [],
        footerText: "下拉加载更多新闻资讯",
        num: 1,
        allDatas: [],
      }
  },
  created() {
      let that = this;
      that.fetchData(that.num)
      window.onscroll = function(){
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            //滚动条到底部的条件
        if(scrollTop+windowHeight == scrollHeight){
        //到了这个就可以进行业务逻辑加载后台数据了
        that.footerText = '下拉加载更多新闻资讯';
        that.num+=1;
        that.fetchData(that.num);
        } 
      }
  },
  mounted() {
  },
  methods: {
    goTo() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, 
    fetchData(num) {
        let that = this;
        that.$axios({
          url: "/getNewLists"+`?num=${num}`, // 服务器设置了路由限制，后401 Unauthorized
          method: "GET",
        }).then((res) => {
          console.log(res)
          that.datas = that.datas.concat(res.data);
        }).catch((err) => {
          that.$toast(err);
        });
        // window.fetch('http://localhost:3000/getNewLists'+`?num=${num}`, {
        //     // body: JSON.stringify(data), // must match 'Content-Type' header
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     // credentials: 'same-origin', // include, same-origin, *omit
        //     headers: {
        //     'user-agent': 'Mozilla/4.0 MDN Example',
        //     'content-type': 'application/json'
        //     },
        //     method: 'get', // *GET, POST, PUT, DELETE, etc.
        //     // mode: 'cors', // no-cors, cors, *same-origin
        //     redirect: 'follow', // manual, *follow, error
        //     referrer: 'no-referrer', // *client, no-referrer
        // })
        // .then(response => response.json())
        // .then(function(myResultArr) {
        //     // for (let i = 0; i < myResultArr.length; i++) {
        //     //     if (myResultArr[i])
        //     // }
        //     that.datas = that.datas.concat(myResultArr);
        // });
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
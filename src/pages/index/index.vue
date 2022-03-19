<template>
  <div id="home">
    <header-nav :isActiveIndex="0"></header-nav>
    <div class="page-better">
      <div class="page-main">
        <div class="page-search">
          <input
            class="page-input"
            v-model="inputModel"
            @blur="dealSearch"
            @keyup.enter="dealSearch"
          />
        </div>
        <ul class="page-ul" v-for="menuItem in urlDatas" :key="menuItem.id">
          <my-tree :model="menuItem"></my-tree>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import urlData from "@/assets/url-js/index.js";
import HeaderNav from "@/components/header.vue"
import myTree from "@/components/treeMenu.vue";
import SidebarMain from "@/components/sidebar-main.vue"
export default {
  name: "home",
  data () {
    return {
      inputModel: "",
      urlDatas: urlData,
      arrP: [],
    }
  },
  // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
  beforeCreate () {
    console.log("home beforeCreate")
  },
  created () {
    console.log("home created")
  },
  mounted() {
    this.dealArray(this.urlDatas); // 形成新的一维数组
    console.log(this.arrP.length);
  },
  watch: {
    // 修改查询后，清空不重置列表
    inputModel: function (newVal) {
      if (newVal.length == 0) {
        this.urlDatas = urlData;
      }
    },
  },
  methods: {
    dealSearch () {
      let that = this;
      that.inputModel = that.inputModel.replaceAll(" ", ""); // 清空空格
      if (!that.inputModel) {
        return;
      }
      that.urlDatas = that.arrP.filter(function (ele) {
        // 过滤搜索到的
        return ele["menuName"].search(new RegExp(that.inputModel, "i")) !== -1; // 不区分大小写
      });
    },
    dealArray (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children && arr[i].children.length > 0) {
          this.dealArray(arr[i].children);
        } else {
          this.arrP.push({ menuName: arr[i].menuName, url: arr[i].url });
        }
      }
    },
  },
  components: {
    HeaderNav,
    SidebarMain,
    myTree
  }
};
</script>
<style scoped lang="scss">

.page-better {
  padding-bottom: 3rem;
}

.page-main {
  padding: 1rem 0.5rem 1rem 0.5rem;
}

.page-input {
    height: 30px;
    line-height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 15px 0 30px;
    border: 1px solid #e3e3e3;
    color: #273849;
    outline: none;
    border-radius: 15px;
    margin-right: 10px;
    -webkit-transition: border-color .2s ease;
    transition: border-color .2s ease;
    background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACKElEQVR42u3aVbLrMAyA4T8HAmVmCu5/iZdRTcmJHc/o87sbdSQzSimllFLqZSFj1hxIySkpyUk5sGZMSMdFLMmobrSMJRGdNOBE9WA70adTYvHxjwQR0wkBK6oX24oAx0LOVAbtTIhDCQWVYctJcKRPSdVAK92UdHLj81NWDIl4JyDgnYghK9IbISRYFtYmz4aYOjHb2kQKsSioKd09nw+Efqgp5wBrVlfTYMSjxlfTb4Ul8dUUiJ7sI0f2EmHFqZEMDpEhnOyseWTyRLwiRiZS38X/P+JVY9HXkZZFyJHHxMF2HSzFD35iIhT9LWlVJqYtU1ux5WmR/L9iTCWiz5CWyKJLaYBYI41pzVrMnU57NR8zhjRh9F+vB1qTtjLkxSIx2yIm/3ea8C4WJm0RU39AEwKxNPE8gMr3FCq0iB0Po0ffJ7K1LiVcL+ZsLqe3jS+nU9sbmtDShka3lHJTb150E/ubeugjj1ViC8cqXhxsHV0eLcaujxbND3fHj+f+1cPdhfvj9QPhy8frJwJskBkspraEOsmNC47Pbl0xrRkR/75iihmxJqW60YZ+XvLJNseihNz8mlWG4NdF9ydDGYIvTw2WBAAGieTwsceRmJ9c1ILU5/jEx/f5i0E5W3/wlF598DRzHYJ8crb6/eSsoiDlKJ6cGYTgnIZgn4Yw0xAs0BCs0RA0BA1BQ5jikZnfny9DmOKhqfh8T0OY4rFp9z9fKaWUUkqpL+ucyncDnsRZAAAAAElFTkSuQmCC) 8px 5px no-repeat;
    background-size: 20px;
    vertical-align: middle!important;
}

.page-main.page-titile {
    margin-bottom: 0.8rem;
    text-align: center;
}

/* 多行省略 */
p {
    overflow: hidden;
    text-align: left;
    max-height: 1rem;
    font-size: 14px;
    line-height: 1.5;
    box-sizing: content-box;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.page-main .page-username {
    margin-left: 0.133333rem;
}

.page-main .page-p {
    margin-bottom: 0.25rem;
}

.page-user-info {
    margin: 0 0.133333rem;
    font-size: 16px;
    font-weight: 700;
    color: #484848;
    vertical-align: middle;
}

.page-user-img {
     width: 1rem;
     height: 1rem;
     border-radius: 0.5rem;
     vertical-align: middle;
}

.page-user-time {
    color: #2c3e50;
    font-size: 12px;
    font-weight: normal;
}

.page-artical-msg {
    margin-top: 0.5rem;
}

.page-artical-msg  p {
    text-indent: 0.2rem;
}

</style>
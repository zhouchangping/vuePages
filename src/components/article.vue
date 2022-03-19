<template>
  <div class="article">
    <div class="author-info-block">
      <a
        href="/user/4107431174759256"
        target="_blank"
        rel=""
        class="avatar-link"
        ><img :src="avater" class="lazy avatar avatar"
      /></a>
      <div class="author-info-box">
        <div class="author-name">
          <a
            href="/user/4107431174759256"
            target="_blank"
            rel=""
            class="username username ellipsis"
            ><span class="name" style="max-width: calc(100% - 50px)">
              小小周虾
            </span>
          </a>
        </div>
        <div class="meta-box">
          <time>
            {{ articleTime }}
          </time>
        </div>
      </div>
    </div>
    <h1 class="article-title">
      {{ article }}
    </h1>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Article',
  props: {
    title: {
      type: String,
      default: () => {
        return '文章标题'
      }
    },
    time: {
      type: String,
      default: () => {
        return '2021-01-01'
      }
    },
  },
  data () {
    return {
      articleTime: "",
      article: "",
      avater: require("@/assets/images/avater.jpg")
    }
  },
  created () {
    this.articleTime = this.time;
    this.article = this.title;
  }
}
</script >
<style scoped lang="scss">
.article {
  padding: 20px 0;
}
.author-info-block {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.author-info-block .avatar-link {
  font-size: 0;
}

.author-info-block .avatar {
  flex: 0 0 auto;
  margin-right: 1rem;
  width: 3.333rem;
  height: 3.333rem;
  border-radius: 50%;
}

.author-info-block .author-info-box {
  min-width: 0;
  flex-grow: 1;
  flex: 1;
  height: 43px;
}

.author-info-block .author-name {
  height: 22px;
}

.author-info-block .author-name .username {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  color: #333;
}

.author-info-block .meta-box {
  font-size: 12px;
  color: #909090;
}
</style>
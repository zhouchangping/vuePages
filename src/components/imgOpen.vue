<template>
  <div class="img-container">
    <div class="images">
      <img :src="item" v-for="(item, index) in imgList" @click="imgOpen(item)"/>
    </div>
    <div class="img-open" v-show="isOpen">
    <div class="img-close" @click="closeImg">关闭图片</div>
      <img :src="imgForOpen"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vue-list',
  props: {
    imgList: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data () {
    return {
      imgForOpen: "",
      isOpen: false,
    }
  },
  mounted () {
  },
  methods: {
    imgOpen(url) {
      console.log(url)
      this.isOpen = !this.isOpen;
      this.imgForOpen = url;
    },
    closeImg() {
      this.isOpen = !this.isOpen;
      this.imgForOpen = "";
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.img-container {
  margin-bottom: 20px;
}
.images img {
  width: 200px;
  height: 400px;
}
.img-open {
  position: fixed;
  z-index: 10000;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #fff;
  text-align: center;
  margin: 0;
}
.img-open img {
  width: 28%;
  height: 100%;
}

.img-open .img-close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  text-align: center;
  color: red;
  font-size: 20px;
}
</style>
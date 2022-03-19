<template>
  <div class="content">
    <div class="wraper" ref="wraper" @scroll="handleScroll">
      <div class="scroll-bar" ref="scrollBar" :style="{height:allHeight + 'px'}"></div>
      <ul class="list" ref="list"  :style="{ transform: getTransform }">
        <li class="item" v-for="item in visibaleData" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "baseTable",
  data() {
    return {
      wraperHeight: 667, //可视区域高度
      itemHeight: 60, //每个列得高度
      visibaleCount: 0, //可视区域得渲染得个数
      allHeight: 0, //总数据得高度
      visibaleData: [], //可视区域渲染得数据集合
      list: [], //总数据
      startIndex: 0, //可视区域得第一个元素
      endIndex: 0, //可视区域得最后一个元素
      bufferSize: 6, // 一个缓冲值，用来增加一定的缓存区域，
      getTransform:0,
      scroll:0,
    };
  },
  mounted() {
    // 构造个大数据量得数据集合
    for (let i = 0; i < 1000; i++) {
      this.list.push("列表" + i);
    }
    // 计算显示区域可以渲染得数量
    this.visibaleCount = Math.floor(this.wraperHeight / this.itemHeight) + this.bufferSize
    console.log(Math.floor(this.wraperHeight / this.itemHeight), '---------')
    // 可视区域得最后一个元素
    this.endIndex = this.startIndex + this.visibaleCount
    // 计算全部数据得高度
    this.allHeight = this.list.length * this.itemHeight
    this.updateVisibleData()
  },
  methods: {
    //  此处用计算属性也可以
    updateVisibleData(){
      //可视区域渲染得数据集合
      this.visibaleData = this.list.slice(this.startIndex,this.endIndex)
      console.log(this.visibaleData, 'visibaleData')
    },
    // 滚动事件
    handleScroll(e){
      let scroll = this.$refs.wraper.scrollTop
      this.startIndex = Math.floor(scroll / this.itemHeight)
      console.log(this.startIndex, "startIndex")
      // 可视区域得最后一个元素
      this.endIndex = this.startIndex + this.visibaleCount
      console.log(this.endIndex, "endIndex")
	// 设置top和平移都可以，貌似使用transform性能要好些
      // this.$refs.list.style.top =this.startIndex * this.itemHeight + 'px'
      // 让滚动距离为itemHeight整数倍，
      console.log(scroll) // 85
      console.log(this.itemHeight) // 60
      console.log(scroll % this.itemHeight, '------') // 25
      console.log(scroll - scroll % this.itemHeight)
      this.getTransform = `translate3d(0,${scroll - scroll % this.itemHeight}px,0)`
       this.updateVisibleData()
    }
  },
};
</script>
<style lang="scss" scoped>
.wraper {
  width: 600px;
  height: 667px;
  background: cadetblue;
  position: relative;
  overflow-y: scroll;
  .list {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    .item {
      height: 60px;
      width: 100%;
      border: 1px solid #000;
      box-sizing: border-box;
    }
  }
}
</style>
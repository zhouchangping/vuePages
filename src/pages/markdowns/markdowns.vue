<template>
  <div id="markdowns">
    <header-nav :isActiveIndex="2"></header-nav>
    <sidebar-main :urlList="urlList"></sidebar-main>
  </div>
</template>
<script>
import HeaderNav from "@/components/header.vue"
import SidebarMain from '@/components/sidebar-main.vue'
import PerMoniteur from "@/common/monitor/index.js"
import urlLists from "@/utils/urlLists.js";
export default {
  name: 'markdowns',
  data () {
    return {
      urlList: urlLists['markdowns']['innerLists']
    }
  },
  created () {
    window.onload = (event) => {
      console.log(new Date())
    };
    // 以一个标志开始。
    performance.mark("mySetTimeout-start");

    // 等待一些时间。
    setTimeout(function () {
      // 标志时间的结束。
      performance.mark("mySetTimeout-end");

      // 测量两个不同的标志。
      performance.measure(
        "mySetTimeout",
        "mySetTimeout-start",
        "mySetTimeout-end"
      );

      // 获取所有的测量输出。
      // 在这个例子中只有一个。
      var measures = performance.getEntriesByName("mySetTimeout");
      var measure = measures[0];
      console.log("setTimeout milliseconds:", measure.duration / 1000) // 1.03s

      // 清除存储的标志位
      performance.clearMarks();
      performance.clearMeasures();
    }, 1000);
    // this.urlLists = dealUrlForList("@/pages/markdowns/view/dailyAlgorithm/");

    // new PerMoniteur({
    //   tracker: (type, data, allData) => {
    //     console.log('type: ', type)
    //     console.log(`${type} data: `, data)
    //     console.log('allData: ', allData)
    //   },
    // })

  },
  mounted () {
    // var observer = new PerformanceObserver(function (list) {
    //   var perfEntries = list.getEntries();
    //   for (var i = 0; i < perfEntries.length; i++) {
    //     console.log(JSON.stringify(perfEntries[i], null, 4));
    //     // Process long task notifications:
    //     // report back for analytics and monitoring
    //     // ...
    //   }
    // });
    // // register observer for long task notifications
    // observer.observe({ entryTypes: ["longtask"] });

    new PerMoniteur({
      tracker: (type, data, allData) => {
        console.log('type: ', type)
        console.log(`${type} data: `, data)
        console.log('allData: ', allData)
      },
    })
  },
  components: {
    HeaderNav,
    SidebarMain
  },
}
</script >
<style scoped lang="scss">
</style>
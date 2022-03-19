<template>
  <div id="features">
    <header-nav :isActiveIndex="1"></header-nav>
    <sidebar-Main :urlList="urlList"></sidebar-Main>
    <!-- <sidebar :urlList="urlList"></sidebar> -->
    <!-- <div class="contents">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div> -->
  </div>
</template>

<script>
import HeaderNav from "@/components/header.vue"
import SidebarMain from "@/components/sidebar-main.vue"
import urlLists from "@/utils/urlLists.js";

export default {
  name: "features",
  data () {
    return {
      urlList: urlLists['features']['innerLists'],
      activeIndex: 1
    }
  },
  created () {
  },
  methods: {
  },
  components: {
    HeaderNav,
    SidebarMain,
    // Sidebar
  }
};
</script>
<style scoped lang="scss">
</style>
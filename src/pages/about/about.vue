<template>
  <div id="about">
    <div id="mobile-bar">
      <a class="menu-button"></a>
      <a class="logo" href="/"></a>
    </div>
    <header-nav :isActiveIndex="3"></header-nav>
  </div>
</template>

<script>
import HeaderNav from "@/components/header.vue"
export default {
  name: "about",
  created () {
  },
  components: {
    HeaderNav
  }
};
</script>

<style scoped lang="scss">
#about {
  font-size: 14px;
}
</style>
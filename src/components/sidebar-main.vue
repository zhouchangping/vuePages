<template>
  <main id="main" class="fix-sidebar">
    <div class="sidebar" v-if="isShowSideBar">
      <div class="sidebar-inner">
        <div class="list">
          <ul class="menu-root">
            <li v-for="items in sidebarList" :key="items.topId">
              <a
                class="sidebar-link"
                :class="{ current: items.topId == topActiveIndex }"
                >{{ items.title }}</a
              >
              <ul class="menu-sub">
                <li
                  class="menu-sub-li"
                  v-for="(item, i) in items.lists"
                  :key="i"
                  @click="sidebarFn(item.id, items.topId)"
                >
                  <router-link
                    :to="{ path: item.url }"
                    class="section-link"
                    :class="{ active: item.id == isActiveIndex }"
                  >
                    {{ item.title }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </main>
</template>
<script>
export default {
  name: "sidebar",
  props: {
    urlList: {
      type: Array,
      default: () => {
        return []
      }
    },
    showSideBar: {
      type: Boolean,
      default: () => {
        return true
      }
    },
  },
  data () {
    return {
      sidebarList: this.urlList,
      isShowSideBar: this.showSideBar,
      topActiveIndex: 0,
      isActiveIndex: 0,
    }
  },
  created () {
  },
  methods: {
    sidebarFn (i, topIndex) {
      if (this.isActiveIndex == i) return;
      this.topActiveIndex = topIndex
      this.isActiveIndex = i;
    }
  }
};
</script>
<style scoped lang="scss">
</style>
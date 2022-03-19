<template>
  <header id="header">
    <div id="mobile-bar">
      <a class="menu-button"></a>
    </div>
    <div id="header-big">
      <a id="logo" href="/">
        <img :src="logo" alt="vue logo" />
        <span>小小周虾</span>
      </a>
      <ul id="nav">
        <li>
          <form id="search-form">
            <input
              type="text"
              id="search-query-nav"
              class="search-query st-default-search-input aa-input"
              aria-label="搜索"
              autocomplete="off"
              spellcheck="false"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="false"
              aria-owns="algolia-autocomplete-listbox-0"
              dir="auto"
              style=""
            />
            <pre
              aria-hidden="true"
              style="
                position: absolute;
                visibility: hidden;
                white-space: pre;
                font-family: Arial;
                font-size: 13.3333px;
                font-style: normal;
                font-variant: normal;
                font-weight: 400;
                word-spacing: 0px;
                letter-spacing: normal;
                text-indent: 0px;
                text-rendering: auto;
                text-transform: none;
              "
            ></pre>
          </form>
        </li>
        <li v-for="(items, index) in listInfo" :key="index" class="nav-dropdown-container item">
          <a
            class="nav-link"
            :class="{ current: isActiveIndex == index }"
            :href="items.pageUrl"
            >{{ items.pageName}}</a
          >
          <!-- <span class="arrow"></span> -->
          <!-- <ul class="nav-dropdown">
            <li v-if="items.innerLists.length > 0" v-for="(k, i) in items.innerLists" :key="i">
              <h4>{{k.title}}</h4>
              <ul>
                <li v-for="(v, ii) in k.lists" :key="ii"><a :href="v.pageUrl" class="nav-link">{{v.title}}</a></li>
              </ul>
            </li>
          </ul> -->
        </li>
      </ul>
    </div>
    <!-- <div class="sidebar">
      <ul class="main-menu">
        <li class="nav-dropdown-container"></li>
        <a class="nav-link">学习</a><span class="arrow"></span>
        <ul class="nav-dropdown">
          <li><h4>文档</h4></li>
        </ul>
      </ul>
    </div> -->
  </header>
</template>
<script>
import urlLists from "@/utils/urlLists.js";
export default {
  name: 'pageHeader',
  props: {
    isActiveIndex: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      logo: require("@/assets/images/avater.jpg"),
      listInfo: Object.values(urlLists),
    }
  },
  created () {

  }
}
</script >
<style scoped>
</style>
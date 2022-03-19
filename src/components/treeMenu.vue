<template>
  <li class="">
    <span @click="toggle(model)">
      <i v-if="hasChild" class="icon" v-bind:class="[open ? 'folder-open': 'folder' ]"></i>
      <i v-if="!hasChild" class="icon file-text"></i>
      {{model.menuName}}
    </span>
    <ul v-show="open" v-if="hasChild">
      <tree-menu v-for="(item,index) in model.children"  v-bind:model="item" v-bind:key="index"></tree-menu>
    </ul>
  </li>
</template>

<script>
export default {
  name: "treeMenu",
  props: ["model"],
  data(){
    return {
      open:false
    };
  },
  computed:{
    hasChild(){
      return this.model.children && this.model.children.length;
    }
  },
  methods:{
    toggle(item){
      if(this.hasChild){
        this.open = !this.open;
      } else {
        if (item.url) {
          window.open(item.url);
        }
      }
    }
  }
};
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 10px 0;
  }

  li {
    padding: 3px 10px;
  }

  li > span {
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
  }

  i.icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: contain;
    margin-right: 5px;
    background-repeat: no-repeat;
    vertical-align: middle;
  }

  .icon.folder {
    background-image: url(../assets/images/iconUrl/close.png);
  }

  .icon.folder-open {
    background-image: url(../assets/images/iconUrl/open.png);
  }

  .icon.file-text {
    background-image: url(../assets/images/iconUrl/text.png);
  }

  .tree-menu li {
    line-height: 1.5;
  }
</style>

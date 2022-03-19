<template>
  <div id="appVue" class="app Vue">
    <!--vue-ssr-outlet-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data () {
    return {
    };
  },
  created () {
  },
  methods: {
  },
  components: {
  }
};
</script>
<style scoped>
</style>

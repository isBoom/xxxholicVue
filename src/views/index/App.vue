<template>
  <div id="app">
    <HomeMenu />
    <div class="appContent">
       <!-- <router-view /> -->
        <keep-alive exclude ="video">
          <router-view />
        </keep-alive>
        <div style="clear:both"></div>
    </div>
    <Copyright />
  </div>
</template>

<script>
import HomeMenu from "@/components/HomeMenu.vue"
import Copyright from "@/components/Copyright.vue"
export default {
  name: "app",
  computed: {
    //key() {
      //路由发生变化就重新渲染
      // return this.$route.name
      //   ? this.$route.name + +new Date()
      //   : this.$route + +new Date()
    //}
  },
  components: {
    HomeMenu,
    Copyright
  },
}

</script>

<style lang="scss" scoped>
#app {
  margin: 0 auto;
  .appContent {
    width: 1200px;
    min-height: 700px;
    margin: 0 auto;
  }
  
}
.appContent{
  padding-top: 2%;
}


</style>

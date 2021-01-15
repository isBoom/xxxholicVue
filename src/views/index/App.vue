<template>
  <div id="app">
    <HomeMenu />
    <div class="appContent">
      <div class="">
        <keep-alive>
          <router-view  />
        </keep-alive>
      </div>
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
  created() {
    
  }
}
</script>

<style>

</style>
<style lang="scss" scoped>
#app {
  margin: 0 auto;
  .appContent {
    width: 1450px;
    min-height: 700px;
    margin: 0 auto;
  }
}


</style>

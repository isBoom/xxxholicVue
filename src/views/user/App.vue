<template>
  <div id="app">
    <HomeMenu/>
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="appContent">
        <div style="clear:both"></div>
    </div>
    <Copyright />
  </div>
</template>
<script>
import HomeMenu from "@/components/HomeMenuLogin.vue"
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
    Copyright,
  },
  methods:{
  },
  mounted(){
  }
}

</script>

<style lang="scss" scoped>
#app {
  margin: 0 auto;
  .appContent {
    width: 1200px;
    min-height: 600px;
    margin: 0 auto;
  }
}
.appContent{
  padding-top: 2%;
}
</style>
<style lang="scss">
.appContent{
  .videoBox{
    width: 70%;
    float: left;
  }
  .videoRank{
    width: 30%;
    float: left;
  }
}
</style>

<template>
  <div id="app">
   <HomeMenuBg />
    <HomeMenu />
    <!-- <div v-text="$store.state.exclude"></div> -->
    <div class="appContent">
        <!-- <router-view /> -->
        <keep-alive :exclude="$store.state.exclude">
          <router-view />
        </keep-alive>
        <div style="clear:both"></div>
    </div>
    <Copyright />
  </div>
</template>
<script>
import HomeMenuBg from "@/components/HomeMenuBg.vue"
import HomeMenu from "@/components/HomeMenu.vue"
import Copyright from "@/components/Copyright.vue"
export default {
  name: "App",
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
    HomeMenuBg,
  },
  methods:{
  }
}

</script>

<style lang="scss" scoped>
#app {
  margin: 0 auto;
  .appContent {
    width: 1200px;
    min-height: 500px;
    margin: 0 auto;
  }
}
.appContent{
  padding-top: 0.5%;
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
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #b8b6b6;
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
  // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  // border-radius: 10px;
  background:rgba(0,0,0,0);
}
</style>

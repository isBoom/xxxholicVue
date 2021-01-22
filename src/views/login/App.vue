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
    min-height: 130px;
    margin: 0 auto;
  }
}
.appContent{
  padding-top: 2%;
}
</style>
<style lang="scss">
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
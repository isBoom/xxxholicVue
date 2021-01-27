<template>
  <div id="app">
    <el-container>
      <!-- <el-header>
        <p class="admin">xxxholic</p>
      </el-header> -->
      <el-container>
        <el-aside width="200px"><Home /></el-aside>
        <el-main>
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
    
    
  </div>
</template>
<script>
import Home from "./Home.vue"
import * as API from "@/api/admin"
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
    Home,
  },
  methods:{
    simpleInfoMe(){
      API.simpleInfoMe().then(res => {
        if(res.code == 0){
          this.$store.commit('setUser', res.data);
        }else{
          window.open("/login","_self")
        }
      }).catch(e =>{
        this.$notify({
          type:"error",
          message:"服务器异常"
        })
      })
    }
  },
  created(){
    this.simpleInfoMe()
  }
}

</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  margin: 0 auto;
}
.el-container{
  height:100%;
}
.el-header{
  background:#33373b;
  color: #333;
  text-align: center;
  line-height: 60px;
  .admin{
    color: rgba(255, 255, 255, 0.7);
    float:left;
    line-height: 20px;
    font-size: 20px;
  }
}
  
  // .el-aside {
  //   background-color: #D3DCE6;
  //   color: #333;
  //   text-align: center;
  //   line-height: 200px;
  // }
  
  // .el-main {
  //   background-color: #E9EEF3;
  //   color: #333;
  //   text-align: center;
  //   line-height: 160px;
  // }
  
  // body > .el-container {
  //   margin-bottom: 40px;
  // }
  
  // .el-container:nth-child(5) .el-aside,
  // .el-container:nth-child(6) .el-aside {
  //   line-height: 260px;
  // }
  
  // .el-container:nth-child(7) .el-aside {
  //   line-height: 320px;
  // }
</style>

<style lang="scss">
body,html{
  margin: 0;
  height: 100%;
}
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
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

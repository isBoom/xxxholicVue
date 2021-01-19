<template>
  <div class="homeMenuBox">
    <div class="homeMenu">
      <div class="menu left">
        <el-menu mode="horizontal" @select="handleSelect" >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/anime">动漫</el-menu-item>
          <el-menu-item index="/movie">电影</el-menu-item>
          <el-menu-item index="/funny">鬼畜</el-menu-item>
          <el-menu-item index="/other">其他</el-menu-item>
        </el-menu>
      </div>
      <div class="menu center">
        <div class="search">
          <el-input class="s" v-model="input" placeholder="请搜索内容"></el-input>
          <el-button class="s" icon="el-icon-search"></el-button>
        </div>
      </div>
      <div class="menu right">
        <div class="user">
          <el-menu router mode="horizontal" @select="handleSelect" >
                <el-menu-item index="/">登录</el-menu-item>
                <el-menu-item index="/register">注册</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as userAPI from "@/api/user/";
export default {
  name: "homeMenu",
  data() {
    return {
      isLogin: false,
      isShownMenu: false,
      input: "",
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      window.open(`./#${keyPath}`,'_self')
    },
    checkLogin(){
      if(this.$store.state.user.id==undefined ){
        userAPI.simpleInfoMe().then(res => {
          if (res.code == 0) {this.$store.state.user = res.data}
        }).catch(err => {console.log(err);return});}
      if(this.$route.name == "Login" || this.$route.name == "Register"){
        window.open(`./#`,'_self')
      }
    },
  },
  components:{
    
  },
  props: {
    msg: String,
  },
  created(){
    this.checkLogin()
  },
  
}
</script>
<style lang="scss" scoped>
.el-menu.el-menu--horizontal {
  border-bottom: solid 0px #e6e6e6 !important;
}
.homeMenuBox {
  width: 100%;
  min-width: 1450px;
  border-bottom: solid 1px #e6e6e6;
  height: 60px;
  //
  .homeMenu {
    margin-bottom: 30px;
    max-width: 1450px;
    margin: 0 auto;
    .menu {
      width: 33.3%;
      float: left;
      height: 60px;
      line-height: 60px;
      .el-menu {
        background-color: rgba(0, 0, 0, 0);
      }
      .el-menu-item {
        font-size: 14px;
        font-weight: normal;
        padding: 0 10px;
        color: #212121;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        white-space: nowrap;
        display: -ms-flexbox;
        display: flex;
        border-bottom: 0px solid #409eff;
        &:hover {
          background-color: rgba(0, 0, 0, 0);
        }
        &:focus {
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .user {
        float: right;
      }
      .search {
        text-align:center .s {
          float: left;
        }
        .el-input {
          width: 99%;
        }
        .el-button--default {
          margin-left: -55px;
          position: relative;
          z-index: 100;
          border: 0px;
        }
      }
    }
  }
}
</style>

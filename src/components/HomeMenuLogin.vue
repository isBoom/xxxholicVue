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
          <el-form ref="form" :model="form" @submit.native="submit">
            <el-input class="s" v-model="input" placeholder="请搜索内容"></el-input>
            <el-button class="s" icon="el-icon-search" @click="submit"></el-button>
          </el-form>
        </div>
      </div>
      <div class="menu right">
        <div class="user">
            <div v-if="isLogin">
              <el-menu mode="horizontal" @click.native="myVideo">
                <el-menu-item>
                  <el-dropdown>
                    <span class="elDropdownLink">
                      <el-avatar :src="user.avatar">{{(user.userName==undefined||user.userName==null||user.userName=="")?"头像":user.userName.charAt(0)}}</el-avatar>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item class="clearfix" @click.native="myVideo">个人中心</el-dropdown-item>
                      <el-dropdown-item @click.native="postVideo">投稿</el-dropdown-item>
                      <el-dropdown-item class="clearfix" @click.native="exit">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-menu-item>
              </el-menu>
            </div>
            <div v-else>
              <el-menu mode="horizontal">
                <el-menu-item>
                  <a href="./login">登录</a>
                </el-menu-item>
                <el-menu-item>
                  <a href="./login#/register">注册</a>
                </el-menu-item>
              </el-menu>
            </div>
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
      input: "",
      form:{},
      user:{
        userName:"",
      },
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      window.open(`./#${key}`,'_self')
    },
    checkLogin(){
      userAPI.simpleInfoMe().then(res => {
        if (res.code == 0) {
          this.$store.state.user = res.data;
          this.user = res.data
          this.isLogin = true
          this.jump()
        }
      }).catch(err => {console.log(err);});
    },
    jump(){
      //登录界面已登录 跳转主页  其他界面未登录 跳转登录
      if(this.$route.name == "Login" || this.$route.name == "Register"){
        window.open(`/`,'_self')
      }
    },
    postVideo(){
      window.open(`/user#/postVideo`,'_self')
    },
    myVideo(){
      window.open(`/user`,'_self')
    },
    submit(){
      window.open(`./#/search?info=${this.input}`,'_self')
    },
    exit() {
      userAPI.exit().then(res => {
        if (res.code == 0) {
          this.isLogin = false;
          window.open(`/`,'_self')
          //this.$router.go(0);
        } else {
          console.log(res);
        }
      }).catch(err => {
          this.$message.error("退出失败");
          console.log(err);
        });
    },
  },
  components:{
    
  },
  props: {
    msg: String,
  },
  mounted(){
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

<style lang="scss">
.homeMenuBox{
  .el-avatar{
    position: relative;
    top: -5px;
    img{
      width:100%
    }
  }
  .el-avatar--circle{
    position: relative;
    top: -5px;
    font-size: 18px !important;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6 !important;
  }
  .search{
    input{
      background-color: rgba(255, 255, 255, 0.4);
      &:focus{  
        background-color: rgba(255, 255, 255,1);
      }
    }
    .el-button{
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  a{
    text-decoration: none;
  }
}
</style>


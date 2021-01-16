<template>
  <div class="homeMenuBox">
    <div class="homeMenu">
      <div class="menu left">
        <el-menu
          router
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
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
          <div v-if="isShownMenu">
            <div v-if="isLogin">
              <el-menu class="el-menu-demo" mode="horizontal">
                <el-menu-item>
                  <el-avatar>头像</el-avatar>
                </el-menu-item>
              </el-menu>
            </div>
            <div v-else>
              <el-menu class="el-menu-demo" mode="horizontal">
                <el-menu-item>
                  <a href="">登录</a>
                </el-menu-item>
                <el-menu-item>
                  <a href="">注册</a>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
          <!-- <div v-if="isShownMenu" key="1">
          <div v-if="isLogin" class="navbarRight">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link">
                <el-menu-item id="headPortrait">
                  <el-avatar :src="user.avatar">头像</el-avatar>
                </el-menu-item>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix">个人中心</el-dropdown-item>
                <el-dropdown-item class="clearfix" @click.native="exit">注销登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <el-menu-item class="navbarRight">
              <a href="./login.html#/register">注册</a>
            </el-menu-item>
            <el-menu-item class="navbarRight">
              <a href="./login.html#/">登录</a>
            </el-menu-item>
          </div>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeMenu",
  data() {
    return {
      activeIndex: "/",
      isLogin: false,
      isShownMenu: false,
      input: "",
    }
  },
  methods: {
    handleSelect(key, keyPath) {},
  },
  props: {
    msg: String,
  },
  mounted() {
    this.isShownMenu = true
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
  //
  box-shadow: inset 0px 50px 30px rgba(0, 0, 0, 0.3);
  background: url("../static/homeBg.jpg") no-repeat center;
  background-size: 2013px 155px;
  //background-position-x: -200px;
  height: 155px;
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
        padding: 0 10px;
        color: #fff;
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

<style>
/* body {
   overflow-y: visible !important; 
} */
</style>

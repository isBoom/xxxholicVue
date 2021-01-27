<template>
  <div id="app">
    <HomeMenu/>
      <div class="appContent">
        <div class="menu">
          <div class="img"><img src="@/static/userBg.png" style="width:100%"></div>
          <div class="user">
            <div class="avatar">
              <el-upload class="avatarUploader" action ref="upload" style="display:none"
                :before-upload="fnBeforeUpload" :http-request="fnUploadRequest" :show-file-list="false">
              </el-upload>
              <el-avatar @click.native="changeAvatar" :src="$store.state.user.avatar">{{userName}}</el-avatar>
            </div>
            <div class="p">
              <p>{{$store.state.user.userName}}</p>
              <el-input v-model="input" maxlength="50" @change="changeSignature" placeholder="编辑个性签名"></el-input>
            </div>
          </div>
        </div>
        <div class="content">
          <el-menu mode="horizontal" router >
          <el-menu-item index="/">我的视频</el-menu-item>
          <el-menu-item index="/audit">审核中稿件</el-menu-item>
          <el-menu-item index="/postVideo">投稿</el-menu-item>
          <el-menu-item index="/history">历史记录</el-menu-item>
          </el-menu>
          <div class="router">
            <router-view />
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
    <Copyright />
  </div>
</template>
<script>
import HomeMenu from "@/components/HomeMenuLogin.vue"
import Copyright from "@/components/Copyright.vue"
import * as API from "@/api/user/";
import * as videoApi from "@/api/video/";
export default {
  name: "app",
  data() {
    return {
      userName:"",
      input:" ",
      form:{},
    };
  },
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
    fnBeforeUpload(file) {
        const isJPG = file.type === "image/jpeg" || file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
        }
        if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
        }
            return isJPG && isLt2M;
    },
    fnUploadRequest(option) {
      videoApi.postUploadTokenAvatar(option.file.name).then(res => {
          if (res.code != 0) {
              this.$notify.error({
              title: "错误",
              message: res.msg
              });
              return;
          }
          const oReq = new XMLHttpRequest();
          oReq.open("PUT", res.data.put, true);
          oReq.send(option.file);
          oReq.onload = () => {
              this.$store.state.user.avatar = res.data.get
              API.changeAvatar({"Avatar":res.data.key}).then(resNew => {
                if(resNew.code == 0){
                  this.$notify({title: "上传成功",type: "success"})
                  this.$store.state.user.avatar = res.data.get
                }else{
                  this.$notify({title: "上传失败",type: "success",message:resNew.msg})
                }
              }).catch(e => {console.log("err:",err);})
          };
          })
          .catch(error => {
          this.$notify.error({
              title: "网路错误，或者服务器宕机",
              message: error
          });
      });
  },
    changeAvatar(){
      console.log(document.getElementsByClassName("avatarUploader")[0].firstChild.firstChild.click());
    },
    changeSignature(){
      API.changeSignature({"signature":this.input}).then(res => {
        if(res.code !=0 ){
          this.$message.error("修改失败");
          console.log("changeSignatureErr:",res.msg);
          console.log(res.error);
        }
      }).catch(e =>{console.log(e);})
    }

  },
  mounted(){
  },
  created(){
    var that = this
    var timer = setInterval(function(){
      if(that.$store.state.user!=undefined){
        that.userName = that.$store.state.user.userName[0]
        that.input = that.$store.state.user.signature
        clearInterval(timer)
      }
    },1000)
    //巨坑
    
    // console.log(this.$store.state);
    // console.log(this.user);
    // this.user = this.$store.state.user
    // console.log(this.user);

    // console.log(this.user.userName);
    // console.log(this.user.userName.charAt(0));
    // //this.userName = this.$store.state.user.userName.charAt(0)
  }
}

</script>

<style lang="scss" scoped>
.el-menu.el-menu--horizontal {
  border-bottom: solid 0px #e6e6e6 !important;
}
#app {
  margin: 0 auto;
  .appContent {
    width: 1300px;
    min-height: 600px;
    margin: 0 auto;
    .menu{
      position: relative;
      .img{
        height: 200px;
        overflow: hidden;
      }
      .user{
        $avatarHeight:70px;
        position: absolute;
        bottom: 10%;
        left: 2%;
        width: 100%;
        .avatar{
          float: left;
          width: $avatarHeight;
          height: $avatarHeight;
          &:hover ::after{
            display: block;
            width:100px;
            height: 100px;
            content: "更换头像";
            background: rgba(0,0,0,0.4);
            font-size: 13px;
            line-height: $avatarHeight;
            position: relative;
            top: -75px;
            left: -15px;
            padding-top: 15px;
          }
          span{
            display:inline-block;
           // border:0px solid #a111b4;
            width: $avatarHeight;
            height: $avatarHeight;
            font-size: 30px;
            text-align: center;
            line-height: 60px;
          }
        }
        .p{
          color: #ffffff;
          float: left;
          margin: 0;
          width: 60%;
          p{
            position: relative;
            left:30px;
            bottom:0px;
            font-size: 16px;
          }
          .el-input{
            position: relative;
            left:20px;
            bottom:-10px;
          }
        }
      }
    }
    .content .router{
      margin-top: 20px;
    }
  }
}
</style>
<style lang="scss">
body{
  margin: 0;
}
.el-avatar{
  img{
    width: 100%;
  }
}
#app .appContent .menu .user .p .el-input__inner{
  background-color: rgba(255, 255, 255, 0);
  border: 0px solid #DCDFE6;
  color:#ffffff;
  height: 30px;
  width: 100%;
  font-size: 12px;
  width: 100%;
  &:hover{
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  &:focus{
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color:#6d757a
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
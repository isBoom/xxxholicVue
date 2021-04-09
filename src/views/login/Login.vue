<template>
  <div class="login" style="margin-top:200px">
    <div style="width: 100%; min-width: 500px;">
      <div style="margin-bottom: 30px; max-width: 500px; margin: 0 auto;">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="邮箱/用户名" required>
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item label="密码" required>
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click.native.prevent="onLogin">登录</el-button>
            <el-button @click.native.prevent="$router.push({ path: '/register' })">注册</el-button>
            <a style="float:right;" href="login#/forgotPassword" >忘记密码</a>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import * as API from "@/api/user/";
export default {
  name:"Login",
  data() {
    return {
      test: "test",
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    checkInput(){
      console.log();
      if (!this.form.email || this.form.email.length < 2 ||  this.form.email.length > 12 ) {
        this.$message.warning("用户名非法");
      } else if (!this.form.password) {
        this.$message.warning("密码不能为空");
      } else{
        return true
      }
      return false
    },
    onLogin() {
      if(this.checkInput()) {
        API.postLogin(this.form)
        .then(res => {
          console.log(res);
          if (res.code == 0){
            this.$notify({
              title: "登陆成功",
              type: "success"
            });
            setTimeout(function() {
              window.open(`/`,'_self');
            }, 300);
          }else if (res.code == 1){
            this.$notify({
              title: "管理员登陆成功",
              type: "success"
            });
            setTimeout(function() {
              window.open(`/admin`,'_self')
            }, 300);
          } else {
            this.$notify.error({
              title: "登录失败",
              message: res.msg
            });
          } 
        })
        .catch(e => {
          this.$notify({
            title: "网络异常或服务器宕机",
            type: "error"
          });
        });
      }
    }
  }
};
</script>
<style lang="scss" >
.login{
    .el-form-item__label{
      width: 100% !important;
      margin-left: -5%;
      position: relative;
      top:40px;
      left: -400px;
    }
  .el-input{

  }
}
</style>

<template>
  <div class="registed" style="margin-top:150px">
    <div id="registed-content-box" style="width: 100%; min-width: 400px;">
      <div id="registed-content" style="margin-bottom: 30px; max-width: 400px; margin: 0 auto;">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名" :rules="[{ required: true, message: '账号不能为空'}]">
            <el-input v-model="form.userName" placeholder="6-12位字母数字"></el-input>
          </el-form-item>
          <el-form-item label="昵称" :rules="[{ required: true, message: '账号不能为空'}]">
            <el-input v-model="form.nickname" placeholder="2-12位"></el-input>
          </el-form-item>
          <el-form-item label="密码" :rules="[{ required: true, message: '密码不能为空'}]">
            <el-input type="password" v-model="form.password" ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :rules="[{ required: true, message: '密码不能为空'}]">
            <el-input type="password" v-model="form.passwordConfirm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click.native.prevent="onRegister">注册</el-button>
            <a href="/login.html#/" style="float:right;">已有帐号？前去登录</a>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import * as API from "@/api/user/";
export default {
  name: "Register",
  data() {
    return {
      form: {
        nickname: "",
        userName: "",
        password: "",
        passwordConfirm: ""
      }
    };
  },
  methods: {
    onRegister() {
      var zg =  /^[0-9a-zA-Z]*$/; 
      if (this.form.userName.length < 6 ||  this.form.userName.length > 12 || !zg.test(this.form.userName) || !this.form.userName) {
        this.$message.warning("用户名非法");
      } else if (!this.form.nickname || this.form.nickname.length < 2 ||  this.form.nickname.length > 12 ) {
        this.$message.warning("昵称非法");
      } else if (!this.form.password) {
        this.$message.warning("密码不能为空");
      } else if (!this.form.passwordConfirm) {
        this.$message.warning("确认密码不能为空");
      } else if (this.form.password != this.form.passwordConfirm) {
        this.$message.warning("两次密码不一致");
      }  else if (this.form.password.length < 6 || this.form.password.length > 20) {
        this.$message.warning("密码限制长度6-20");
      } else {
        API.postRregister(this.form)
          .then(res => {
            console.log(res);
            if (res.code > 0) {
              this.$notify.error({
                title: "注册失败",
                message: res.msg
              });
            } else {
              this.$notify({
                title: "注册成功",
                type: "success"
              });
              this.$router.push({
                path: "/"
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
</script>>

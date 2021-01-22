<template>
  <div style="margin-top:150px">
    <div style="width: 100%; min-width: 400px;">
      <div  style="margin-bottom: 30px; max-width: 400px; margin: 0 auto;">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="邮箱" required>
            <el-input v-model="form.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="用户名" required>
            <el-input v-model="form.userName" placeholder="2-12位"></el-input>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input type="password" v-model="form.password" placeholder="6-20位"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" required>
            <el-input type="password" v-model="form.passwordConfirm"  placeholder="6-20位"></el-input>
          </el-form-item>
          <el-form-item label="验证码" required>
            <div class="captcha">
              <el-input v-model="code" class="input"></el-input>
              <div class="bt" @click="refreshCode()">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
              <!-- <el-button @click.native.prevent="getVerification" class="bt">获取验证码</el-button> -->
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click.native.prevent="onRegister">注册</el-button>
            <a style="float:right;" href="login" >已有帐号？前去登录</a>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import * as API from "@/api/user/";
import SIdentify from "@/components/SIdentify.vue";
export default {
  name: "Register",
  components: { SIdentify },
  data() {
    return {
      code:"",
      identifyCode: "",
      identifyCodes: "0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ",
      form: {
        userName: "",
        email: "",
        password: "",
        passwordConfirm: ""
      }
    };
  },
  methods: {
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes,4);
    },
    randomNum (min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode (data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
    },
    // getVerification(){
    //   if (this.checkInput){
    //   API.getVerification(this.form.email).then(res => {
    //         if(res.code == 0 ){
    //           console.log(res);
    //           this.$notify({
    //           title: "已发送",
    //           type: "success"
    //           });
    //         }
    //       })
    //       .catch(e => {
    //         this.$notify({
    //           title: "网络异常或服务器宕机",
    //           type: "error"
    //         });
    //       });
    //   }
    // },
    checkInput(){
      var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (!strRegex.test(this.form.email) || !this.form.email) {
        this.$message.warning("邮箱非法");
      } else if (!this.form.userName || this.form.userName.length < 2 ||  this.form.userName.length > 12 ) {
        this.$message.warning("用户名非法");
      } else if (!this.form.password) {
        this.$message.warning("密码不能为空");
      } else if (!this.form.passwordConfirm) {
        this.$message.warning("确认密码不能为空");
      } else if (this.form.password.length < 6 || this.form.password.length > 20) {
        this.$message.warning("密码限制长度6-20");
      } else if (this.form.password != this.form.passwordConfirm) {
        this.$message.warning("两次密码不一致");
      } else if (this.code == ""){
        this.$message.warning("验证码为空");
      }else if (this.identifyCode.toLocaleLowerCase !=this.code.toLocaleLowerCase){
        this.code=""
        this.refreshCode()
        this.$message.warning("请输入正确的验证码");
      }else{
        return true
      }
      return false
    },
    onRegister() {
      if(this.checkInput()) {
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
    },
  },
  mounted() {
      this.refreshCode()
    },
};
</script>
<style lang="scss" scoped>
.captcha{
  .input{
    float: left;
    width: 50%;
  }
  .bt{
    float: right;;
    width: 40%;
    padding:0 ;
  }
}
</style>

<template>
    <div style="margin-top:150px">
        <div style="width: 100%; min-width: 400px;">
        <div style="margin-bottom: 30px; max-width: 400px; margin: 0 auto;">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="邮箱" required>
                    <el-input v-model="form.email" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" required>
                    <el-input type="password" v-model="form.password" placeholder="6-20位"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" required>
                    <el-input type="password" v-model="form.passwordConfirm"  placeholder="6-20位"></el-input>
                </el-form-item>
                <el-form-item label="验证码" required>
                    <div class="captcha">
                    <el-input v-model="form.captcha" class="input"></el-input>
                    <el-button @click.native.prevent="getCaptcha" class="bt" :disabled="!btnStatus">{{btnStr}}</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button @click.native.prevent="changePassword">提交</el-button>
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
            btnStatus:true,
            btnStr:"获取验证码",
            countdown:60,
            captchaBtn:"获取验证码",
            identifyCode: "",
            identifyCodes: "0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ",
            form: {
                email: "",
                password: "",
                passwordConfirm: "",
                captcha:"",
            }
        };
    },
    methods: {
        changePassword(){
            if (this.checkInput()){
                API.changePassword(this.form).then(res =>{
                    if (res.code == 0 ){
                        this.$notify({
                            title: "修改密码成功",
                            type: "success"
                        });
                        setTimeout(function() {
                            window.open(`./login`,'_self')
                        }, 300); 
                    }else{
                        this.$notify({
                            title: res.msg,
                            type: "error"
                        });
                    }
                }).catch(e =>{
                    this.$notify({
                        title: "网络异常或服务器宕机",
                        type: "error"
                    });
                })
            }
        },
        getCaptcha(){
            var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(strRegex.test(this.form.email) && this.form.email){
                API.getCaptcha({"email":this.form.email}).then(res => {
                    if(res.code == 0 ){
                        this.$notify({
                            title: "已发送",
                            type: "success"
                        });
                        this.countdown = 60;
                    }else{
                        this.$notify({
                            title: "请稍后再试",
                            type: "warning"
                        });
                        this.countdown = res.count;
                    }
                    this.btnStatus = false
                    var thisVue = this
                    var timer = setInterval(function(){
                        thisVue.countdown--;
                        thisVue.btnStr = thisVue.countdown;
                        if(thisVue.countdown <= 0){
                            thisVue.btnStatus = true
                            thisVue.btnStr = thisVue.captchaBtn 
                            clearInterval(timer)
                        }
                    },1000)
                })
                .catch(e => {
                    this.$notify({
                        title: "网络异常或服务器宕机",
                        type: "error"
                    });
                });
            }else{
                this.$message.warning("邮箱非法");
            }
        },
        checkInput(){
            var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (!strRegex.test(this.form.email) || !this.form.email) {
                this.$message.warning("邮箱非法");
            } else if (!this.form.password) {
                this.$message.warning("密码不能为空");
            } else if (!this.form.passwordConfirm) {
                this.$message.warning("确认密码不能为空");
            } else if (this.form.password.length < 6 || this.form.password.length > 20) {
                this.$message.warning("密码限制长度6-20");
            } else if (this.form.password != this.form.passwordConfirm) {
                this.$message.warning("两次密码不一致");
            } else if (this.form.captcha == ""){
                this.$message.warning("验证码为空");
            }else{
                return true
            }
            return false
        },
    },
    mounted() {
    },
}
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
        padding:14x 0 ;
    }
}
</style>

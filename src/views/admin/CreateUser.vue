<template>
    <div class="createUser">
        <el-form :model="form" :rules="rules" label-width="100px">
            <el-form-item label="头像">
                <el-upload class="avatarUploader" action label="描述" ref="upload"
                    :before-upload="fnBeforeUpload" :http-request="fnUploadRequest" :show-file-list="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatarUploaderIcon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="form.userName" maxlength="12"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input type="textarea" maxlength="50" v-model="form.signature"></el-input>
            </el-form-item>
            <el-form-item label="用户权限">
                <el-select v-model="form.permissions" placeholder="用户权限">
                    <el-option v-for="item in permissions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div style="text-align: center">
            <el-button @click="close" size="small">清空</el-button>
            <el-button type="primary" @click="onSumbit" size="small">添加</el-button>
        </div>
    </div>
</template>
<script>
import * as API from "@/api/admin/";
import * as userAPI from "@/api/video/";
export default {
    data(){
        return{
            imageUrl:"",
            form:{},
            rules: {
                email:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                userName:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'change' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change' }
                ]
            },
            permissions:[
                {
                    value: 'admin',
                    label: '管理员'
                }, {
                    value: 'normal',
                    label: '普通'
                }
            ],
        }
    },
    methods:{
        close(){
            this.form = {}
            this.imageUrl = ""
            this.form.permissions = "normal"
        },
        onSumbit(){
                API.createUser(this.form).then(res =>{
                    if (res.code == 0){
                        this.$notify({
                            title: "添加成功",
                            message:res.msg,
                            type: "success"
                        });
                    }else{
                        this.$notify({
                            title: "添加失败",
                            message:res.msg,
                            type: "error"
                        });
                    }
                    this.close()
                }).catch(e=>{this.close()}) 
            },
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
                userAPI.postUploadTokenAvatar(option.file.name)
                    .then(res => {
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
                        this.imageUrl = res.data.get;
                        this.form.avatar = res.data.key;
                    };
                    })
                    .catch(error => {
                    this.$notify.error({
                        title: "网路错误，或者服务器宕机",
                        message: error
                    });
                });
            },
    },
    created(){
        this.close()
    }
}
</script>
<style lang="scss" scoped>
.createUser{
    width: 30%;
    margin-left: 30%;
    margin-top: 5%;
}
</style>
<template>
    <el-dialog  :visible.sync="visible" title="更新用户信息" width="500px" :before-close="modalClose" center  :close-on-click-modal="false"
        :close-on-press-escape="false" >
        <el-form class="updateUser" :model="userObj" :rules="rules" label-width="100px">
            <el-form-item label="头像">
                <el-upload class="avatarUploader" action label="描述" ref="upload"
                    :before-upload="fnBeforeUpload" :http-request="fnUploadRequest" :show-file-list="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatarUploaderIcon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="userObj.email" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="userObj.userName" maxlength="12"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input type="textarea" maxlength="50" v-model="userObj.signature"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" placeholder="留空则不修改密码" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="用户状态">
                <el-select v-model="userObj.status" placeholder="用户状态">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户权限">
                <el-select v-model="userObj.permissions" placeholder="用户权限">
                    <el-option v-for="item in permissions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
            <div style="text-align: center">
                <el-button @click="modalClose" size="small">取消</el-button>
                <el-button type="primary" @click="onSumbit" size="small">保存</el-button>
            </div>
    </el-dialog>
</template>
<script> 
import * as API from "@/api/admin/";
import * as userAPI from "@/api/video/";
    export default {
        name: 'UpdateUser',
        data() {
            return {
                options:[
                    {
                        value: 'active',
                        label: '正常'
                    }, {
                        value: 'suspend',
                        label: '封禁中'
                    }
                ],
                permissions:[
                    {
                        value: 'admin',
                        label: '管理员'
                    }, {
                        value: 'normal',
                        label: '普通'
                    }
                ],
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
                    ]
                    // email:[
                    //     { required: true, message: '请输入标题', trigger: 'blur' },
                    //     { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'change' }
                    // ],
                    // info:[
                    //     {max: 500, message: '长度在 0 到 500 个字符', trigger: 'change' }
                    // ]
                }
            };
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            userObj: {
                type: Object, 
                default: {}
            },
        },
        mounted() {
            this.imageUrl = this.userObj.avatar
            //不能删 设置空则头像不变 不设置空则会提交完整连接导致失败
            this.userObj.avatar = ""
        },
        methods: {
            onSumbit(){
                this.userObj.password = this.form.password
                API.updateUser(this.userObj).then(res =>{
                    if (res.code == 0){
                        this.$notify({
                            title: "修改成功",
                            message:res.msg,
                            type: "success"
                        });
                    }else{
                        this.$notify({
                            title: "修改失败",
                            message:res.msg,
                            type: "error"
                        });
                    }
                    this.$emit('refresh-data', true);
                    //和catch里面的modalClose一起放onSumbit最后一句会导致emit无论如何无法运行 只能写两次
                    this.modalClose()
                }).catch(e=>{this.modalClose()}) 
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
                        this.userObj.avatar = res.data.key;
                    };
                    })
                    .catch(error => {
                    this.$notify.error({
                        title: "网路错误，或者服务器宕机",
                        message: error
                    });
                });
            },
            modalClose() {
                this.$emit('update:visible', false); // 直接修改父组件的属性 
            },
        }
    };
</script>
<style lang="scss">
.updateUser{
    .el-upload__input{
        display: none !important;
    }
    .avatarUploader{
        .avatar{
            display: block;
        }
        .el-upload{
            width: 80px;
            height: 80px;
            border: 1px dashed #d9d9d9;
            border-radius: 600px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            img{
                height: 100%;
                position: relative;
                //right: 40%
            }
        }
        .avatarUploaderIcon{
            font-size: 28px;
            color: #8c939d;
            width: 200px;
            height: 112.5px;
            line-height: 112.5px;
            text-align: center;
        }
    }
    .el-upload:hover {
        border-color: #409eff;
    }
}
</style>
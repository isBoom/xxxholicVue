<template>
    <el-dialog :visible.sync="visible" title="更新视频信息(提交后将会重新被审核)" width="600px" :before-close="modalClose" center  :close-on-click-modal="false"
        :close-on-press-escape="false" >
        <el-form :model="form" :rules="rules" label-width="100px">
            <el-form-item label="视频标题" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="视频详情">
                <el-input type="textarea" v-model="form.info"></el-input>
            </el-form-item>
            <el-form-item label="视频封面">
                <el-upload class="avatarUploader" action label="描述" ref="upload"
                    :before-upload="fnBeforeUpload" :http-request="fnUploadRequest" :show-file-list="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatarUploaderIcon"></i>
                    <div slot="tip">只能上传png/jpg文件，且不超过2M文件(16:9)</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="视频类型">
                <el-select v-model="form.videoType" placeholder="视频类型">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
import * as API from "@/api/video/";
    export default {
        name: 'UpdateVideo',
        data() {
            return {
                options:[
                    {
                        value: 'anime',
                        label: '动漫'
                    }, {
                        value: 'movie',
                        label: '电影'
                    }, {
                        value: 'funny',
                        label: '鬼畜'
                    }, {
                        value: 'other',
                        label: '其他'
                    }
                ],
                value:"",
                imageUrl:"",
                form:{},
                rules: {
                    title:[
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'change' }
                    ],
                    info:[
                        {max: 500, message: '长度在 0 到 500 个字符', trigger: 'change' }
                    ]
                }
            };
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            videoObj: {
                type: Object, 
                default: {}
            },
        },
        mounted() {
            //表单初始      
            this.form = this.videoObj
            this.imageUrl = this.form.avatar
            this.form.avatar = ""
        },
        methods: {
            onSumbit(){
                API.updateVideo(this.form).then(res =>{
                        if (res.code == 0){
                            this.$notify({
                                title: "更新成功 请等待审核",
                                type: "success"
                            });
                        }else{
                            this.$notify({
                                title: "更新失败",
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
                API.postUploadTokenAvatar(option.file.name)
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
            
            // 信息提交
            // submitForm(formName, formData) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //            //判断modalObj中id是否为空，决定是编辑还是添加请求操作；
            //            this.modalClose(); 
            //         } else {
            //            //验证失败处理
            //             return false;
            //         }
            //     });
            // },
            // 关闭弹出框
            modalClose() {
                this.$emit('update:visible', false); // 直接修改父组件的属性 
            }
        }
    };
</script>
<style lang="scss">
.el-upload__input{
        display: none !important;
    }
.avatarUploader{
    .avatar{
        width: 200px;
        height: 112.5px;
        display: block;
    }
    .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
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
</style>
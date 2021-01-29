<template>
    <el-dialog :visible.sync="visible" :title="title" width="600px" :before-close="modalClose" center  :close-on-click-modal="false"
        :close-on-press-escape="false" >
        <el-form class="updateVideo" :model="form" :rules="rules" label-width="100px">
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
            <el-form-item v-if="identity" label="审核状态">
                <el-select v-model="form.status" placeholder="审核状态">
                    <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                status:[
                    {
                        value: 'normal',
                        label: '通过'
                    }, {
                        value: 'audit',
                        label: '审核中'
                    }, {
                        value: 'refunded',
                        label: '不通过'
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
            title:{
                type:String
            },
            identity:{
                type:Boolean,
                default:false
            }
        },
        mounted() {
            //表单初始      
            this.form = this.videoObj
            this.imageUrl = this.form.avatar
            this.form.avatar = ""

            setTimeout(() => {
                console.log(this.form);
            }, 1000);
        },
        methods: {
            onSumbit(){
                this.$emit('update-data', this.form);
                this.modalClose()
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
            modalClose() {
                this.$emit('update:visible', false); // 直接修改父组件的属性 
            }
        }
    };
</script>
<style lang="scss">
.updateVideo{
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
            width: 200px;
            height: 112.5px;
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
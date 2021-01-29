<template>
    <div class="postVideo">
        <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="标题" :rules="[{required: true}]">
            <el-input v-model="form.title" placeholder="最少两位，最长五十位"></el-input>
        </el-form-item>
        <el-form-item label="视频描述" :rules="[{required: true}]">
            <el-input type="textarea" v-model="form.info" size="medium" placeholder="最少两位，最长五百位"></el-input>
        </el-form-item>
        <el-form-item label="视频封面">
            <el-upload class="avatarUploader" action label="描述" ref="upload"
                :before-upload="fnBeforeUpload" :http-request="fnUploadRequest" :show-file-list="false">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatarUploaderIcon"></i>
                <div slot="tip">只能上传png/jpg文件，且不超过2M文件(16:9)</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="视频">
            <el-upload  action :before-upload="vnBeforeUpload" 
                :http-request="vnUploadRequest" multiple :on-exceed="handleExceed">
                <el-button size="small" type="primary">点击上传</el-button>
                <el-select v-model="videoType" placeholder="视频类型">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <div slot="tip">{{ vUpLoadInfo }}</div>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-progress v-if="percentage" :percentage="percentage" :color="customColorMethod" :show-text="false"></el-progress>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import * as API from "@/api/video";
export default {
    data() {
        return {
        videoType: '',
        imageUrl: "",
        videoUrl: "",
        couldUpload: false,
        vUpLoadInfo: "只能上传MP4文件，且请您自行压缩",
        percentage: 0,
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
        form: {
                title: "",
                info: "",
                url: "",
                avatar: "",
                videoType:"",
            }
        };
    },
    methods: {
        customColorMethod(percentage) {
            if (percentage < 40) {
                return "#909399";
            } else if (percentage < 80) {
                return "#e6a23c";
            } else {
                return "#67c23a";
            }
        },
        handleExceed(files) {
            this.$message.warning(`仅可上传一个视频`);
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
        vnBeforeUpload(file) {
            const isMP4 = file.type === "video/mp4";
            if (!isMP4) {
                this.$message.error("上传视频只能是 mp4 格式!");
            }
            return isMP4;
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
        vnUploadRequest(option) {
            API.postUploadTokenVideo(option.file.name)
                .then(res => {
                if (res.code != 0) {
                    this.$notify.error({
                    title: "错误",
                    message: res.msg
                    });
                    return;
                }
                const oReq = new XMLHttpRequest();
                oReq.upload.onprogress = event => {
                    if (event.lengthComputable) {
                    this.percentage = Math.floor((event.loaded / event.total) * 100);
                    console.log(this.percentage);
                    }
                };
                oReq.open("PUT", res.data.put, true);
                oReq.send(option.file);
                oReq.onload = () => {
                    this.form.url = res.data.key;
                    this.vUpLoadInfo = "上传成功";
                    this.percentage = 0;
                    this.couldUpload = true;
                };
                })
                .catch(error => {
                this.$notify.error({
                    title: "网路错误，或者服务器宕机",
                    message: error
                });
            });
        },
        onSubmit() {
            if (!this.couldUpload) {
                if (this.percentage > 0) {
                    this.$message.warning("请静待视频上传完毕");
                } else {
                    this.$message.warning("您还没上传视频哟");
                }
                return false;
            }
            if (this.videoType == ""){
                this.$message.warning("请选择视频类型");
                return false
            }
            if (this.form.title.length<2 || this.form.title.length>50){
                this.$message.warning("视频标题长度非法");
                return false
            }
            if (this.form.info.length > 500){
                this.$message.warning("视频详情长度非法");
                return false
            }
            this.form.videoType = this.videoType
            API.postVideo(this.form).then(res => {
                if (res.code > 0) {
                    this.$notify({title: "失败",message: `${res.msg}`,type: "error"});
                } else {this.$notify({title: "投稿成功,请等待审核",message: `您的投稿ID为${res.data.id}`,type: "success"});
                    window.open(`./user`,'_self')
                }
            }).catch(function(err) {
                this.$notify({
                    title: "失败",
                    message: "网络异常或服务器,请稍后再试",
                    type: "error"
                });
            });
        }
    }
};
</script>
<style lang="scss">
.postVideo{
    margin-top: 5%;
    input,textarea{
        width: 90% !important;
    }
    .el-form{
        textarea {
            min-height: 70px !important;
        }
        .el-input__inner{
            height: 35px;
        }
        .el-input__suffix-inner{
            position: relative;
            right: 10px;
        }
        .el-upload__input{
            display: none !important;
        }
        .el-form-item{
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
            // .avatar {
            //     width: 200px;
            //     height: 112.5px;
            //     display: block;
            // }
        }
    }
}
</style>
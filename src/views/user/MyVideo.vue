<template>
    <div class="videoBox">
        <UpdateVideo v-if="showUpdateVideo" :visible.sync="showUpdateVideo" @update-data="updateVideoSave" :title="title" :videoObj='videoObj'></UpdateVideo>
        <div class="braceVideoBox"></div>
            <el-row :gutter="10" ref="boxHeight">
            <el-col :span="4" v-for="v in videos" :key="v.id">
                <!-- 大盒子强行宽高比 home-el-col-big -->
                <div class="coverBoxBig">
                    <div class="coverBoxSmall">
                        <el-card shadow="never">
                        <!-- 强行宽高比 -->
                            <div class="videoBanner" @click="videoInfo(v)">
                                <el-image :src="v.avatar" style="width:100%">
                                <div slot="error">
                                    <img src="@/static/defaultAvatar.png" style="width:100%" />
                                </div>
                                </el-image>
                                <span class="watchView">
                                    <i class="el-icon-view">
                                        <span v-html="nbsp+' '+v.view"></span>
                                    </i>
                                </span>
                            </div>
                            <div class="title">
                                <div class="homeVideoInfo">
                                    <p>{{ v.title }}<span></span></p>
                                </div>
                                <!-- del -->
                                <div class="more">
                                    <el-dropdown trigger="hover" class="el-icon-more-box">
                                        <span class="el-dropdown-link">
                                            <i class="el-icon-more"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item class="clearfix" @click.native="updateVideo(v)">修改视频详情</el-dropdown-item>
                                            <el-dropdown-item class="clearfix" @click.native="delVideo(v)">删除视频</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div v-if="isLoading">
            <v-pagination show-quick-jumper @change="loadPage" :pageSize="pageSize" :total="videoCount"></v-pagination>
        </div>
    </div> 
</template>
<script>
import UpdateVideo from "@/components/UpdateVideo.vue"
import * as API from "@/api/video/";
export default {
    data() {
        return {
            title:"更新视频信息(提交后将会重新被审核)",
            currentPage:1,
            showUpdateVideo: false,
            boxHeightChange:"",
            pageSize:12,
            videoCount:0,
            videos: [],
            isLoading:false,
            nbsp: "&nbsp;",
            videoParams:{
                offset:0,
                limit:0,
                userId:0,
                status:"",
            }
        };
    },
    components:{
        UpdateVideo
    },
    watch:{
        videoCount:{
            handler(v){
                console.log(v);
                if(v > this.pageSize){
                    this.isLoading = true
                }else{
                    this.isLoading = false
                }
            },
        },
    },
    methods: {
        updateVideoSave(data){
            API.updateVideo(data).then(res =>{
                if (res.code == 0){
                    this.$notify({
                        title: "更新成功 请等待审核",
                        type: "success"
                    });
                    if(this.videos.length == 1){
                        this.currentPage--
                    }
                    this.loadPage(this.currentPage)
                }else{
                    this.$notify({
                        title: "更新失败",
                        type: "error"
                    });
                }
            }).catch(e=>{})
        },
        loadPage(i) {
            this.videoParams.offset = this.pageSize * (i-1)
            this.getVideos(this.videoParams)
            this.currentPage = i

            for(let v = 0;v<document.getElementsByClassName("ant-pagination-item").length; v++){
                document.getElementsByClassName("ant-pagination-item")[v].classList.remove("ant-pagination-item-active")
            }
            if(document.getElementsByClassName("ant-pagination-item").length!=0){
                document.getElementsByClassName("ant-pagination-item")[this.currentPage-1].classList.add("ant-pagination-item-active")
            }
        },
        getVideos(params) {
            API.getVideos(params)
                .then(res => {
                if (res.code == 0 || res.code != 401) {
                    this.videos = res.data;
                    this.videoCount = res.count;
                    if (res.count > this.pageSize) {
                        this.isLoading = true
                    }

                } else {
                    this.$message({
                    message: res.msg,
                    duration: 0,
                    type: "error"
                    });
                }
                })
                .catch(err => {
                this.$message({
                    message: "服务器开小差啦，请您稍后再试",
                    duration: 0,
                    type: "error"
                });
                });
        },
        videoInfo(v) {
            window.open(`/#/video/${v.id}`,'_self')
        },
        updateVideo(v){
            this.showUpdateVideo = true
            this.videoObj = JSON.parse(JSON.stringify(v))
        },
        delVideo(v){
            console.log(v);
        },
    },
    
    created(){
        this.videoParams.status = "normal"
        this.videoParams.userId = 1
        this.videoParams.limit=this.pageSize,
        this.videoParams.info = this.$route.query.info
        this.getVideos(this.videoParams)
    }
}
</script>
<style lang="scss" scoped>
.homeVideoInfo p {
    margin-top: 5%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
    .coverBoxBig {
        width: 100%;
        padding-bottom: 100%;
        position: relative;
        overflow: hidden;
        .coverBoxSmall {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        .el-card {
            /* 去边框 */
            border: 0px solid !important;
            -webkit-box-shadow: 0 0 0;
            box-shadow: 0px 0px 0px;
            /* 强制宽高比 */
            .videoBanner {
                width: 100%;
                padding-bottom: 60%;
                position: relative;
                .el-image{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    img{
                        height: 100%;
                        position: absolute;
                        bottom: 0;
                    }
                    &::after{
                        display: block;
                        content: "";
                        width: 100%;
                        height: 100%;
                        position:absolute;
                        top:0px;
                        box-shadow: 0 -40px 20px -20px rgba(0, 0, 0, 0.5) inset;
                    }
                }
            }
            .watchView{
                position: absolute;
                bottom: 5%; left: 5%;
                color:white;
                font-size:0.5em;
            }
            .title{
                font-size:14px;
                padding-right:10%;
                .homeVideoInfo{
                    float:left;
                    width:90%;
                }
                .more{
                    float: left;
                    font-size: 1.2em;
                    transform: rotate(-90deg);
                    position:absolute;
                    right: 0;
                    bottom: 30px;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.videoBox{
    .braceVideoBox{
        width: 840px;
        height: 1px;
    }
    .el-card{
        .el-card__body {
        padding: 0 ;
        }
    }
}
</style>
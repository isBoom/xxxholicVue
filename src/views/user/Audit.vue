<template>
    <div class="videoBox">
        <VideoPlay v-if="showVideoPlay" :visible.sync="showVideoPlay" :videoObj='videoObj'/>
        <div class="braceVideoBox"></div>
            <el-row :gutter="10" ref="boxHeight">
            <el-col :span="4" v-for="v in videos" :key="v.id" @click.native="videoPlay(v)">
                <!-- 大盒子强行宽高比 home-el-col-big -->
                <div class="coverBoxBig">
                    <div class="coverBoxSmall">
                        <el-card shadow="never">
                        <!-- 强行宽高比 -->
                            <div class="videoBanner">
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
                                <div class="home-video-info">
                                    <p>{{ v.title }}<span></span></p>
                                </div>
                                <!-- del -->
                                <div class="more">
                                    <el-dropdown trigger="hover" class="el-icon-more-box">
                                        <span class="el-dropdown-link">
                                            <i class="el-icon-more"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
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
import * as API from "@/api/video/";
import VideoPlay from "@/components/VideoPlay.vue"
export default {
    components:{VideoPlay},
    data() {
        return {
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
            },
            //
            showVideoPlay:false,
            showUpdateVideo: false,
        };
    },
    methods: {
        loadPage(i) {
            this.videoParams.offset = this.pageSize * (i-1)
            this.getVideos(this.videoParams)
        },
        videoPlay(b){
            this.showVideoPlay = true
            this.videoObj = JSON.parse(JSON.stringify(b))
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
        delVideo(v){
            let data = {
                "ids":""+v.id,
            }
            API.delVideo(data).then(res => {
                this.$confirm('确认操作？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (res.code == 0) {
                        for(let i = 0; i < this.videos.length;i++){
                            if(this.videos[i].id == v.id){
                                this.videos.splice(i,1)
                                return
                            }
                        }
                    } else {
                        this.$message.error(res.msg)
                    }})
                    .catch(err => {
                        this.$message.error("服务器开小差啦，请您稍后再试")
                });
                }).catch(() => {});   
        },
        videoInfo(v) {
            //window.open(`/#/video/${v.id}`,'_self')
        }
    },
    created(){
        this.videoParams.status = "Audit"
        this.videoParams.userId = 1
        this.videoParams.limit=this.pageSize,
        this.videoParams.info = this.$route.query.info
        console.log(this.videoParams);
        this.getVideos(this.videoParams)
    }
}
</script>
<style lang="scss" scoped>
.home-video-info p {
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